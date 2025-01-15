import PropTypes from "prop-types"; 

export default function Icon({svg, label="",}) {  
    return (
    <div className="icon" title={label}>
      {svg}
    </div>
  );
}

Icon.propTypes = {
    svg: PropTypes.node.isRequired, 
    label: PropTypes.string,        
  };
  
