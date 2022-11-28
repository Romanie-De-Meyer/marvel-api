import "./index.css";
import ReactDOM from "react-dom";

const Popup = ({ ...props }) => {
  return ReactDOM.createPortal(
    <div className="popup-container">
      <div className="popup-body">
        <span className="close" onClick={props.closePopup}></span>
        {props.children}
      </div>
    </div>,
    document.body
  );
};

export default Popup;