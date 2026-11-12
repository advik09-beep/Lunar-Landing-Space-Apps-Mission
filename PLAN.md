# PLAN.md — Lunar Landing Site Navigator (NASA Space Apps 2026, Nov 14-15)

Two beginners, two AI tools, one repo. Every AI session starts by reading
this file and STATUS.md, then says in 3 lines: current milestone, failing
test, next single task. Update STATUS.md whenever a test passes.

## What we are building
Pick a lunar site and a date. See at once whether the Sun (power) and
Earth (direct comms) are above the local horizon, for how long, and how
that compares with another site or another date.

## Fill in before Saturday
- Submission deadline (local time): ________
- Pre-building allowed by our event? ________
- Live URL: ________

## Decisions already made (do not reopen without both humans agreeing)
- Fixed list of 10 sites. Custom coordinates are a stretch goal.
- Sun/Earth angles are DOWNLOADED from JPL Horizons (observer on the
  lunar surface) and saved as files. No astronomy math in the browser.
  Lane A must confirm the exact Horizons setup from its documentation.
- The 4 south pole sites get a real terrain horizon. Other sites use a
  flat horizon and say so on screen.
- Plain HTML/JS, static hosting, no backend unless we reach the chatbot.

## Lanes
Lane A = NUMBERS (Claude Code). Owns /scripts, /data, /lib.
Lane B = SCREEN (ChatGPT). Owns /web.
Never edit the other lane's folders. Commit small, pull before starting.

## The seam (the only thing both lanes touch)
/lib/visibility.js exports:
  getState(siteId, utcTime) ->
    { sunEl, sunAz, earthEl, earthAz,   // degrees
      lit, comms,                       // true/false, after terrain
      hoursToSunChange, hoursToEarthChange,
      terrain: "real" | "flat" }
  getSummary(siteId, startUtc, days) ->
    { pctLit, pctComms, pctBoth, longestDarkHours }
  listSites() -> [{ id, name, lat, lon, kind, landingDate, source }]
Lane A commits a FAKE version (made-up but plausible numbers) in the
first hour. Lane B builds against it and never needs to wait.
Changing these shapes requires telling the other human first.

## Milestones (hours are per person; budget is 15 each)

M0 SETUP — 1h each
  A: repo layout, fake visibility.js, sites.json (3 Apollo, 3 recent
     commercial landers, 4 south pole candidates, each with a source).
  B: empty page deployed to a public URL that calls listSites().
  PASS: live URL shows the 10 site names.

M1 REAL NUMBERS — Lane A, 4h
  Script downloads hourly Sun/Earth elevation + azimuth from Horizons
  for all 10 sites, 2026-2029, plus 30 days around each past landing.
  PASS (all four):
  - a human runs 3 site/time queries by hand in the Horizons web app
    and they match our files within 0.1 degrees
  - Apollo 11 at its landing time shows a low morning Sun in the east
  - Earth sits high at near-side equatorial sites and within a few
    degrees of the horizon at the south pole sites
  - longitude sign, azimuth direction and UTC are each written down
    in /data/README.md with the Horizons setting that proves them

M2 READOUT — Lane B, 4h (starts right after M0, on fake data)
  Site picker, date picker, Sun and Earth up/down, angles, countdown
  to next change, 30-day strip in four colors (power+comms, power
  only, comms only, neither).
  PASS: someone outside the team answers "can this lander talk to
  Earth on this date?" in under 10 seconds.

M3 COMPARE — A 2h (getSummary), B 2h (two-column view)
  Site A vs site B, or one site on date X vs date Y.
  PASS: either side updates in under 1 second; better option is
  highlighted; numbers match getSummary run by hand.

M4 TERRAIN + HORIZON VIEW — A 4h, B 4h
  A: 360-value horizon profile (terrain angle per degree of azimuth)
     for the 4 south pole sites from LOLA elevation data; lit/comms
     now use it.
  B: panorama from the site: horizon line, Sun and Earth, their paths
     for 30 days, draggable time.
  PASS: at one south pole site there is a time where flat says "lit"
  and terrain says "dark", and the panorama shows the Sun behind a
  ridge at that moment.

M7 SUBMIT — 3h each, starts 3 hours before deadline, no exceptions
  Live link works on a phone, demo recorded, project page written,
  limitations listed (Sun treated as a point, 6 sites flat, fixed
  date range).

--- everything below needs hours beyond the 15 ---

M5 CONTEXT VIEW + TIMELINE — 3D Earth-Moon view with a scrollable
  timeline of past landings; clicking one loads that site and date.
M6 CHATBOT — answers only from getState/getSummary output. Needs a
  small server function to hide the API key.
M8 CUSTOM COORDINATES — live Horizons query for any lat/lon.
