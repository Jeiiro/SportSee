import { useEffect, useState } from "react";
import {
  getUser,
} from "../../../api/api";
const Welcome = () => {
    const [user, setUser] = useState(null);
  
    useEffect(() => {
        getUser().then((res) => {
          setUser(res.data.data);
        });
      }, []);
  
    if (!user || !user.userInfos) {
      return <div>Loading...</div>;
    }

    const { firstName } = user.userInfos;
    
  
    return (
      <div className="flex flex-col justify-between h-[89px]">
        <h1 className="font-roboto text-5xl font-medium">Bonjour <span className="font-roboto text-5xl font-medium text-red-600">{firstName}</span>,</h1>
        <p className="font-roboto font-normal text-lg">Félicitations ! Vous avez explosé vos objectifs hier{'👏'}</p>
       
      </div>
    );
  };
  
  export default Welcome;