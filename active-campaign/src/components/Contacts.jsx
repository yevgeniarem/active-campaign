import React, { useState, useEffect } from "react";
// import axios from "axios";

import data from "../data-full.json";
import { convertArrayToObject } from "../helpers.js";

export default function Contacts() {
  const [contactData, setContactData] = useState({
    contacts: [],
  });

  useEffect(() => {
    //   const getContactData = async () => {
    //     try {
    //       const response = await axios.get(
    //         "https://cors-anywhere.herokuapp.com/sahmed93846.api-us1.com/api/3/contacts?status=-1&orders%5Bemail%5D=ASC&include=contactTags,deals,contactTags.tag,geoIps.geoAddress,:443",
    //         {
    //           headers: {
    //             "Api-Token":
    //               "bcd062dedabcd0f1ac8a568cdcf58660c44d7e79b91763cc1a5d0c03d52c522d851fceb0",
    //           },
    //         }
    //       );
    //       await setContactData(response.data);
    //     } catch (err) {
    //       console.error(err);
    //     }
    //   };
    //   getContactData();
    setContactData(data);
  }, []);

  console.log("CONTACT DATA", contactData);

  const contactTagsObj = convertArrayToObject(contactData.contactTags, "id");
  const tagsObj = convertArrayToObject(contactData.tags, "id");
  const dealsObj = convertArrayToObject(contactData.deals, "id");

  return (
    <>
      <h1>Contacts</h1>
      {contactData.contacts.map(
        ({ id, firstName, lastName, deals, contactTags }) => {
          // console.log(dealsObj);
          return (
            <div key={id}>
              <div>
                {firstName} {lastName}
              </div>
              <div>Contact Tags:</div>
              {contactTags.map((ct) => {
                return <div>{tagsObj[contactTagsObj[ct].tag].tag}</div>;
              })}
              <div>Deals:</div>
              <div>{deals.length}</div>
              <div>Total Value:</div>
              {deals.map((d) => {
                return <div>{dealsObj[d].value}</div>;
              })}
              <br />
            </div>
          );
        }
      )}
    </>
  );
}
