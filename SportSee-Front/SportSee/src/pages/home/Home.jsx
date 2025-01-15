import IconBar from "../components/Main/IconBar"
import Icon from "../components/Main/Icon"
import MeditationIcon from "../../assets/meditation.svg"
import SwimIcon from "../../assets/swim.svg"
import BikeIcon  from "../../assets/bike.svg"
import FitnessIcon  from "../../assets/fitness.svg"
import Welcome from "../components/Main/Welcome"
import DailyTracking from "../components/Main/DailyTracking"
import AverageSessions from "../components/Main/AverageSessions"
import Performance from "../components/Main/Performance"
import Score from "../components/Main/Score"
import Cards from "../components/Main/Cards"



const Home = () => {

  const icons = [
    <Icon key="meditation" svg={<img src={MeditationIcon} alt="Meditation" />} label="Meditation" />,
    <Icon key="swim" svg={<img src={SwimIcon} alt="Swim" />} label="Swim"></Icon>,
    <Icon key="bike" svg={<img src={BikeIcon} alt="Bike" />} label="Bike"></Icon>,
    <Icon key="fitness" svg={<img src={FitnessIcon} alt="Fitness" />} label="Fitness"></Icon>,
  ];


  return (
    <div className="app-main" style={{ display: 'flex' }}>
      <IconBar icons={icons} />
      <section style={{ marginLeft: '80px', padding: '20px' }}>
        <Welcome />
        <DailyTracking />
        <AverageSessions />
        <Performance/>
        <Score />
        <div className="cards">
          <Cards />
        </div>
      </section>
    </div>


  );
};

export default Home;
