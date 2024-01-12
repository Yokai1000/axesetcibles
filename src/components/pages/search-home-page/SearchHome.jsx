import "./style/SearchHome.css";
import { useState } from "react";
import { HttpClient } from "../../../http-client/http-client";
import { useNavigate } from "react-router-dom";

function SearchHome() {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState(undefined);
  const [optionValue, setOptionValue] = useState("université");
  const [isRequestedApi, setIsRequestedApi] = useState(false);

  const promisedSetState = async (newState) => {
    switch (Object.keys(newState)[0]) {
      case "inputValue":
        setInputValue(newState.inputValue);
        break;
      case "optionValue":
        setOptionValue(newState.optionValue);
        break;
      default:
        break;
    }
  };

  const handleOnChange = async (stateValue) => {
    await promisedSetState(stateValue);
  };

  const handleKeyDown = async (event) => {
    if (event.key === "Enter" && inputValue !== undefined) {
      setIsRequestedApi(true);

      // handle code_postal param if is a numb else use commune instead
      const cityOrPostalParam = isNaN(inputValue)
        ? { commune: inputValue }
        : { code_postal: inputValue };

      const params = {
        q: optionValue,
        clean: false,
        ...cityOrPostalParam,
      };

      const response = await new HttpClient().get(params);
      if (response.data) {
        navigate("/etablissements", { state: { response: response.data } });
      }
    }
  };

  return (
    <div className={"container"}>
      <div id="header">
        <h1 id="title">Axes&Cibles</h1>
      </div>
      <div id="description">
        <p>L'outil qui vous informe sur l'accessibilité des établissements.</p>
        <p>
          Découvrez l'établissement scolaire idéal en explorant notre catalogue
          d'écoles accessibles.
        </p>
      </div>

      <div id="search-container">
        <div className="search-bar">
          <select
            placeholder="Sélectionner"
            id="search-select"
            onChange={(event) =>
              handleOnChange({ optionValue: event.currentTarget.value })
            }
          >
            <option value="université">Université</option>
            <option value="lycée">Lycée</option>
            <option value="collège">Collège</option>
            <option value="maternel">Maternel</option>
          </select>
          <input
            type="text"
            id="search-input"
            placeholder="Entrez une commune ou un code postal"
            onChange={(event) =>
              handleOnChange({ inputValue: event.target.value })
            }
            onKeyDown={(event) => handleKeyDown(event)}
          />
          {!isRequestedApi ? (
            <button id="search-button">
              <i className="fas fa-search"></i>
            </button>
          ) : (
            <div id="load-icon">
              <i className="fa-solid fa-circle-notch fa-spin"></i>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SearchHome;
