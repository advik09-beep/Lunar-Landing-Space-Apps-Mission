// Site catalog. Edit here. Plain JS module so browsers can import it without JSON import support.
export default [
 {"id":"apollo11","name":"Apollo 11 (Tranquility Base)","lat":0.67408,"lon":23.47297,"kind":"apollo","landingDate":"1969-07-20T20:17:40Z","source":"https://nssdc.gsfc.nasa.gov/planetary/lunar/lunar_sites.html","coordsVerified":true,"note":"LM coords from archived NSSDCA table; landing time not yet checked against a source"},
 {"id":"apollo12","name":"Apollo 12 (Ocean of Storms)","lat":-3.01239,"lon":-23.42157,"kind":"apollo","landingDate":"1969-11-19T06:54:35Z","source":"https://nssdc.gsfc.nasa.gov/planetary/lunar/lunar_sites.html","coordsVerified":true,"note":"other sources differ by ~0.2 deg; landing time unchecked"},
 {"id":"apollo17","name":"Apollo 17 (Taurus-Littrow)","lat":20.19080,"lon":30.77168,"kind":"apollo","landingDate":"1972-12-11T19:54:57Z","source":"https://nssdc.gsfc.nasa.gov/planetary/lunar/lunar_sites.html","coordsVerified":true,"note":"landing time unchecked"},
 {"id":"chandrayaan3","name":"Chandrayaan-3 (Shiv Shakti)","lat":-69.367621,"lon":32.348126,"kind":"commercial-or-agency","landingDate":"2023-08-23T12:33:00Z","source":"https://www.isro.gov.in/NSPD2024/assets/pdf/CH3 Landing Brochure-Pagewise.pdf","coordsVerified":true,"note":"government lander, not commercial; swap if team wants strictly commercial. Wikipedia gives -69.373,32.319"},
 {"id":"im1","name":"IM-1 Odysseus (Malapert A)","lat":-80.13,"lon":1.44,"kind":"commercial","landingDate":"2024-02-23T00:23:00Z","source":"TODO","coordsVerified":false,"note":"approximate, from memory; find a source"},
 {"id":"slim","name":"SLIM (Shioli crater)","lat":-13.3,"lon":25.25,"kind":"agency","landingDate":"2024-01-19T15:20:00Z","source":"TODO","coordsVerified":false,"note":"approximate, from memory; find a source"},
 {"id":"sp_shackleton","name":"Shackleton rim (south pole)","lat":-89.9,"lon":0,"kind":"south-pole","landingDate":null,"source":"TODO","coordsVerified":false,"note":"placeholder; use a LOLA/Artemis III region source"},
 {"id":"sp_connecting","name":"Connecting Ridge (south pole)","lat":-89.5,"lon":-137,"kind":"south-pole","landingDate":null,"source":"https://svs.gsfc.nasa.gov/5013","coordsVerified":false,"note":"placeholder lat/lon; region named by NASA, center must be read from the source"},
 {"id":"sp_haworth","name":"Haworth (south pole)","lat":-87.5,"lon":-5,"kind":"south-pole","landingDate":null,"source":"https://svs.gsfc.nasa.gov/5013","coordsVerified":false,"note":"placeholder lat/lon"},
 {"id":"sp_malapert","name":"Malapert Massif (south pole)","lat":-86,"lon":0,"kind":"south-pole","landingDate":null,"source":"https://svs.gsfc.nasa.gov/5013","coordsVerified":false,"note":"placeholder lat/lon"}
]
;
