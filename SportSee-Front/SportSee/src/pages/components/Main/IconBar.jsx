import PropTypes from "prop-types";
export default function IconBar({ icons }) {
  return (
    <section className="bg-black w-[117px] flex flex-col items-center justify-center relative gap-6">
       {/* Boucle sur le tableau d'icônes pour les afficher */}
      {icons.map((icon, index) => (
        <div key={index} className="bg-white h-16 w-16 rounded-md flex items-center justify-center">
          {icon} {/* Affichage de l'icône */}
        </div>
      ))}
         {/* Texte en bas de la barre d'icônes avec une rotation de 90 degrés */}
        <div className="font-roboto text-xs text-white w-[138px] h-6 -rotate-90 origin-center absolute bottom-[80px]">Copiryght, SportSee 2025</div>
    </section>

  );
}
// Définition des propTypes pour assurer la validation des props
IconBar.propTypes = {
    icons: PropTypes.arrayOf(PropTypes.node).isRequired, // icons doit être un tableau contenant des éléments React

  };
  