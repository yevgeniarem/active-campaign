import React, { useState, useEffect } from "react";

import data from "../data.json";
import Table from "./Table";
import { formatContactData } from "../utils/helpers";

export default function ContactsPage() {
  const [contactData, setContactData] = useState({ header: [], rows: [] });

  // useEffect(() => {
  //   const getContactData = async () => {
  //     try {
  //       const response = await axios.get(
  //         `https://${CONST.CORS_ANYWHERE}/${CONST.API_HOST}/api/3/contacts?status=-1&orders%5Bemail%5D=ASC&include=contactTags,deals,contactTags.tag,geoIps.geoAddress,:443`,
  //         {
  //           headers: {
  //             "Api-Token": CONST.API_TOKEN,
  //           },
  //         }
  //       );
  //       await setContactData(response.data);
  //     } catch (err) {
  //       console.error(err);
  //     }
  //   };
  //   getContactData();
  // }, []);

  useEffect(() => {
    setContactData(formatContactData(data));
  }, []);

  return <Table data={contactData} />;
}
