import { useEffect, useState } from "react";
import { getUser } from "../../../api/api";
import { RadialBarChart, RadialBar, ResponsiveContainer } from "recharts";

const Score = () => {
    // État pour stocker les données utilisateur
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Fonction asynchrone pour récupérer les données utilisateur
        const fetchUser = async () => {
            try {
                const res = await getUser();
                setUser(res.data.data);
            } catch (error) {
                console.error("Erreur lors de la récupération des données utilisateur :", error);
            }
        };

        fetchUser();
    }, []);

    // Vérification des données avant le rendu
    if (!user || (!user.todayScore && user.todayScore !== 0)) {
        return <div>Loading...</div>;
    }
    const { todayScore } = user

    // Calcul du pourcentage du score
    const scorePourcentage = user.todayScore * 100;
    const data = [{ scorePourcentage }];

    return (
        <div className="relative w-full h-full">
            <h3 className="absolute top-2 left-2 text-gray-900 text-sm font-roboto">Score</h3>
            <p className="absolute top-[38%] left-[37%] text-gray-900 text-xl font-bold xl:left-[40%] xl:text-2xl 2xl:left-[43%]">
                {`${Math.round(scorePourcentage)}%`}
            </p>
            <p className="absolute top-[49%] left-[33%] w-[50px] text-gray-500 text-xs xl:top-[53%] xl:w-full xl:text-lg xl:left-[24%] 2xl:left-[30%]">
                de votre objectif
            </p>
            <ResponsiveContainer width="100%" height="100%">
                <RadialBarChart cx="50%" cy="50%" innerRadius="80%" outerRadius="80%" barSize={12} data={data} startAngle={90} endAngle={450*todayScore+90}>
                    <RadialBar background dataKey="scorePourcentage" fill="red" cornerRadius={30 / 2} />
                </RadialBarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default Score;
