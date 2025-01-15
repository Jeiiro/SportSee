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
      <div>
        <h1>Bonjour {firstName},</h1>
        <p>Félicitations ! Vous avez explosé vos objectifs hier{'👏'}</p>
       
      </div>
    );
  };
  
  export default Welcome;