/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { getUserAverageSessions } from "../../../api/api";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer} from 'recharts';


const AverageSessions = () => {
    const [averageSession, setAverageSessions] = useState(null);
    const daysOfWeek = ["L", "M", "M", "J", "V", "S", "D"];
    useEffect(() => {
        getUserAverageSessions().then(response => {
            const averageSessionResponse = response.data.data.sessions;
            let averageSessionsArray = averageSessionResponse.map((item, index) => ({
                day: daysOfWeek[index],
                time: item.sessionLength,
            }))
            setAverageSessions(averageSessionsArray);
        });
    }, []);

    if (!averageSession) {
        return <div>Loading...</div>;
    }

  return (
    <ResponsiveContainer className="w-full h-full">
      <LineChart width={258} height={263} data={averageSession} className="bg-red-700 rounded-md">
        <text x="7%" y="15%" textAnchor="start" fontSize="15" fill="#fff" className="text-white text-opacity-70 text-sm font-roboto">Durée moyenne des sessions</text>
        <CartesianGrid strokeDasharray="3 3" vertical={false} horizontal={false} />
        <Line type="monotone" dataKey="time" stroke="#fff" strokeWidth={2} dot={false}       activeDot={{
        r: 6, 
        fill: '#fff', 
        opacity: 1,
        stroke: '#fff',
        strokeWidth: 2,
      }}   
        className="opacity-70"/>
      <Line
      type="monotone"
      dataKey="time"
      stroke="transparent"
      dot={false}
      activeDot={({ cx, cy }) => (
        <circle cx={cx} cy={cy} r={15} fill="rgba(255, 255, 255, 0.5)" className="fill-white fill-opacity-50 blur-md" />
      )}
    />
      <Tooltip
        content={({ payload }) => {
          if (payload && payload.length) {
            const sessionLength = payload[0].payload.time;
            return (
              <div className="text-black bg-white p-2 font-roboto font-bold">
                {`${sessionLength} min`}
              </div>
            );
          }
          return null;
        }}
      />
        <YAxis type="number" domain={['auto', 'dataMax + 10']} hide={true} />
        <XAxis 
                    dataKey="day" 
                    axisLine={false}
                    tickLine={false}
                    tick={({ x, y, payload }) => {
                        
                        return (
                            <text x={x} y={y + 15} textAnchor="middle" fill="#fff" fontSize="12" className="text-white text-opacity-70 text-xs">
                                {payload.value}
                            </text>
                        );
                    }}
                    domain={['dataMin', 'dataMax']}
                    
 
                />
      </LineChart>
    </ResponsiveContainer>
  );
};



export default AverageSessions;
