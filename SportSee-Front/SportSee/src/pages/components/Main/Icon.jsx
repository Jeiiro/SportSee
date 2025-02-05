import PropTypes from "prop-types"; 

export default function Icon({svg, label="",}) {  
    return (
    <div title={label}>
      {svg}
    </div>
  );
}

Icon.propTypes = {
    svg: PropTypes.node.isRequired, 
    label: PropTypes.string,        
  };
  
