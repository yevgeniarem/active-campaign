import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Contacts() {
  const [contacts, setContacts] = useState(); // fill in initial state

  useEffect(() => {
    async function getContacts() {
      const contacts = await axios.get("https://sahmed93846.api-us1.com");
      setContacts(contacts);
    }
    getContacts();
  }, []);

  return (
    <>
      <h1>Contacts</h1>
      <div>{contacts}</div>
    </>
  );
}
