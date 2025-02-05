/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { getUserActivity } from "../../../api/api";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';


const CustomTooltip = ({ payload, active }) => {
  if (active && payload && payload.length) {
    const { calories, poids } = payload[0].payload;

    return (
      <div
        className="bg-red-500 text-white p-2"
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
      
      <ResponsiveContainer width="100%" height="100%" >
        <BarChart
          width={835}
          height={320}
          data={activity}
          margin={{ top: 50, right: 30, left: 20, bottom: 20 }}
        >
          <text 
          x="20" 
          y="20" 
          textAnchor="start" 
          dominantBaseline="central" 
          className="text-lg font-bold fill-gray-900"
        >
          Activité quotidienne
        </text>
        <Legend align="right" verticalAlign="top" wrapperStyle={{
        top: 10,
        right: 50, 
      }} formatter={(value) => {
          if (value === 'calories') {
              return <span className="text-red-600">Calories brûlées (kCal)</span>;
            }
           else if (value === 'poids') {
              return <span className="text-gray-800">Poids (kg)</span>;
            }
            return value;
          }} />
          <CartesianGrid strokeDasharray="3 3" vertical={false}/>
          <XAxis dataKey="day" className=" px-[20px] "/>
          <YAxis yAxisId="left" orientation="left" hide={true} />
          <YAxis yAxisId="right" orientation="right" className="stroke-gray-400" />
          <Tooltip content={<CustomTooltip />} />
          <Bar yAxisId="right" dataKey="poids" fill="#282D30" legendType="circle" barSize={7} radius={[10, 10, 0, 0]} />
          <Bar yAxisId="left" dataKey="calories" fill="#E60000" legendType="circle" barSize={7} radius={[10, 10, 0, 0]} />

        </BarChart>

      </ResponsiveContainer>
    );
};

export default DailyTracking;