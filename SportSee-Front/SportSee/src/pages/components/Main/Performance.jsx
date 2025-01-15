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


    return (
      <ResponsiveContainer width="40%" height="40%">
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={performance} style={{ backgroundColor: '#282D30', borderRadius: '6px' }}>
        <PolarGrid />  
        <PolarAngleAxis dataKey="name" />
        <Radar  dataKey="value" stroke="#FF0101" fill="#FF0101" fillOpacity={0.7}/>
        </RadarChart>
      </ResponsiveContainer>
    );
}
export default Performance;