import { useQuery } from "@tanstack/react-query"
import { fetchVideos } from "../api/api"


export const useVideos = () => {
    const { data, isLoading, error } = useQuery({
        queryKey: ['videos'],
        queryFn: () => fetchVideos(),
    })

    return { data, isLoading, error }
}