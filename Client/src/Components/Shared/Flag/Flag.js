import React from "react";

import PlaceHolder from "../../../Content/flags/img/flag_placeholder.png";

import "../../../Content/flags/css/flags.css";
import { Constants } from "../../../Constants";
import classes from "./Flag.module.css";

const Flag = ({ countrycode = "in", showDialCode = false }) => {
  const country = Constants.Countries.find(
    (c) => c.abbr.toLowerCase() == countrycode.trim().toLowerCase()
  );

  const showCountryDialCode = () => {
    return (
      <span className={classes["country-dialcode"]}>
        {showDialCode ? country && country.code : null}
      </span>
    );
  };

  return (
    <span className={classes["flag-container"]}>
      <img src={PlaceHolder} className={"flag flag-" + `${countrycode}`}></img>
      {showDialCode ? showCountryDialCode() : null}
    </span>
  );
};

export default Flag;
