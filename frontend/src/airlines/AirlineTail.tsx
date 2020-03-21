import React from "react";

import QF from "./QF.png";
import SQ from "./SQ.png";
import GA from "./GA.png";
import JQ from "./JQ.png";
import CEBU from "./5J.png";
import EK from "./EK.png";
import EY from "./EY.png";
import TR from "./TR.png";
import QR from "./QR.png";
import UA from "./UA.png";
import NZ from "./NZ.png";
import KE from "./KE.png";
import CX from "./CX.png";
import MH from "./MH.png";
import TG from "./TG.png";
import PR from "./PR.png";
import VA from "./VA.png";
import BA from "./BA.png";
import AA from "./AA.png";
import OD from "./OD.png";
import DL from "./DL.png";

const height = 25;

const AirlineTail: React.FC<{ airline: string }> = ({ airline }) => {
  switch (airline.split(" ")[0]) {
    case "QANTAS":
    case "Qantas":
      return <img src={QF} height={height} alt={airline} />;
    case "Jetstar":
      return <img src={JQ} height={height} alt={airline} />;
    case "Singapore":
      return <img src={SQ} height={height} alt={airline} />;
    case "Garuda":
      return <img src={GA} height={height} alt={airline} />;
    case "Cebu":
      return <img src={CEBU} height={height} alt={airline} />;
    case "Emirates":
      return <img src={EK} height={height} alt={airline} />;
    case "Etihad":
      return <img src={EY} height={height} alt={airline} />;
    case "Scoot":
      return <img src={TR} height={height} alt={airline} />;
    case "Qatar":
      return <img src={QR} height={height} alt={airline} />;
    case "United":
      return <img src={UA} height={height} alt={airline} />;
    case "Korean":
      return <img src={KE} height={height} alt={airline} />;
    case "Cathay":
      return <img src={CX} height={height} alt={airline} />;
    case "Malaysia":
    case "Malaysian":
      return <img src={MH} height={height} alt={airline} />;
    case "Philippine":
    case "Phillippine":
    case "Phillippines":
      return <img src={PR} height={height} alt={airline} />;
    case "Thai":
      return <img src={TG} height={height} alt={airline} />;
    case "Virgin":
      return <img src={VA} height={height} alt={airline} />;
    case "British":
      return <img src={BA} height={height} alt={airline} />;
    case "American":
      return <img src={AA} height={height} alt={airline} />;
    case "Delta":
      return <img src={DL} height={height} alt={airline} />;
    case "Malindo":
    case "Molinda":
      return <img src={OD} height={height} alt={airline} />;
  }
  switch (airline) {
    case "Air New Zealand":
      return <img src={NZ} height={height} alt={airline} />;
    default:
      return null;
  }
};

export default AirlineTail;
