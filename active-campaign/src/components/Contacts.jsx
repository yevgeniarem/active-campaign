import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Contacts() {
  const [contacts, setContacts] = useState(); // fill in initial state

  useEffect(() => {
    const getContacts = async () => {
      try {
        const response = await axios.get(
          "https://cors-anywhere.herokuapp.com/sahmed93846.api-us1.com/api/3/contacts?status=-1&orders%5Bemail%5D=ASC:443",
          {
            headers: {
              "Api-Token":
                "bcd062dedabcd0f1ac8a568cdcf58660c44d7e79b91763cc1a5d0c03d52c522d851fceb0",
            },
          }
        );
        await setContacts(response);
      } catch (err) {
        console.error(err);
      }
    };
    getContacts();
  }, []);

  console.log(contacts);

  //     const contacts = await axios
  //       .get(
  //         "https://cors-anywhere.herokuapp.com/sahmed93846.api-us1.com/api/3/contacts?status=-1&orders%5Bemail%5D=ASC:443",
  //         {
  //           headers: {
  //             "Api-Token":
  //               "bcd062dedabcd0f1ac8a568cdcf58660c44d7e79b91763cc1a5d0c03d52c522d851fceb0",
  //           },
  //         }
  //       )
  //       .then(function (response) {
  //         setContacts(response.data.contacts);
  //       })
  //       .catch(function (error) {
  //         console.log(error);
  //       });
  //   };
  // });

  return (
    <>
      <h1>Contacts</h1>
      <div></div>
    </>
  );
}
