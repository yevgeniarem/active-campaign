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
