import logo  from "../../../assets/logo.svg";


const Header = () => {
  return (
    <header className="header">
      <div className="header-container">
        <img src={logo} alt="logo" className="app-logo" />
        <nav className="navbar">
          <ul className="nav-list">
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
