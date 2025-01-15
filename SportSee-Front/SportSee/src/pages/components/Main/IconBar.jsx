import PropTypes from "prop-types";
export default function IconBar({ icons }) {
  return (
    <section className="icon-bar">
      {icons.map((icon, index) => (
        <div key={index} className="icon-bar-item">
          {icon}
        </div>
      ))}
        <div className="copyright">Copiryght, SportSee 2025</div>
    </section>

  );
}

IconBar.propTypes = {
    icons: PropTypes.arrayOf(PropTypes.node).isRequired, 

  };
  