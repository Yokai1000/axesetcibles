import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./style/SchoolList.css";
import "./style/SchoolMap.css";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { HttpClient } from "../../../http-client/http-client";
import BackButton from "../../buttons/back-button/back-button";

function SchoolList() {
  const navigate = useNavigate();
  const location = useLocation();
  const { results } = location.state.response;

  if (!location.state.response || results.length < 1) {
    return navigate(-1);
  }

  const onClickSchoolListItem = async (schoolUuid) => {
    const params = {
      uuid: schoolUuid,
    };

    await new HttpClient().get(params).then((response) =>
      navigate(`/etablissements/details/${schoolUuid}`, {
        state: { response: response.data },
      })
    );
  };

  const assertedResults = results.filter(
    (result) =>
      result.nom &&
      result.adresse &&
      result.commune &&
      result.uuid &&
      result.code_postal &&
      result.url
  );

  const buildSchoolItems = assertedResults.map((result, index) => {
    return (
      <div
        key={`school-${index}`}
        className="school-list__item"
        onClick={() => onClickSchoolListItem(result.uuid)}
      >
        <div className="school-list__name">{result.nom}</div>
        <div className="school-list__address">{result.adresse}</div>
        <div className="school-list__country">{result.commune}</div>
      </div>
    );
  });

  const buildMapMarker = assertedResults.map((result, index) => (
    <Marker
      key={`${index}-${result.uuid}`}
      position={[result.geom.coordinates[1], result.geom.coordinates[0]]}
    >
      <Popup>
        <strong>{result.nom}</strong>
        <br />
        {result.adresse}
      </Popup>
    </Marker>
  ));

  return (
    <div className={"container-school-list"}>
      <BackButton />
      <div className={"child-container-school-list"}>
        <div className="school-list">{buildSchoolItems}</div>
        <div id="map" className={"map-menu"}>
          <MapContainer
            center={[
              assertedResults[0].geom.coordinates[1],
              assertedResults[0].geom.coordinates[0],
            ]}
            zoom={13}
            scrollWheelZoom={false}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {buildMapMarker}
          </MapContainer>
        </div>
      </div>
    </div>
  );
}

export default SchoolList;
