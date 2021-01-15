export const convertArrayToObject = (arr = []) =>
  arr.reduce(
    (obj, item) => ({
      ...obj,
      [item.id]: item,
    }),
    {}
  );

export const getTotalValue = (deals, dealsObj) =>
  deals.reduce((total, curr) => total + Number(dealsObj[curr].value), 0) / 100;

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

export const formatStrToCurrency = (str) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(str);

export const formatContactData = ({
  contactTags,
  tags,
  deals,
  geoAddresses,
  geoIps,
  contacts,
}) => {
  // I would put this into redux/react context
  const [contactTagsObj, tagsObj, dealsObj, geoAddressObj, geoIpsObj] = [
    contactTags,
    tags,
    deals,
    geoAddresses,
    geoIps,
  ].map((arr) => convertArrayToObject(arr));

  return {
    header: ["Contact", "Total Value", "Location", "Deals", "Tags"],
    rows: contacts.map(
      ({ id, firstName, lastName, deals, contactTags, geoIps }) => ({
        id,
        data: [
          `${firstName} ${lastName}`,
          formatStrToCurrency(getTotalValue(deals, dealsObj)),
          getLocation(geoIps, geoIpsObj, geoAddressObj),
          deals.length,
          getContactTags(contactTags, tagsObj, contactTagsObj),
        ],
      })
    ),
  };
};

export const formatStringToKebabCase = (str) =>
  str.toLowerCase().split(" ").join("-");

export const isTableLoading = (data) => !data.header && !data.row;
