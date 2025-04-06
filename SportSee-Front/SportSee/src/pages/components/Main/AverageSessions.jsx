import { useEffect, useState } from "react";
import { getUserAverageSessions } from "../../../api/api";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer} from 'recharts';

/**
 * Composant qui affiche un graphique de la durée moyenne des sessions utilisateur.
 */
const AverageSessions = () => {
  // État local pour stocker les sessions moyennes de l'utilisateur
  const [averageSession, setAverageSessions] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Utilisation de useEffect avec une fonction asynchrone
  useEffect(() => {
    // Fonction asynchrone pour récupérer les données
    const fetchAverageSessions = async () => {
      try {
        setIsLoading(true);
        // Appel de l'API avec notre nouveau modèle
        const data = await getUserAverageSessions();
        
        // Mise à jour de l'état avec les données transformées
        setAverageSessions(data.sessions);
        setError(null);
      } catch (error) {
        // En cas d'erreur, on log l'erreur et on met à jour l'état d'erreur
        console.error("Erreur lors de la récupération des sessions :", error);
        setError("Impossible de charger les données des sessions moyennes");
      } finally {
        setIsLoading(false);
      }
    };

    // Appel de la fonction asynchrone pour récupérer les données
    fetchAverageSessions();
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
  if (!averageSession || averageSession.length === 0) {
    return <div className="flex justify-center items-center h-full">Aucune donnée disponible</div>;
  }

  return (
    <ResponsiveContainer className="w-full h-full">
      <LineChart width={258} height={263} data={averageSession} className="bg-red-700 rounded-md">
        <text x="7%" y="15%" textAnchor="start" fontSize="15" fill="#fff" className="text-white text-opacity-70 text-sm font-roboto">Durée moyenne des sessions</text>
        <CartesianGrid strokeDasharray="3 3" vertical={false} horizontal={false} />
        <Line 
          type="monotone" 
          dataKey="time" 
          stroke="#fff" 
          strokeWidth={2} 
          dot={false} 
          activeDot={{
            r: 6, 
            fill: '#fff', 
            opacity: 1,
            stroke: '#fff',
            strokeWidth: 2,
          }}   
          className="opacity-70"
        />
        <Line
          type="monotone"
          dataKey="time"
          stroke="transparent"
          dot={false}
          activeDot={({ cx, cy }) => (
            <circle cx={cx} cy={cy} r={15} fill="rgba(255, 255, 255, 0.5)" className="fill-white fill-opacity-50 blur-md" />
          )}
        />
        <Tooltip
          content={({ payload }) => {
            if (payload && payload.length) {
              const sessionLength = payload[0].payload.time;
              return (
                <div className="text-black bg-white p-2 font-roboto font-bold">
                  {`${sessionLength} min`}
                </div>
              );
            }
            return null;
          }}
        />
        <YAxis type="number" domain={['auto', 'dataMax + 10']} hide={true} />
        <XAxis 
          dataKey="day" 
          axisLine={false}
          tickLine={false}
          tick={({ x, y, payload }) => {
            return (
              <text x={x} y={y + 15} textAnchor="middle" fill="#fff" fontSize="12" className="text-white text-opacity-70 text-xs">
                {payload.value}
              </text>
            );
          }}
          domain={['dataMin', 'dataMax']}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default AverageSessions;
