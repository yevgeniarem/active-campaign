import React, { useState } from "react";
import classNames from "classnames";

import { formatStringToKebabCase } from "../utils/helpers";

export default function Table({ data }) {
  const [isAllChecked, setIsAllChecked] = useState(false);
  const [selectedContacts, setSelectedContacts] = useState([]);

  const handleChange = (id) => {
    if (id === "all") {
      setIsAllChecked(!isAllChecked);
      if (isAllChecked) {
        setSelectedContacts([]);
      } else {
        setSelectedContacts(data.rows.map((contact) => contact.id));
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
          <th className="table__header--checkbox">
            <input
              type="checkbox"
              className={classNames(
                "checkbox",
                isAllChecked && "checkbox--checked"
              )}
              onChange={() => handleChange("all")}
              checked={isAllChecked}
            />
          </th>
          {data.header.map((header) => (
            <th className={`table__header--${header}`} key={header}>
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.rows.map((contact) => {
          const isChecked = selectedContacts.includes(contact.id);
          return (
            <tr className="table__row" key={contact.id}>
              <td className="table__column--checkbox">
                <input
                  type="checkbox"
                  className={classNames(
                    "checkbox",
                    isChecked && "checkbox--checked"
                  )}
                  onChange={() => handleChange(contact.id)}
                  checked={isChecked}
                />
              </td>
              {contact.data.map((d, idx) => {
                return (
                  <td
                    className={`table__column--${formatStringToKebabCase(
                      data.header[idx]
                    )}`}
                    key={idx}
                  >
                    {d}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
