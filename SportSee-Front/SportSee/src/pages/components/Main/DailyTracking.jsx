/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { getUserActivity } from "../../../api/api";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

/*
 * Composant personnalisé pour afficher le tooltip (infobulle) du graphique
*/
const CustomTooltip = ({ payload, active }) => {
  if (active && payload && payload.length) {
    const { calories, poids } = payload[0].payload; // Récupère les données spécifiques des calories et du poids

    return (
      <div
        className="bg-red-500 text-white p-2"
      >
        <p>{`${poids} kg`}</p>
        <p>{`${calories} kcal`}</p>
      </div>
    );
  }

  return null; // Retourne null si le tooltip n'est pas actif
};

/**
 * Composant pour afficher l'activité quotidienne sous forme de graphique en barres
 */
const DailyTracking = () => {
  const [activity, setActivity] = useState(null); // Déclare l'état local pour stocker les données d'activité

  useEffect(() => {
    // Utilisation de useEffect pour récupérer les données d'activité de l'utilisateur au premier rendu du composant
    // Fonction asynchrone pour récupérer les données d'activité
    const fetchData = async () => {
      try {
        const res = await getUserActivity(); // Récupère les données des activités
        const activityResponse = res.data.data.sessions; // Récupère les données des sessions d'activité
        
        let activityArray = activityResponse.map((item) => ({
          day: parseInt(item.day.split("-")[2], 10), // Extrait le jour du mois à partir de la date (format : YYYY-MM-DD)
          calories: item.calories, // Récupère le nombre de calories brûlées
          poids: item.kilogram, // Récupère le poids de l'utilisateur
        }));

        setActivity(activityArray); // Met à jour l'état avec les données transformées
      } catch (error) {
        console.error("Erreur lors de la récupération des données:", error); // Affiche une erreur si la récupération échoue
      } 
    };

    fetchData(); // Appelle la fonction asynchrone pour récupérer les données

  }, []);

  // Affichage d'un message de chargement si les données ne sont pas encore disponibles
  if (!activity) {
    return <div>Loading...</div>;
  }
    return (
      
      <ResponsiveContainer width="100%" height="100%" >
        <BarChart
          width={835}
          height={320}
          data={activity}
          margin={{ top: 50, right: 30, left: 20, bottom: 20 }}
        >
          <text 
          x="20" 
          y="20" 
          textAnchor="start" 
          dominantBaseline="central" 
          className="text-lg font-bold fill-gray-900"
        >
          Activité quotidienne
        </text>
        <Legend align="right" verticalAlign="top" wrapperStyle={{
        top: 10,
        right: 50, 
      }} formatter={(value) => {
          if (value === 'calories') {
              return <span className="text-red-600">Calories brûlées (kCal)</span>;
            }
           else if (value === 'poids') {
              return <span className="text-gray-800">Poids (kg)</span>;
            }
            return value;
          }} />
          <CartesianGrid strokeDasharray="3 3" vertical={false}/>
          <XAxis dataKey="day" className=" px-[20px] "/>
          <YAxis yAxisId="left" orientation="left" hide={true} />
          <YAxis yAxisId="right" orientation="right" className="stroke-gray-400" />
          <Tooltip content={<CustomTooltip />} />
          <Bar yAxisId="right" dataKey="poids" fill="#282D30" legendType="circle" barSize={7} radius={[10, 10, 0, 0]} />
          <Bar yAxisId="left" dataKey="calories" fill="#E60000" legendType="circle" barSize={7} radius={[10, 10, 0, 0]} />

        </BarChart>

      </ResponsiveContainer>
    );
};

export default DailyTracking;