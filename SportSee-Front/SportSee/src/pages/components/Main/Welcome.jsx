import { useEffect, useState } from "react";
import { getUser } from "../../../api/api";

const Welcome = () => {
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
    if (!user || !user.userInfos) {
        return <div>Loading...</div>;
    }

    // Extraction du prénom de l'utilisateur
    const { firstName } = user.userInfos;

    return (
        <div className="flex flex-col justify-between h-[89px]">
            <h1 className="font-roboto text-5xl font-medium">
                Bonjour <span className="text-red-600">{firstName}</span>,
            </h1>
            <p className="font-roboto font-normal text-lg">
                Félicitations ! Vous avez explosé vos objectifs hier{' 👏'}
            </p>
        </div>
    );
};

export default Welcome;