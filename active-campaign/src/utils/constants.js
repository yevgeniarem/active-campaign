export default {
  API: "sahmed93846.api-us1.com",
  CORS_ANYWHERE: "cors-anywhere.herokuapp.com",
  API_TOKEN:
    "bcd062dedabcd0f1ac8a568cdcf58660c44d7e79b91763cc1a5d0c03d52c522d851fceb0",
};

export const formatStrToCurrency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});