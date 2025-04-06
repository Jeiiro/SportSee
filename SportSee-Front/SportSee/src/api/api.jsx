import dataService from "../services/dataService";
import { UserModel, ActivityModel, AverageSessionsModel, PerformanceModel } from "../models/UserModel";


/**
 * Récupère les informations générales de l'utilisateur spécifié.
 * @returns {Promise<UserModel>} Données utilisateur formatées
 */
export const getUser = async () => {
  try {
    const userData = await dataService.getUserData();
    return new UserModel(userData);
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};

/**
 * Récupère les données d'activité de l'utilisateur (ex: calories brûlées, temps d'activité).
 * @returns {Promise<ActivityModel>} Données d'activité formatées
 */
export const getUserActivity = async () => {
  try {
    const activityData = await dataService.getUserActivity();
    return new ActivityModel(activityData);
  } catch (error) {
    console.error("Error fetching activity data:", error);
    throw error;
  }
};

/**
 * Récupère les sessions moyennes de l'utilisateur sur une période donnée 
 * (ex: durée moyenne des entraînements par jour).
 * @returns {Promise<AverageSessionsModel>} Données de sessions formatées
 */
export const getUserAverageSessions = async () => {
  try {
    const sessionsData = await dataService.getUserAverageSessions();
    return new AverageSessionsModel(sessionsData);
  } catch (error) {
    console.error("Error fetching average sessions data:", error);
    throw error;
  }
};

/**
 * Récupère les performances de l'utilisateur (ex: score, statistiques détaillées).
 * @returns {Promise<PerformanceModel>} Données de performance formatées
 */
export const getUserPerformance = async () => {
  try {
    const performanceData = await dataService.getUserPerformance();
    return new PerformanceModel(performanceData);
  } catch (error) {
    console.error("Error fetching performance data:", error);
    throw error;
  }
};
