import React, { useState, useEffect } from "react";
import classNames from "classnames";
import axios from "axios";

import data from "../data.json";
import {
  convertArrayToObject,
  getTotalValue,
  getLocation,
  getContactTags,
} from "../utils/helpers.js";
import CONST, { formatStrToCurrency } from "../utils/constants.js";

export default function Contacts() {
  const [contactData, setContactData] = useState({
    contacts: [],
  });
  const [selectedContacts, setSelectedContacts] = useState([]);
  const [isAllChecked, setIsAllChecked] = useState(false);
  const {
    contactTags,
    tags,
    deals,
    geoAddresses,
    geoIps,
    contacts,
  } = contactData;

  // useEffect(() => {
  //   const getContactData = async () => {
  //     try {
  //       const response = await axios.get(
  //         `https://${CONST.CORS_ANYWHERE}/${CONST.API}/api/3/contacts?status=-1&orders%5Bemail%5D=ASC&include=contactTags,deals,contactTags.tag,geoIps.geoAddress,:443`,
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
    setContactData(data);
  }, []);

  // I would put this into redux/react context
  const contactTagsObj = convertArrayToObject(contactTags);
  const tagsObj = convertArrayToObject(tags);
  const dealsObj = convertArrayToObject(deals);
  const geoAddressObj = convertArrayToObject(geoAddresses);
  const geoIpsObj = convertArrayToObject(geoIps);

  const handleChange = (id) => {
    if (id === "all") {
      setIsAllChecked(!isAllChecked);
      if (isAllChecked) {
        setSelectedContacts([]);
      } else {
        setSelectedContacts(contacts.map((contact) => contact.id));
      }
    } else if (selectedContacts.includes(id)) {
      const newSelectedContacts = [...selectedContacts];
      newSelectedContacts.splice(selectedContacts.indexOf(id), 1);
      setSelectedContacts(newSelectedContacts);
    } else {
      setSelectedContacts([...selectedContacts, id]);
    }
  };

  return (
    <table className="table">
      <thead>
        <tr className="table__header">
          <th className="table__header--contact">
            <input
              type="checkbox"
              className={classNames(
                isAllChecked ? "checkbox--checked" : "checkbox"
              )}
              onChange={() => handleChange("all")}
              checked={isAllChecked}
            />{" "}
            Contact
          </th>
          <th className="table__header--value">Total Value</th>
          <th className="table__header--location">Location</th>
          <th className="table__header--deals">Deals</th>
          <th className="table__header--tags">Tags</th>
        </tr>
      </thead>
      {contacts.map(
        ({ id, firstName, lastName, deals, contactTags, geoIps }) => {
          const isChecked = selectedContacts.includes(id);
          return (
            <tbody key={id}>
              <tr
                className={classNames(
                  "table__row",
                  isChecked && "table__row--isChecked"
                )}
              >
                <td className="table__column--contact">
                  <input
                    type="checkbox"
                    checked={isChecked}
                    className={classNames(
                      "checkbox",
                      isChecked && "checkbox--checked"
                    )}
                    onChange={() => handleChange(id)}
                  />
                  {firstName} {lastName}
                </td>
                <td className="table__column--value">
                  {formatStrToCurrency.format(getTotalValue(deals, dealsObj))}
                </td>
                <td className="table__column--location">
                  {getLocation(geoIps, geoIpsObj, geoAddressObj)}
                </td>
                <td className="table__column--deals">{deals.length}</td>
                <td className="table__column--tags">
                  {getContactTags(contactTags, tagsObj, contactTagsObj)}
                </td>
              </tr>
            </tbody>
          );
        }
      )}
    </table>
  );
}
