import logo  from "../../../assets/logo.svg";


const Header = () => {
  return (
    <header className="bg-black h-[70px] xl:h-[91px]">
      <div className="flex justify-between items-center text-white my-0 mx-auto p-2 h-full 2xl:mx-6">
        <img src={logo} alt="logo" className="w-[178px] h-[51px] xl:h-[71px]" />
        <nav className="w-10/12">
          <ul className="flex justify-around list-none text-base font-roboto">
            <li>Accueil</li>
            <li>Profil</li>
            <li>Réglages</li>
            <li>Communauté</li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
