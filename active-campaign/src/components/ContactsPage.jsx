import React, { useState, useEffect } from "react";

import data from "../data.json";
import Table from "./Table";
import { formatContactData } from "../utils/helpers";

export default function ContactsPage() {
  const [contactData, setContactData] = useState({ header: [], rows: [] });

  // useEffect(() => {
  //   const getContactData = async () => {
  //     try {
  //       const response = await axios.get(
  //         `https://${CONST.CORS_ANYWHERE}/${CONST.API_HOST}/api/3/contacts?status=-1&orders%5Bemail%5D=ASC&include=contactTags,deals,contactTags.tag,geoIps.geoAddress,:443`,
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
    setContactData(formatContactData(data));
  }, []);

  // return (
  //   <table className="table">
  //     <thead>
  //       <tr className="table__header">
  //         <th className="table__header--contact">
  //           <input
  //             type="checkbox"
  //             className={classNames(
  //               "checkbox",
  //               isAllChecked && "checkbox--checked"
  //             )}
  //             onChange={() => handleChange("all")}
  //             checked={isAllChecked}
  //           />{" "}
  //           Contact
  //         </th>
  //         <th className="table__header--total-value">Total Value</th>
  //         <th className="table__header--location">Location</th>
  //         <th className="table__header--deals">Deals</th>
  //         <th className="table__header--tags">Tags</th>
  //       </tr>
  //     </thead>
  //     {contacts.map(
  //       ({ id, firstName, lastName, deals, contactTags, geoIps }) => {
  //         const isChecked = selectedContacts.includes(id);
  //         return (
  //           <tbody key={id}>
  //             <tr
  //               className={classNames(
  //                 "table__row",
  //                 isChecked && "table__row--isChecked"
  //               )}
  //             >
  //               <td className="table__column--contact">
  //                 <input
  //                   type="checkbox"
  //                   checked={isChecked}
  //                   className={classNames(
  //                     "checkbox",
  //                     isChecked && "checkbox--checked"
  //                   )}
  //                   onChange={() => handleChange(id)}
  //                 />
  //                 {firstName} {lastName}
  //               </td>
  //               <td className="table__column--value">
  //                 {formatStrToCurrency.format(getTotalValue(deals, dealsObj))}
  //               </td>
  //               <td className="table__column--location">
  //                 {getLocation(geoIps, geoIpsObj, geoAddressObj)}
  //               </td>
  //               <td className="table__column--deals">{deals.length}</td>
  //               <td className="table__column--tags">
  //                 {getContactTags(contactTags, tagsObj, contactTagsObj)}
  //               </td>
  //             </tr>
  //           </tbody>
  //         );
  //       }
  //     )}
  //   </table>
  // );

  return <Table data={contactData} />;
}
