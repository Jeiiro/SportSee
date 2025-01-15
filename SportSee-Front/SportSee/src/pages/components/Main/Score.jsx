import { useEffect, useState } from "react";
import {
  getUser,
} from "../../../api/api";
import { RadialBarChart, RadialBar, ResponsiveContainer } from 'recharts';

const Score = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        getUser().then((res) => {
          setUser(res.data.data);
          console.log(res.data.data);
        });
      }, []);

      if (!user || !user.todayScore) {
        return <div>Loading...</div>;
      }

      const { todayScore } = user;
      console.log(todayScore);
      const scorePourcentage = todayScore * 100;
      const data = [{ scorePourcentage }];


    return (
        <div style={{ position: "relative", width: "40%", height: "40%" }}>
        <h3 style={{ position: "absolute", top: 10, left: 10, color: '#333', fontFamily:"Roboto", fontSize:"15px" }}>Score</h3>
        <p style={{ position: "absolute", top: "27%", left: "43%", color: '#333', fontFamily:"Roboto", fontSize:"26px", fontWeight:"700"}}>{`${Math.round(scorePourcentage)}%`}</p>
        <p style={{ position: "absolute", top: "43%", left: "33%", color: '#333', fontFamily:"Roboto", fontSize:"16px"}}>{`de votre objectif`}</p>
        <ResponsiveContainer width="100%" height="100%">
            <RadialBarChart cx="50%" cy="50%" innerRadius="60%" outerRadius="60%" barSize={12} data={data} startAngle={90} endAngle={450*todayScore+90}>
                <RadialBar
                    background
                    dataKey="scorePourcentage"
                    fill="red" 
                    cornerRadius={30 / 2}
                />
            </RadialBarChart>
        </ResponsiveContainer>
    </div>
      );
}

export default Score;



