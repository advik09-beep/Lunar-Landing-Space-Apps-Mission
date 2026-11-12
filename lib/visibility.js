// FAKE visibility.js (M0). Plausible, made-up numbers so Lane B can build.
// Real version will read /data files from JPL Horizons. Shapes are the contract in PLAN.md.
import sites from "../data/sites.js";

// All calls are synchronous. Times: ISO 8601 UTC string with Z, or ms since epoch.
export const MOCK = true; // real version sets false

const PERIOD_H = 708.7; // ~29.53-day lunar day, fake sun cycle
const hours = (t) => new Date(t).getTime() / 3.6e6;
const clamp = (x, a, b) => Math.min(b, Math.max(a, x));

export function listSites() {
  return sites.map(({ id, name, lat, lon, kind, landingDate, source }) =>
    ({ id, name, lat, lon, kind, landingDate, source }));
}

export function getState(siteId, utcTime) {
  const s = sites.find((x) => x.id === siteId);
  if (!s) throw new Error("unknown site " + siteId);
  const h = hours(utcTime);
  const sunPhase = ((h / PERIOD_H) * 2 * Math.PI) + s.lon * Math.PI / 180;
  const sunEl = 40 * Math.sin(sunPhase) * Math.cos(s.lat * Math.PI / 180);
  const sunAz = (((h / PERIOD_H) * 360 + 90) % 360 + 360) % 360;
  const earthEl = Math.abs(s.lat) > 80 ? 2 + 3 * Math.sin(h / 50) : clamp(80 - Math.abs(s.lat), 0, 85);
  const earthAz = (s.lon > 0 ? 270 : 90) + 5 * Math.sin(h / 300);
  return {
    sunEl, sunAz, earthEl, earthAz,
    lit: sunEl > 0, comms: earthEl > 0,
    hoursToSunChange: ((PERIOD_H / 2) - ((h + s.lon * 1.97) % (PERIOD_H / 2))),
    hoursToEarthChange: 12 + 6 * Math.abs(Math.sin(h / 40)),
    terrain: s.kind === "south-pole" ? "real" : "flat",
  };
}

export function getSummary(siteId, startUtc, days) {
  let lit = 0, comms = 0, both = 0, dark = 0, longest = 0, n = 0;
  const t0 = new Date(startUtc).getTime();
  for (let i = 0; i < days * 24; i++) {
    const st = getState(siteId, t0 + i * 3.6e6);
    n++; if (st.lit) lit++; if (st.comms) comms++; if (st.lit && st.comms) both++;
    dark = st.lit ? 0 : dark + 1; longest = Math.max(longest, dark);
  }
  return { pctLit: 100 * lit / n, pctComms: 100 * comms / n, pctBoth: 100 * both / n, longestDarkHours: longest };
}
