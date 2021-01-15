import { formatStrToCurrency } from "../utils/constants";

export const convertArrayToObject = (arr = []) => {
  return arr.reduce((obj, item) => {
    return {
      ...obj,
      [item.id]: item,
    };
  }, {});
};

export const getTotalValue = (deals, dealsObj) =>
  deals.reduce((total, curr) => {
    return total + parseInt(dealsObj[curr].value);
  }, 0) / 100;

export const getLocation = (geoIps, geoIpsObj, geoAddressObj) => {
  if (geoIpsObj[geoIps]) {
    const { city, state, country2 } = geoAddressObj[
      geoIpsObj[geoIps].geoaddrid
    ];
    return `${city}, ${state}, ${country2}`;
  }
  return "N/A";
};

export const getContactTags = (contactTags, tagsObj, contactTagsObj) =>
  contactTags
    .map((contactTag) => tagsObj[contactTagsObj[contactTag].tag].tag)
    .join(", ");

const obj = {
  header: ["Contact", "Total Value"],
  rows: [
    { id: 1, data: ["peter kim", 2] },
    { id: 1, data: ["peter kim", 2] },
    { id: 1, data: ["peter kim", 2] },
  ],
};

// and set up prop types

export const formatContactData = ({
  contactTags,
  tags,
  deals,
  geoAddresses,
  geoIps,
  contacts,
}) => {
  // I would put this into redux/react context
  const contactTagsObj = convertArrayToObject(contactTags);
  const tagsObj = convertArrayToObject(tags);
  const dealsObj = convertArrayToObject(deals);
  const geoAddressObj = convertArrayToObject(geoAddresses);
  const geoIpsObj = convertArrayToObject(geoIps);

  return {
    header: ["Contact", "Total Value", "Location", "Deals", "Tags"],
    rows: contacts.map(
      ({ id, firstName, lastName, deals, contactTags, geoIps }) => {
        return {
          id,
          data: [
            `${firstName} ${lastName}`,
            formatStrToCurrency.format(getTotalValue(deals, dealsObj)),
            getLocation(geoIps, geoIpsObj, geoAddressObj),
            deals.length,
            getContactTags(contactTags, tagsObj, contactTagsObj),
          ],
        };
      }
    ),
  };
};

export const formatStringToKebabCase = (str) =>
  str.toLowerCase().split(" ").join("-");
