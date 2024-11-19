import { AddVideoInput } from "./AddVideoInput";
import { VideosList } from "./VideosList";

export const VideosBody = () => {

  return (
    <div className="main-content">
      <div className="card">
        <AddVideoInput />
        <VideosList />
      </div>
    </div>
  );
};