import { useMutation, useQueryClient } from "@tanstack/react-query"
import { addVideoRequest } from "../api/api"

export const useAddVideo = () => {
    const queryClient = useQueryClient()

    const mutation = useMutation({
        mutationFn: () => addVideoRequest(videoUrl, description),
    })
    
    const addVideo = (videoUrl: string, description: string, onSuccess: () => void, onError: (error: string) => void) => {
        return useMutation({
            mutationFn: () => addVideoRequest(videoUrl, description),
            onSuccess: () => {
                onSuccess()
                queryClient.invalidateQueries({ queryKey: ['videos'] })
            },
            onError: (error) => {
                onError(JSON.stringify(error))
            },
        })
    }

    return { addVideo }
}