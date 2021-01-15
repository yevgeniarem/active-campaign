import React, { useState } from "react";
import classNames from "classnames";

import { formatStringToKebabCase, isTableLoading } from "../utils/helpers";

export default function Table({ data }) {
  const [isAllChecked, setIsAllChecked] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);

  const handleCheck = (id) => {
    if (selectedRows.includes(id)) {
      setSelectedRows(selectedRows.filter((row) => row !== id));
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

  return isTableLoading(data) ? (
    <div>Loading...</div>
  ) : (
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
            <th className={classNames(`table__header--${header}`)} key={header}>
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
              {row.data.map((cell, idx) => (
                <td
                  className={classNames(
                    `table__column--${formatStringToKebabCase(
                      data.header[idx]
                    )}`
                  )}
                  key={idx}
                >
                  {cell}
                </td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
