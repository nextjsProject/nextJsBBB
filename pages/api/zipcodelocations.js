/* 
Datenquelle:  https://github.com/zauberware/postal-codes-json-xml-csv
zum Testen: localhost:3000/api/locations?search=10999
*/
const allLocations = require('../../library/zipcodes.berlin.json');

export default function zipcode(req, res) {
  const { search = '' } = req.query;
  const locations = search.length > 1 ? getLocations(search) : [];
  res.status(200).json(locations);
}

function getLocations(searchTerm) {
  /* 
  Datensatz filtern, zipcode ist ein String und kein Integer, 
  da PLZ mit 0 beginnen können. startsWith ist eine String-Methode, 
  die prüft, ob ein String mit einem anderen String beginnt, 
  und entsprechend true oder false zurückgibt.
*/

  const regExp = new RegExp(searchTerm, 'i');
  return allLocations.filter(
    ({ zipcode, place }) => zipcode.startsWith(searchTerm) || regExp.test(place)
  );
}
