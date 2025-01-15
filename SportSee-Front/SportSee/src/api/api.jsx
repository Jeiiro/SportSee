import axios from "axios"

const apiUrl = "http://localhost:3000/user"
const userId = 18

export const getUser = () => {
    return axios.get(`${apiUrl}/${userId}`)
}

export const getUserActivity = () => {
    return axios.get(`${apiUrl}/${userId}/activity`)
}

export const getUserAverageSessions = () => {
    return axios.get(`${apiUrl}/${userId}/average-sessions`)
}

export const getUserPerformance = () => {
    return axios.get(`${apiUrl}/${userId}/performance`)
}