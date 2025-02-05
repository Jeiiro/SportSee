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
        calorie: { icon: energy, unit: "kCal", label: "Calories", bgClass: "bg-red-100"},
        protein: { icon: chicken, unit: "g", label: "Protéines", bgClass: "bg-blue-100" },
        carbohydrates: { icon: apple, unit: "g", label: "Glucides", bgClass: "bg-yellow-100" },
        lipids: { icon: cheeseburger, unit: "g", label: "Lipides", bgClass: "bg-rose-100" },      
    };
    
    useEffect(() => {
        getUser().then((res) => {
            const userResponse = res.data.data.keyData;
            const userArray = Array.isArray(userResponse)
                ? userResponse.map((item) => ({
                    calorie: item.calorieCount,
                    protein: item.proteinCount,
                    carbohydrates: item.carbohydrateCount,
                    lipids: item.lipidCount,
                    
                }))
                : [{
                    calorie: userResponse.calorieCount,
                    protein: userResponse.proteinCount,
                    carbohydrates: userResponse.carbohydrateCount,
                    lipids: userResponse.lipidCount,
                    
                }];
            setUser(userArray);
        });
      }, []);

      if (!user) {
        return <div>Loading...</div>;
      }

      return (
        <div>
        {user.map((item, index) => (
            <div key={index}>
                {Object.entries(item).map(([key, value]) => (
                    <div key={key} className="flex justify-center gap-4 items-center h-[124px]">
                        <img
                            src={categoryMapping[key].icon}
                            alt={`${categoryMapping[key].label} icon`}
                            className={`p-4 rounded-md ${categoryMapping[key].bgClass}`}
                        />
                        <div>
                        <p>
                            <strong>{value}{categoryMapping[key].unit}</strong>
                        </p>
                        <p>{categoryMapping[key].label}</p>
                        </div>
                    </div>
                ))}
            </div>
        ))}
    </div>
      )
}
export default Card