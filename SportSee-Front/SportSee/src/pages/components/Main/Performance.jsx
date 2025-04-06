import { useEffect, useState } from "react";
import { getUserPerformance } from "../../../api/api";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from 'recharts';

const Performance = () => {
  // État pour stocker les données de performance
  const [performance, setPerformance] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fonction asynchrone pour récupérer et traiter les données
    const fetchPerformance = async () => {
      try {
        setIsLoading(true);
        // Récupère les données de performance avec notre nouveau modèle
        const performanceData = await getUserPerformance();
        
        // Mise à jour de l'état avec les données transformées
        setPerformance(performanceData.data);
        setError(null);
      } catch (error) {
        console.error("Erreur lors de la récupération des performances :", error);
        setError("Impossible de charger les données de performance");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPerformance();
  }, []);

  // Affichage d'un message de chargement tant que les données ne sont pas disponibles
  if (isLoading) {
    return <div className="flex justify-center items-center h-full">Chargement...</div>;
  }

  // Affichage d'un message d'erreur si une erreur s'est produite
  if (error) {
    return <div className="flex justify-center items-center h-full text-red-500">{error}</div>;
  }

  // Vérification que les données sont disponibles
  if (!performance || performance.length === 0) {
    return <div className="flex justify-center items-center h-full">Aucune donnée disponible</div>;
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <RadarChart 
        cx="50%" 
        cy="50%" 
        outerRadius="80%" 
        data={performance} 
        className="bg-gray-800 rounded-md"
      >
        <PolarGrid />
        <PolarAngleAxis dataKey="name" className="text-white" />
        <Radar dataKey="value" stroke="#FF0101" fill="#FF0101" fillOpacity={0.6} />
      </RadarChart>
    </ResponsiveContainer>
  );
};

export default Performance;