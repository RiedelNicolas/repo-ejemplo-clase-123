import { Video } from "../interfaces/videos"

interface VideoElementProps {
    video : Video
}
export const VideoElement = ({ video }: VideoElementProps) => {
    return (
        <div className="video-item">
            <a className="video-url" href={video.url} target="_blank" rel="noopener noreferrer">{video.url}</a>
            <div className="video-description">{video.description}</div>
        </div>
    )
}