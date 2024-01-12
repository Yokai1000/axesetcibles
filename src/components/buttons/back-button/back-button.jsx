import { useNavigate } from "react-router-dom";
import "./back-button.css";
function BackButton() {
  const navigate = useNavigate();

  const returnBack = () => {
    navigate(-1);
  };

  return (
    <div className="container-back-button">
      <i class="fa fa-arrow-left" aria-hidden="true" onClick={returnBack}></i>
    </div>
  );
}

export default BackButton;
