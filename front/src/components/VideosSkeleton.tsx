export const VideosSkeleton = () => {
    return (
        <div className="videos-list">
            {[1, 2, 3, 5 , 6].map((index) => (
                <div key={index} className="video-item skeleton">
                    <div className="video-info">
                        <div className="video-url-skeleton"></div>
                        <div className="video-description-skeleton"></div>
                    </div>
                </div>
            ))}
        </div>
    )
}