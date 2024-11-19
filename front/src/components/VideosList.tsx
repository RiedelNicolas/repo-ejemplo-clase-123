import { useVideos } from "../hooks/useVideos"
import { VideoElement } from "./VideoElement"
import { VideosSkeleton } from "./VideosSkeleton"

export const VideosList = () => {
    const { data, isLoading, error } = useVideos()

    if (error) return <div>Error: {error.message}</div>

    if (isLoading || !data) {
        return <VideosSkeleton />
    }

    return (
        <div className="videos-list">
            {data.map((video) => (
                <VideoElement video={video} key={video.id} />
            ))}
        </div>
    )
}