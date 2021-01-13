import React, { useState, useEffect } from "react";
import classNames from "classnames";
import axios from "axios";

import data from "../data-full.json";
import { convertArrayToObject } from "../helpers.js";

export default function Contacts() {
  const [contactData, setContactData] = useState({
    contacts: [],
  });
  const [selectedContacts, setSelectedContacts] = useState([]);

  // useEffect(() => {
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
  // }, []);

  useEffect(() => {
    setContactData(data);
  }, []);

  console.log("CONTACT DATA", contactData);

  const contactTagsObj = convertArrayToObject(contactData.contactTags, "id");
  const tagsObj = convertArrayToObject(contactData.tags, "id");
  const dealsObj = convertArrayToObject(contactData.deals, "id");
  const geoAddressObj = convertArrayToObject(contactData.geoAddresses, "id");
  const geoIpsObj = convertArrayToObject(contactData.geoIps, "id");

  const handleClick = (contact) => {
    setSelectedContacts(...contact);
  };

  console.log(selectedContacts);

  return (
    <>
      <table className="table">
        <thead>
          <tr className="table__header">
            <th className="table__header--contact">
              <input type="checkbox" className="checkbox" /> Contact
            </th>
            <th className="table__header--value">Total Value</th>
            <th className="table__header--location">Location</th>
            <th className="table__header--deals">Deals</th>
            <th className="table__header--tags">Tags</th>
          </tr>
        </thead>
        {contactData.contacts.map((contact) => {
          const {
            id,
            firstName,
            lastName,
            deals,
            contactTags,
            geoIps,
          } = contact;
          const totalValue =
            deals.reduce((total, curr) => {
              return total + parseInt(dealsObj[curr].value);
            }, 0) / 100;
          const getLocation = () => {
            if (geoIpsObj[geoIps]) {
              const { city, state, country2 } = geoAddressObj[
                geoIpsObj[geoIps].geoaddrid
              ];
              return `${city}, ${state}, ${country2}`;
            }
            return "N/A";
          };
          const getContactTags = () => {
            return contactTags
              .map((contactTag) => tagsObj[contactTagsObj[contactTag].tag].tag)
              .join(", ");
          };
          return (
            <tbody key={id}>
              <tr className="table__row">
                <td className="table__column--contact">
                  <input
                    type="checkbox"
                    className="checkbox"
                    onClick={() => handleClick(id)}
                  />
                  {firstName} {lastName}
                </td>
                <td className="table__column--value">{`$${totalValue.toLocaleString(
                  "en"
                )}`}</td>
                <td className="table__column--location">{getLocation()}</td>
                <td className="table__column--deals">{deals.length}</td>
                <td className="table__column--tags">{getContactTags()}</td>
              </tr>
            </tbody>
          );
        })}
      </table>
    </>
  );
}
