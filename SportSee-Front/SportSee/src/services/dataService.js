import axios from "axios";
import mockData from "./mockData";

/**
 * Service pour gérer la récupération des données avec la possibilité de basculer entre l'API et les données simulées
 */
class DataService {
  constructor() {
    this.apiUrl = "http://localhost:3000/user";
    this.userId = 18; // ID utilisateur par défaut
  }

  /**
   * Définit l'ID utilisateur pour les appels API
   * @param {number} id - ID utilisateur
   */
  setUserId(id) {
    this.userId = id;
    console.log(`ID utilisateur défini à: ${id}`);
  }

  /**
   * Récupère les données principales de l'utilisateur
   * @returns {Promise<Object>} Données utilisateur
   */
  async getUserData() {
    try {
      const response = await axios.get(`${this.apiUrl}/${this.userId}`);
      return response.data.data;
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des données utilisateur:",
        error
      );
      console.log("Repli sur les données simulées");
      return mockData.user;
    }
  }

  /**
   * Récupère les données d'activité de l'utilisateur
   * @returns {Promise<Object>} Données d'activité
   */
  async getUserActivity() {
    try {
      const response = await axios.get(
        `${this.apiUrl}/${this.userId}/activity`
      );
      return response.data.data;
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des données d'activité:",
        error
      );
      console.log("Repli sur les données simulées");
      return mockData.activity;
    }
  }

  /**
   * Récupère les données de sessions moyennes de l'utilisateur
   * @returns {Promise<Object>} Données de sessions moyennes
   */
  async getUserAverageSessions() {
    try {
      const response = await axios.get(
        `${this.apiUrl}/${this.userId}/average-sessions`
      );
      return response.data.data;
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des données de sessions moyennes:",
        error
      );
      console.log("Repli sur les données simulées");
      return mockData.averageSessions;
    }
  }

  /**
   * Récupère les données de performance de l'utilisateur
   * @returns {Promise<Object>} Données de performance
   */
  async getUserPerformance() {
    try {
      const response = await axios.get(
        `${this.apiUrl}/${this.userId}/performance`
      );
      return response.data.data;
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des données de performance:",
        error
      );
      console.log("Repli sur les données simulées");
      return mockData.performance;
    }
  }
}

// Création d'une instance singleton
const dataService = new DataService();
export default dataService;
