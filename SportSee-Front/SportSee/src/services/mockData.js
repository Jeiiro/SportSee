/**
 * Données simulées pour l'application
 * Ces données imitent la structure des réponses de l'API
 * Utilisées comme solution de repli en cas d'indisponibilité de l'API
 */
const mockData = {
  user: {
    id: 18,
    userInfos: {
      firstName: "Cecilia",
      lastName: "Ratorez",
      age: 34,
    },
    todayScore: 0.3,
    keyData: {
      calorieCount: 2500,
      proteinCount: 90,
      carbohydrateCount: 150,
      lipidCount: 120,
    },
  },
  activity: {
    userId: 18,
    sessions: [
      { day: "2020-07-01", kilogram: 70, calories: 240 },
      { day: "2020-07-02", kilogram: 69, calories: 220 },
      { day: "2020-07-03", kilogram: 70, calories: 280 },
      { day: "2020-07-04", kilogram: 70, calories: 500 },
      { day: "2020-07-05", kilogram: 69, calories: 160 },
      { day: "2020-07-06", kilogram: 69, calories: 162 },
      { day: "2020-07-07", kilogram: 69, calories: 390 },
    ],
  },
  averageSessions: {
    userId: 18,
    sessions: [
      { day: 1, sessionLength: 30 },
      { day: 2, sessionLength: 40 },
      { day: 3, sessionLength: 50 },
      { day: 4, sessionLength: 30 },
      { day: 5, sessionLength: 30 },
      { day: 6, sessionLength: 50 },
      { day: 7, sessionLength: 50 },
    ],
  },
  performance: {
    userId: 18,
    kind: {
      1: "cardio",
      2: "energy",
      3: "endurance",
      4: "strength",
      5: "speed",
      6: "intensity",
    },
    data: [
      { kind: 1, value: 80 },
      { kind: 2, value: 120 },
      { kind: 3, value: 140 },
      { kind: 4, value: 50 },
      { kind: 5, value: 200 },
      { kind: 6, value: 90 },
    ],
  },
};

export default mockData;