import { useEffect, useState } from "react";
import { getUserPerformance } from "../../../api/api";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from 'recharts';

const Performance = () => {
    const [performance,setPerformance]=useState(null);

    useEffect(() => {
        getUserPerformance().then((res) => {
            const performanceResponse = res.data.data.data;
            const kindList = res.data.data.kind;
            let performanceArray = performanceResponse.map((item) => ({
                name: kindList[item.kind],
                value: item.value
            }));
            setPerformance(performanceArray);
        });
    }, []);

    if (!performance) {
      return <div>Loading...</div>;
    }

    return (
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={performance} className="bg-gray-800 rounded-md">
        <PolarGrid />  
        <PolarAngleAxis dataKey="name" className="text-white" />
        <Radar  dataKey="value" stroke="#FF0101" fill="#FF0101" fillOpacity={0.6}/>
        </RadarChart>
      </ResponsiveContainer>
    );
}
export default Performance;