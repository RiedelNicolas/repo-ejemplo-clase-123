import { useMutation, useQueryClient } from "@tanstack/react-query"
import { addVideoRequest } from "../api/api"
import { Video } from "../interfaces/videos"


interface AddVideoProps {
    videoURL : string,
    description: string,
    onSuccess: () => void,
    onError: (error: string) => void
}
export const useAddVideo = ({videoURL, description, onSuccess, onError}: AddVideoProps) => {
    const queryClient = useQueryClient()

    const addVideoMutation = useMutation({
        mutationFn: () => addVideoRequest(videoURL, description),
        onSuccess: () => {
            onSuccess()
            queryClient.invalidateQueries({ queryKey: ['videos'] })
            //Optimistic update
            queryClient.setQueryData(['videos'], (old: Video[]) => {
                const previousID = old[old.length - 1].id
                return [...old, {id: previousID + 1, url: videoURL, description: description}]
            })
        },
        onError: (error) => {
            onError(error.message)
        },
    })
    
    const addVideo = addVideoMutation.mutate;

    return { addVideo }
}