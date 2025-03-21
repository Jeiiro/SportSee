import axios from "axios" 

// Définition de l'URL de base de l'API pour récupérer les données utilisateur
const apiUrl = "http://localhost:3000/user"

// ID de l'utilisateur pour lequel nous récupérons les données (peut être rendu dynamique si nécessaire)
const userId = 18

/*
 * Récupère les informations générales de l'utilisateur spécifié.
 */
export const getUser = () => {
    return axios.get(`${apiUrl}/${userId}`)
}

/*
 * Récupère les données d'activité de l'utilisateur (ex: calories brûlées, temps d'activité).
 */
export const getUserActivity = () => {
    return axios.get(`${apiUrl}/${userId}/activity`)
}

/*
 * Récupère les sessions moyennes de l'utilisateur sur une période donnée 
 * (ex: durée moyenne des entraînements par jour).
 */
export const getUserAverageSessions = () => {
    return axios.get(`${apiUrl}/${userId}/average-sessions`)
}

/*
 * Récupère les performances de l'utilisateur (ex: score, statistiques détaillées).
 */
export const getUserPerformance = () => {
    return axios.get(`${apiUrl}/${userId}/performance`)
}