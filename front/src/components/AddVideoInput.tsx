import React, { useState } from 'react'
import { useAddVideo } from '../hooks/useAddVideo'

const MAX_DESCRIPTION_LENGTH = 50

export const AddVideoInput = () => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [videoUrl, setVideoUrl] = useState('')
    const [description, setDescription] = useState('')
    const [error, setError] = useState('')
    const [isPending, setIsPending] = useState(false);
    const { addVideo } = useAddVideo()


    const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const newValue = e.target.value
        if (newValue.length <= MAX_DESCRIPTION_LENGTH) {
            setDescription(newValue)
        }
    }

    const handleAddVideo = () => {
        if (!videoUrl || !description) return
        addVideo(videoUrl, description, () => {
            setIsModalOpen(false)
            setVideoUrl('')
            setDescription('')
            setIsPending(false)
        }, (error) => {
            setError(error)
            setIsPending(false)
        })
    }

    return (
        <>
            <div className="input-section">
                <button 
                    className="add-button"
                    onClick={() => setIsModalOpen(true)}
                >
                    Agregar video
                </button>
            </div>

            {isModalOpen && (
                <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
                    <div className="modal-content" onClick={e => e.stopPropagation()}>
                        <div className="modal-header">
                            <h2>Agregar nuevo video</h2>
                            <button 
                                className="modal-close"
                                onClick={() => setIsModalOpen(false)}
                            >
                                ×
                            </button>
                        </div>
                        <div className="form-group">
                            <label htmlFor="videoUrl">URL de YouTube</label>
                            <input
                                id="videoUrl"
                                type="text"
                                value={videoUrl}
                                onChange={(e) => setVideoUrl(e.target.value)}
                                placeholder="https://www.youtube.com/watch?v=..."
                            />
                        </div>
                        <div className="form-group">
                            <div className="label-with-counter">
                                <label htmlFor="description">Descripción</label>
                                <span className="char-counter">
                                    {description.length}/{MAX_DESCRIPTION_LENGTH}
                                </span>
                            </div>
                            <textarea
                                id="description"
                                value={description}
                                onChange={handleDescriptionChange}
                                placeholder="Describe el video..."
                            />
                        </div>
                        <button 
                            className="submit-button"
                            onClick={handleAddVideo}
                            disabled={isPending || !videoUrl || !description}
                        >
                            {isPending ? 'Agregando...' : 'Agregar Video'}
                        </button>

                        {error && (
                            <div className="error-message">
                                {error}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    )
}