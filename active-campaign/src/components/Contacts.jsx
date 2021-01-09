import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Contacts() {
  const [contactsData, setContactsData] = useState({
    contacts: [],
    contactTags: [],
  });

  useEffect(() => {
    const getContactsData = async () => {
      try {
        const response = await axios.get(
          "https://cors-anywhere.herokuapp.com/sahmed93846.api-us1.com/api/3/contacts?limit=1&status=-1&orders%5Bemail%5D=ASC&include=contactTags,deals,contactTags.tag,geoIps.geoAddress,:443",
          {
            headers: {
              "Api-Token":
                "bcd062dedabcd0f1ac8a568cdcf58660c44d7e79b91763cc1a5d0c03d52c522d851fceb0",
            },
          }
        );
        await setContactsData(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    getContactsData();
  }, []);

  console.log("CONTACTS DATA", contactsData);

  return (
    <>
      <h1>Contacts</h1>
      {contactsData.contacts.map(
        ({ id, firstName, lastName, deals, contactTags }) => {
          return (
            <div key={id}>
              <div>
                {firstName} {lastName}
              </div>
              {contactTags.map((contactTag) => {
                const tag = contactsData.contactTags.find((ct) => {
                  return ct.id === contactTag;
                });
                console.log(tag);
              })}
              <br />
            </div>
          );
        }
      )}
      {/* {contacts.map(({ id, firstName, lastName, links }) => {
        const { contactTags, contactDeals, deals } = links;

        return (
          <div key={id}>
            <div>
              {firstName} {lastName}
            </div>
            <div>{contactTags}</div>
          </div>
        );
      })} */}
    </>
  );
}
