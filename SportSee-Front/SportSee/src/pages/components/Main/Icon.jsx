import PropTypes from "prop-types"; 

export default function Icon({svg, label="",}) {  
    return (
    <div title={label}>
      {svg}
    </div>
  );
}
// Définition des propTypes pour assurer la validation des props
Icon.propTypes = {
    svg: PropTypes.node.isRequired, /**S'assure que la prop svg est un élément React valide (comme un composant SVG) et est obligatoire. */
    label: PropTypes.string,      /**indique que la prop label est une chaîne de caractères, mais elle est optionnelle, donc elle n'est pas obligatoire. */  
  };
  
