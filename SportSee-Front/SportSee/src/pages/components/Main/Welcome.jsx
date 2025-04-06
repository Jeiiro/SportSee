import { useEffect, useState } from "react";
import { getUser } from "../../../api/api";

const Welcome = () => {
  // État pour stocker les données utilisateur
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fonction asynchrone pour récupérer les données utilisateur
    const fetchUser = async () => {
      try {
        setIsLoading(true);
        // Récupère les données utilisateur avec notre nouveau modèle
        const userData = await getUser();
        
        // Mise à jour de l'état avec les données transformées
        setUser(userData);
        setError(null);
      } catch (error) {
        console.error("Erreur lors de la récupération des données utilisateur :", error);
        setError("Impossible de charger les données utilisateur");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, []);

  // Affichage d'un message de chargement tant que les données ne sont pas disponibles
  if (isLoading) {
    return <div className="flex justify-center items-center h-full">Chargement...</div>;
  }

  // Affichage d'un message d'erreur si une erreur s'est produite
  if (error) {
    return <div className="flex justify-center items-center h-full text-red-500">{error}</div>;
  }

  // Vérification des données avant le rendu
  if (!user) {
    return <div className="flex justify-center items-center h-full">Aucune donnée disponible</div>;
  }

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-5xl font-bold">
        Bonjour <span className="text-red-500">{user.firstName}</span>
      </h1>
      <p className="text-lg">Félicitations ! Vous avez explosé vos objectifs hier 👏</p>
    </div>
  );
};

export default Welcome;