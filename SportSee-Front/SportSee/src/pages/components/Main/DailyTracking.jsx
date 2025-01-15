/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { getUserActivity } from "../../../api/api";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';


const CustomTooltip = ({ payload, active }) => {
  if (active && payload && payload.length) {
    const { calories, poids } = payload[0].payload;

    return (
      <div
        style={{
          backgroundColor: 'red',
          color: 'white',
          padding: '10px',
        }}
      >
        <p>{`${poids} kg`}</p>
        <p>{`${calories} kcal`}</p>
      </div>
    );
  }

  return null;
};
const DailyTracking = () => {
  const [activity, setActivity] = useState(null);

  useEffect(() => {
    getUserActivity().then((res) => {
      const activityResponse = res.data.data.sessions;
      let activityArray = activityResponse.map((item) => ({
        day: parseInt(item.day.split("-")[2], 10),
        calories: item.calories, 
        poids: item.kilogram,
      }));
      
      setActivity(activityArray);
    });
  }, []);

  if (!activity) {
    return <div>Loading...</div>;
  }

    return (
      <ResponsiveContainer width="100%" height="30%" minWidth={"835px"}>
        <BarChart
          width={500}
          height={300}
          data={activity}
          margin={{
            top: 50,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <text 
          x="20" 
          y="20" 
          textAnchor="start" 
          dominantBaseline="central" 
          style={{ fontSize: '18px', fontWeight: 'bold', fill: '#20232a' }}
        >
          Activité quotidienne
        </text>
        <Legend align="right" verticalAlign="top" wrapperStyle={{
        top: 10,
        right: 50, 
      }} formatter={(value, entry) => {
          if (value === 'calories') {
              return <span style={{ color: entry.color }}>Calories brûlées (kCal)</span>;
            }
           else if (value === 'poids') {
              return <span style={{ color: entry.color }}>Poids (kg)</span>;
            }
            return value;
          }} />
          <CartesianGrid strokeDasharray="3 3" vertical={false}/>
          <XAxis dataKey="day" />
          <YAxis yAxisId="left" orientation="left" hide={true} />
          <YAxis yAxisId="right" orientation="right" stroke="#9B9EAC" />
          <Tooltip content={<CustomTooltip />} />
          <Bar yAxisId="right" dataKey="poids" fill="#282D30" legendType="circle" barSize={7} radius={[10, 10, 0, 0]} />
          <Bar yAxisId="left" dataKey="calories" fill="#E60000" legendType="circle" barSize={7} radius={[10, 10, 0, 0]} />

        </BarChart>
      </ResponsiveContainer>
    );
};

export default DailyTracking;