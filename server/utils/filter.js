// utils/filter.js
const cities = require("../crawling/cities.json");
function isInIsrael(location, country, city) {
  if (country?.toUpperCase().includes("ISRAEL")) return true;
  if (cities.some(x => x.english_name === city?.toUpperCase())) return true;
  if (city?.toUpperCase() === "TLV") return true;
  return false;
}
module.exports = { isInIsrael };
