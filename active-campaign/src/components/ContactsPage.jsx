import React, { useState, useEffect } from "react";
import axios from "axios";

import Table from "./Table";
import { formatContactData } from "../utils/helpers";
import CONST from "../utils/constants";

export default function ContactsPage() {
  const [contactData, setContactData] = useState({ header: null, rows: null });

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(
          `https://${CONST.CORS_ANYWHERE}/${CONST.API_HOST}/api/3/contacts?status=-1&orders%5Bemail%5D=ASC&include=contactTags,deals,contactTags.tag,geoIps.geoAddress,:443`,
          {
            headers: {
              "Api-Token": CONST.API_TOKEN,
            },
          }
        );
        setContactData(formatContactData(data));
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);

  return <Table data={contactData} />;
}
