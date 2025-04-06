/**
 * Modèle utilisateur pour standardiser les données utilisateur
 */
export class UserModel {
  constructor(data) {
    this.id = data.id || data.userId;
    this.firstName = data.userInfos?.firstName || "";
    this.lastName = data.userInfos?.lastName || "";
    this.age = data.userInfos?.age || 0;
    this.todayScore = data.todayScore || data.score || 0;
    this.keyData = {
      calorieCount: data.keyData?.calorieCount || 0,
      proteinCount: data.keyData?.proteinCount || 0,
      carbohydrateCount: data.keyData?.carbohydrateCount || 0,
      lipidCount: data.keyData?.lipidCount || 0
    };
  }

  /**
   * Obtenir les données clés formatées pour l'affichage
   */
  getFormattedKeyData() {
    return {
      calorie: this.keyData.calorieCount,
      protein: this.keyData.proteinCount,
      carbohydrates: this.keyData.carbohydrateCount,
      lipids: this.keyData.lipidCount
    };
  }

  /**
   * Obtenir le score sous forme de pourcentage
   */
  getScorePercentage() {
    return this.todayScore * 100;
  }
}

/**
 * Modèle d'activité pour standardiser les données d'activité
 */
export class ActivityModel {
  constructor(data) {
    this.userId = data.userId;
    this.sessions = data.sessions?.map(session => ({
      day: this.formatDay(session.day),
      calories: session.calories,
      poids: session.kilogram
    })) || [];
  }

  /**
   * Formater le jour de AAAA-MM-JJ au jour du mois
   */
  formatDay(dateString) {
    if (!dateString) return "";
    return parseInt(dateString.split("-")[2], 10);
  }
}

/**
 * Modèle de sessions moyennes pour standardiser les données de sessions moyennes
 */
export class AverageSessionsModel {
  constructor(data) {
    this.userId = data.userId;
    this.sessions = data.sessions?.map(session => ({
      day: this.formatDay(session.day),
      time: session.sessionLength
    })) || [];
  }

  /**
   * Formater le jour de nombre à lettre (1 -> L, 2 -> M, etc.)
   */
  formatDay(day) {
    const daysMap = ["L", "M", "M", "J", "V", "S", "D"];
    return daysMap[day - 1] || "";
  }
}

/**
 * Modèle de performance pour standardiser les données de performance
 */
export class PerformanceModel {
  constructor(data) {
    this.userId = data.userId;
    this.kind = data.kind || {};
    this.data = data.data?.map(item => ({
      name: this.kind[item.kind],
      value: item.value
    })) || [];
  }
}