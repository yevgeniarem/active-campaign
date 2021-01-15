import React, { useState } from "react";
import classNames from "classnames";

import { formatStringToKebabCase } from "../utils/helpers";

export default function Table({ data }) {
  const [isAllChecked, setIsAllChecked] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);

  const handleCheck = (id) => {
    if (selectedRows.includes(id)) {
      const newSelectedRows = [...selectedRows];
      newSelectedRows.splice(selectedRows.indexOf(id), 1);
      setSelectedRows(newSelectedRows);
    } else {
      setSelectedRows([...selectedRows, id]);
    }
  };

  const handleAllCheck = () => {
    setIsAllChecked(!isAllChecked);
    if (isAllChecked) {
      setSelectedRows([]);
    } else {
      setSelectedRows(data.rows.map((row) => row.id));
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
              onChange={handleAllCheck}
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
        {data.rows.map((row) => {
          const isChecked = selectedRows.includes(row.id);
          return (
            <tr className="table__row" key={row.id}>
              <td className="table__column--checkbox">
                <input
                  type="checkbox"
                  className={classNames(
                    "checkbox",
                    isChecked && "checkbox--checked"
                  )}
                  onChange={() => handleCheck(row.id)}
                  checked={isChecked}
                />
              </td>
              {row.data.map((d, idx) => {
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
