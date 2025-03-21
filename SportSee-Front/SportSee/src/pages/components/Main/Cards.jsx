import { useEffect, useState } from "react";
import { getUser } from "../../../api/api";
import energy from "../../../assets/energy.svg";
import chicken from "../../../assets/chicken.svg";
import apple from "../../../assets/apple.svg";
import cheeseburger from "../../../assets/cheeseburger.svg";

const Card = () => {
    // État pour stocker les données de l'utilisateur
    const [userData, setUserData] = useState(null);

    // Mapping des catégories avec leurs icônes, unités et classes CSS
    const categoryMapping = {
        calorie: { icon: energy, unit: "kCal", label: "Calories", bgClass: "bg-red-100" },
        protein: { icon: chicken, unit: "g", label: "Protéines", bgClass: "bg-blue-100" },
        carbohydrates: { icon: apple, unit: "g", label: "Glucides", bgClass: "bg-yellow-100" },
        lipids: { icon: cheeseburger, unit: "g", label: "Lipides", bgClass: "bg-rose-100" },
    };

    useEffect(() => {
        // Fonction asynchrone pour récupérer les données utilisateur
        const fetchUserData = async () => {
            try {
                const res = await getUser();
                const keyData = res.data.data.keyData;

                // Vérification et transformation des données
                setUserData({
                    calorie: keyData.calorieCount,
                    protein: keyData.proteinCount,
                    carbohydrates: keyData.carbohydrateCount,
                    lipids: keyData.lipidCount,
                });
            } catch (error) {
                console.error("Erreur lors de la récupération des données utilisateur :", error);
            }
        };

        fetchUserData();
    }, []);

    // Affichage d'un message de chargement si les données ne sont pas encore disponibles
    if (!userData) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            {Object.entries(userData).map(([key, value]) => (
                <div key={key} className="flex justify-center gap-4 items-center h-[124px]">
                    <img
                        src={categoryMapping[key].icon}
                        alt={`${categoryMapping[key].label} icon`}
                        className={`p-4 rounded-md ${categoryMapping[key].bgClass}`}
                    />
                    <div>
                        <p className="text-lg font-bold">{value}{categoryMapping[key].unit}</p>
                        <p className="text-gray-600">{categoryMapping[key].label}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Card;