import { useEffect, useState } from "react";
import {
  getUser,
} from "../../../api/api";
import energy from "../../../assets/energy.svg"
import chicken from "../../../assets/chicken.svg"
import apple from "../../../assets/apple.svg"
import cheeseburger from "../../../assets/cheeseburger.svg"

const Card = () => {
    const [user, setUser] = useState(null);

    const categoryMapping = {
        calorie: { icon: energy, unit: "kCal", label: "Calories" },
        protein: { icon: chicken, unit: "g", label: "Protéines" },
        lipids: { icon: cheeseburger, unit: "g", label: "Lipides" },
        carbohydrates: { icon: apple, unit: "g", label: "Glucides" },
    };
    
    useEffect(() => {
        getUser().then((res) => {
            const userResponse = res.data.data.keyData;
            const userArray = Array.isArray(userResponse)
                ? userResponse.map((item) => ({
                    calorie: item.calorieCount,
                    protein: item.proteinCount,
                    lipids: item.lipidCount,
                    carbohydrates: item.carbohydrateCount,
                }))
                : [{
                    calorie: userResponse.calorieCount,
                    protein: userResponse.proteinCount,
                    lipids: userResponse.lipidCount,
                    carbohydrates: userResponse.carbohydrateCount,
                }];
            setUser(userArray);
        });
      }, []);

      if (!user) {
        return <div>Loading...</div>;
      }

      return (
        <div className="card">
        {user.map((item, index) => (
            <div key={index} className="card-item">
                {Object.entries(item).map(([key, value]) => (
                    <div key={key} className="category">
                        <img
                            src={categoryMapping[key].icon}
                            alt={`${categoryMapping[key].label} icon`}
                            className="category-icon"
                        />
                        <p>
                            <strong>{value}{categoryMapping[key].unit}</strong>
                        </p>
                        <p>{categoryMapping[key].label}</p>
                    </div>
                ))}
            </div>
        ))}
    </div>
      )
}
export default Card