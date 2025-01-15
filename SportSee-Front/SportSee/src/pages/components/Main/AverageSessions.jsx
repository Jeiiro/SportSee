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
    <ResponsiveContainer width="40%" height="40%" >
      <LineChart width={400} height={200} data={averageSession} style={{ backgroundColor: '#ff0000', borderRadius: '6px' }}>
        <text x="10%" y="15%" textAnchor="start" fontSize="15" fill="#fff" style={{ fontFamily: 'Roboto, sans-serif',opacity: 0.7 }}>Durée moyenne des sessions</text>
        <CartesianGrid strokeDasharray="3 3" vertical={false} horizontal={false} />
        <Line type="monotone" dataKey="time" stroke="#fff" strokeWidth={2} dot={false}       activeDot={{
        // Point sans flou
        r: 6, 
        fill: '#fff', 
        opacity: 1,
        stroke: '#fff',
        strokeWidth: 2,
      }}   style={{ opacity: 0.7 }} />
      <Line
      type="monotone"
      dataKey="time"
      stroke="transparent"
      dot={false}
      activeDot={({ cx, cy }) => (
        <circle cx={cx} cy={cy} r={15} fill="rgba(255, 255, 255, 0.5)" style={{ filter: 'blur(4px)' }} />
      )}
    />
        <Tooltip 
            content={({ payload }) => {
                if (payload && payload.length) {
                  const sessionLength = payload[0].payload.time;
                  return <div style={{ color: '#000', backgroundColor: '#fff', padding: '10px',        fontFamily: 'Roboto, sans-serif', 
                    fontWeight: 'bold' }}>{`${sessionLength} min`}</div>;
                }
                return null;
              }} />
        <YAxis type="number" domain={['auto', 'dataMax + 10']} hide={true} />
        <XAxis 
                    dataKey="day" 
                    axisLine={false}
                    tickLine={false}
                    tick={({ x, y, payload }) => {
                        
                        return (
                            <text x={x} y={y + 15} textAnchor="middle" fill="#fff" fontSize="12" style={{ opacity: 0.7 }}>
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
