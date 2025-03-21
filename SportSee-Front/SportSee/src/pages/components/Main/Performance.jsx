import { useEffect, useState } from "react";
import { getUserPerformance } from "../../../api/api";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from 'recharts';

const Performance = () => {
    // État pour stocker les données de performance
    const [performance, setPerformance] = useState(null);

    useEffect(() => {
        // Fonction asynchrone pour récupérer et traiter les données
        const fetchPerformance = async () => {
            try {
                const res = await getUserPerformance();
                const performanceResponse = res.data.data.data;
                const kindList = res.data.data.kind;

                // Transformation des données en un format adapté au graphique
                let performanceArray = performanceResponse.map((item) => ({
                    name: kindList[item.kind], // Associe chaque performance à son libellé
                    value: item.value // Valeur de la performance
                }));

                setPerformance(performanceArray); // Mise à jour de l'état
            } catch (error) {
                console.error("Erreur lors de la récupération des performances :", error);
            }
        };

        fetchPerformance();
    }, []);

    // Affichage d'un message de chargement tant que les données ne sont pas disponibles
    if (!performance) {
        return <div>Loading...</div>;
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
}

export default Performance;