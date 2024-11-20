from fastapi import Body, Depends, FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from typing import Annotated
from pydantic import Field
from sqlmodel import Field, Session, SQLModel, create_engine, SQLModel, select
from os import getenv
from dotenv import load_dotenv

load_dotenv()
DATABASE_URL = getenv("DATABASE_URL")
FRONTEND_URL = getenv("FRONTEND_URL")
if not DATABASE_URL:
    raise ValueError("DATABASE_URL environment variable is not set")
if not FRONTEND_URL:
    raise ValueError("FRONTEND_URL environment variable is not set")

engine = create_engine(DATABASE_URL)
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[FRONTEND_URL],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

load_dotenv()
DATABASE_URL = getenv("DATABASE_URL")
if not DATABASE_URL:
    raise ValueError("DATABASE_URL environment variable is not set")
engine = create_engine(DATABASE_URL)


def get_session():
    with Session(engine) as session:
        yield session

SessionDep = Annotated[Session, Depends(get_session)]

def create_db_and_tables():
    SQLModel.metadata.create_all(engine)

@app.on_event("startup")
def on_startup():
    create_db_and_tables()

@app.get("/")
async def root():
    return {"message": "Up and running :)"}


@app.get("/videos")
async def get_videos():
    with Session(engine) as session:
        videos = session.exec(select(Video).order_by(Video.id.desc())).all()
        return videos


class Video(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    url: str = Field(..., description="The URL of the video")
    description: str = Field(..., description="The description of the video")

@app.post("/videos")
async def create_video(video: Annotated[Video, Body(embed=True)]):
    # Create new video object without the provided ID (if any)
    new_video = Video(url=video.url, description=video.description)

    if not ("youtube.com/watch?v=" in new_video.url or "youtu.be/" in new_video.url):
        raise HTTPException(status_code=400, detail="URL must be a valid YouTube video link")

    with Session(engine) as session:
        session.add(new_video)
        session.commit()
        session.refresh(new_video)
        return new_video