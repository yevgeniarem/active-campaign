import React, { useState } from "react";
import axios from "axios";

export default function Contacts() {
  const [contacts, setContacts] = useState(); // fill in initial state

  // fetch(
  //   "https://cors-anywhere.herokuapp.com/sahmed93846.api-us1.com/api/3/contacts?status=-1&orders%5Bemail%5D=ASC",
  //   {
  //     method: "GET",
  //     headers: {
  //       "Api-Token":
  //         "bcd062dedabcd0f1ac8a568cdcf58660c44d7e79b91763cc1a5d0c03d52c522d851fceb0",
  //     },
  //   }
  // )
  //   .then((response) => {
  //     console.log(response);
  //     setContacts(response);
  //   })
  //   .catch((err) => {
  //     console.error(err);
  //   });

  axios
    .get(
      "https://cors-anywhere.herokuapp.com/sahmed93846.api-us1.com/api/3/contacts?status=-1&orders%5Bemail%5D=ASC",
      {
        "Api-Token":
          "bcd062dedabcd0f1ac8a568cdcf58660c44d7e79b91763cc1a5d0c03d52c522d851fceb0",
      }
    )
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });

  return (
    <>
      <h1>Contacts</h1>
      <div>{contacts}</div>
    </>
  );
}
