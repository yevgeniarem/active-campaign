import React, { useState, useEffect } from "react";
import classNames from "classnames";
import axios from "axios";

import data from "../data.json";
import { convertArrayToObject } from "../helpers.js";

export default function Contacts() {
  const [contactData, setContactData] = useState({
    contacts: [],
  });
  const [selectedContacts, setSelectedContacts] = useState([]);
  const [isAllChecked, setIsAllChecked] = useState(false);

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

  const contactTagsObj = convertArrayToObject(contactData.contactTags, "id");
  const tagsObj = convertArrayToObject(contactData.tags, "id");
  const dealsObj = convertArrayToObject(contactData.deals, "id");
  const geoAddressObj = convertArrayToObject(contactData.geoAddresses, "id");
  const geoIpsObj = convertArrayToObject(contactData.geoIps, "id");

  const handleChange = (id) => {
    if (id === "all") {
      setIsAllChecked(!isAllChecked);
      if (isAllChecked) {
        setSelectedContacts([]);
      } else {
        setSelectedContacts(contactData.contacts.map((contact) => contact.id));
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
    <>
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
          const isChecked = selectedContacts.includes(id);
          const formatStrToCurrency = new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
          });
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
                      isChecked ? "checkbox--checked" : "checkbox"
                    )}
                    onChange={() => handleChange(id)}
                  />
                  {firstName} {lastName}
                </td>
                <td className="table__column--value">
                  {formatStrToCurrency.format(totalValue)}
                </td>
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
