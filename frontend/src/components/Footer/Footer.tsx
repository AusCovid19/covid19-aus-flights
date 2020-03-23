import React from "react";
import { Link, Typography } from "@material-ui/core";
import useFooterStyles from "./styles";

const Footer: React.FC = () => {
  const classes = useFooterStyles();
  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <Typography variant="body2" gutterBottom>
          Data Sourced from{" "}
          <Link href="https://www.health.nsw.gov.au/Infectious/diseases/Pages/coronavirus-flights.aspx">
            NSW Department of Health
          </Link>
          ,{" "}
          <Link href="https://www.sahealth.sa.gov.au/wps/wcm/connect/public+content/sa+health+internet/health+topics/health+topics+a+-+z/covid+2019/latest+updates/known+flights+with+confirmed+cases+of+covid-19">
            SA Department of Health
          </Link>
          ,{" "}
          <Link href="https://healthywa.wa.gov.au/Articles/A_E/Coronavirus/Locations-visited-by-confirmed-cases">
            WA Department of Health
          </Link>
          ,{" "}
          <Link href="https://www.qld.gov.au/health/conditions/health-alerts/coronavirus-covid-19/current-status/current-status-and-contact-tracing-alerts">
            Queensland Department of Health
          </Link>{" "}
          as part of the{" "}
          <Link href="https://github.com/AusCovid19">
            COVID19 Australian Flights Tracker Project
          </Link>
          .
        </Typography>
        <Typography variant="body2" gutterBottom>
          Additional data sources are compiled via media releases by{" "}
          <Link href="https://www.health.act.gov.au/about-our-health-system/novel-coronavirus-covid-19/latest-news">
            ACT Department of Health
          </Link>{" "}
          and{" "}
          <Link href="https://www2.health.vic.gov.au/about/media-centre/mediareleases">
            Victorian Department of Health and Human Services.
          </Link>
        </Typography>
        <Typography variant="body2" gutterBottom>
          Copyright &copy; <Link href="https://ericjiang.dev">Eric Jiang</Link>{" "}
          2020. Made with{" "}
          <span role="img" aria-label="love">
            ❤️
          </span>{" "}
          and{" "}
          <span role="img" aria-label="coffee">
            ☕
          </span>{" "}
          in Melbourne, Victoria, Australia.
        </Typography>
      </div>
      <div>
        <Link
          color="primary"
          href="https://paypal.me/lorderikir"
          target="_blank"
          rel="noreferrer noopener"
        >
          Donate to keep the service alive
        </Link>
      </div>
    </div>
  );
};

export default Footer;
