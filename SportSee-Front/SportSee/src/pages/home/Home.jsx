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
    <div className="flex h-[calc(100vh-70px)] xl:h-[calc(100vh-91px)]">
      <IconBar icons={icons} />
      <section className="flex w-[calc(100vw-117px)] flex-col my-10 mx-6 xl:mx-24">
        <div className="mb-8"><Welcome /></div>
        <div className="flex">
          <div className="flex flex-wrap justify-between gap-y-4 w-[80%]">
            <div className="w-full"><DailyTracking /></div>
            <div className="w-[30%]"><AverageSessions /></div>
            <div className="w-[50%] xl:w-[38%]"><Performance/></div>
            <div className="w-[18%] xl:w-[28%]"><Score /></div>
          </div>
          <div className="w-[20%]"><Cards /></div>
        </div>
      </section>
    </div>


  );
};

export default Home;
