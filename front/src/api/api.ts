import axios from 'axios'
import { Video } from '../interfaces/videos'


const BACKEND_URL = import.meta.env.VITE_BACKEND_URL


const axiosInstance = axios.create({
    baseURL: BACKEND_URL,
})


export const fetchVideos = async () => {
    const response = await axiosInstance.get<Video[]>('/videos')
    if (response.status !== 200 || !response.data) {
        throw new Error('Failed to fetch videos')
    }
    return response.data
}

export const addVideoRequest= async (url: string, description: string) => {
    const response = await axiosInstance.post('/videos', {"video":{ url, description }})
    return response.data
}