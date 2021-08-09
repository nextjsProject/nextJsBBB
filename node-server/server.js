// Ausgabe im Terminal: node node-server/server.js
// Stopp: Mülleimer oder Strg + C

// Empfehlung: Express.js installieren

console.log("Hallo Node");

const http = require("http");
const path = require("path");

/* Datenquelle:  https://github.com/zauberware/postal-codes-json-xml-csv
path ist ein Modul, mit dem Pfade korrekt für das jeweilige Betriebssystem
erzeugt werden können, da Windows z.B. Backslash (\) statt Slash (/) für
Verzeichnisebenen nutzt.
__dirname ist eine Konstante, die den Pfad der aktuellen Datei enthält.
*/
const allLocations = require(path.join(__dirname, "zipcodes.de.json"));

const host = "localhost";
const port = 8000;

const server = http.createServer(requestListener);

// Server starten
server.listen(port, host, () => {
  console.log(`Server is running on http://${host}:${port}`);
});

// req = Request, res = Respond
function requestListener(req, res) {
  // Header müssen am Anfang gesetzt werden, hier Inhaltstyp und Statuscode
  // Für HTML "text/html"
  res.setHeader("Content-Type", "application/json");
  // CORS-Header, erlaubt Anfragen von allen Domains
  res.setHeader("Access-Control-Allow-Origin", "*");
  // "Ok"
  res.writeHead(200);

  // JS URL-Objekt erstellen und die gesuchte Postleitzahl auslesen
  const url = new URL(req.url, `http://${req.headers.host}`);

  const searchTerm = url.searchParams.get("search");

  const foundLocations = searchTerm ? getLocations(searchTerm) : [];

  res.write(JSON.stringify(foundLocations));
  res.end();

  // PLZ-Suche -> Funktion von
  function getLocations(searchTerm) {
    /*  Datensatz filtern, zipcode ist ein String und kein Integer, da
      PLZ mit 0 beginnen können. startsWith ist einen String-Methode, die
      prüft, ob ein String mit einem anderen String beginnt, und entsprechend
      true oder false zurückgibt.
      Bei der Ortssuche wird ein Regulärer Ausdruck verwendet, um nicht nur den
      Anfang des Strings zu suchen und dadurch auch Stadteile wie "Berlin Kreuzberg"
      oder Orte wie "Lutherstadt Wittenberg" zu finden. 
  */

    const regExp = new RegExp(searchTerm, "i");
    return allLocations.filter(
      ({ zipcode, place }) =>
        zipcode.startsWith(searchTerm) || regExp.test(place)
    );
  }
}
