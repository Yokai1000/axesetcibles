import React from "react";
import { useLocation } from "react-router-dom";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "./style/SchoolDetailPage.css";
import { transportDetailsMap } from "./map/transport-details-map";
import { PathDetailsMap } from "./map/path-details-map";
import { EntriesDetailsMap } from "./map/entries-details-map";
import { HomeDetailsMap } from "./map/home-details-map";
import BackButton from "../../buttons/back-button/back-button";

function SchoolDetailPage() {
  const location = useLocation();
  const { results } = location.state.response;

  if (!location.state.response || results.length < 1) {
    return <h1>No data page</h1>;
  }
  const school = results[0];

  const transportDetails = (transportDetails) => {
    const texts = [];
    Object.keys(transportDetails).forEach(
      (detail) =>
        transportDetails[detail] !== null &&
        texts.push(transportDetailsMap.get(detail))
    );
    return texts.map((text, index) => <p key={index}>{text}</p>);
  };

  const pathDetails = (pathDetails) => {
    const texts = [];
    Object.keys(pathDetails).forEach(
      (detail) =>
        pathDetails[detail] !== null && texts.push(PathDetailsMap.get(detail))
    );

    return texts.map((text, index) => <p key={index}>{text}</p>);
  };

  const entriesDetails = (entriesDetails) => {
    const texts = [];
    Object.keys(entriesDetails).forEach(
      (detail) =>
        entriesDetails[detail] !== null &&
        texts.push(EntriesDetailsMap.get(detail))
    );

    return texts.map((text, index) => <p key={index}>{text}</p>);
  };

  const homeDetails = (homeDetails) => {
    const texts = [];
    Object.keys(homeDetails).forEach(
      (detail) =>
        homeDetails[detail] !== null && texts.push(HomeDetailsMap.get(detail))
    );

    return texts.map((text, index) => <p key={index}>{text}</p>);
  };

  return (
    <div className={"details-page-container"}>
      <div className={"school-titles"}>
        <h1>{school.nom}</h1>
        <h3>{school.adresse}</h3>
        {school.site_internet && (
          <a href={school.site_internet}>Site internet</a>
        )}
      </div>
      <div className={"map-container"}>
        <BackButton />
        <div className={"map-school-detail-container"}>
          <MapContainer
            center={[
              results[0].geom.coordinates[1],
              results[0].geom.coordinates[0],
            ]}
            zoom={13}
            scrollWheelZoom={false}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker
              position={[
                results[0].geom.coordinates[1],
                results[0].geom.coordinates[0],
              ]}
            >
              <Popup>
                <strong>{results[0].nom}</strong>
                <br />
                {results[0].adresse}
              </Popup>
            </Marker>
          </MapContainer>
        </div>
      </div>
      <div className="school-details">
        <div className="school-details-transports">
          <h1>
            Transports <i className="fa-solid fa-bus"></i>
          </h1>
          {transportDetails(results[0].accessibilite.transport)}
        </div>
        <div className="school-details-path">
          <h1>
            Cheminements <i className="fa-solid fa-route"></i>
          </h1>
          {pathDetails(results[0].accessibilite.cheminement_ext)}
        </div>
        <div className="school-details-entries">
          <h1>
            Entrées <i className="fa-solid fa-door-open"></i>
          </h1>
          {entriesDetails(results[0].accessibilite.entree)}
        </div>
        <div className="school-details-home">
          <h1>
            Accueil <i className="fa-solid fa-house-user"></i>
          </h1>
          {homeDetails(results[0].accessibilite.accueil)}
        </div>
      </div>
    </div>
  );
}

export default SchoolDetailPage;
