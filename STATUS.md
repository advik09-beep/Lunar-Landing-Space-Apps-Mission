# STATUS — Lunar Landing Site Navigator

Current milestone: M0 SETUP. No milestone has passed yet.
Lane A (Claude Code): MOCK /lib/visibility.js and /data/sites.js committed (10 sites; 4 sourced, 6 still unverified).
Lane B (ChatGPT/Codex): web/index.html is committed and imports only listSites() from ../lib/visibility.js.
Failing test: No confirmed public live URL yet. listSites() now exists.
Next single task for Lane A: source the 6 unverified sites (pole: NASA Oct 2024 nine-region list, one representative point each).
Next Lane B blocker: configure/verify static hosting and run M0 acceptance test once the shared module is available.

## Lane A notes for Lane B (2026-11-12)
- All three exports are SYNCHRONOUS. Extra export: MOCK (true now; false once real Horizons data is in).
- Times in: ISO 8601 UTC with Z (or ms since epoch). Angles out: degrees. Mock azimuth/sign conventions are NOT yet confirmed; real ones go in /data/README.md at M1.
- sites carry extra fields coordsVerified and note; show "unverified" when coordsVerified is false.
- Site catalog is /data/sites.js (JS module, not JSON, so the browser can import it).
- Lane A rules live in CLAUDE.md. Lane B ignore it.
- M1 tests will use only verified sites; unverified sites do not block M1.
- Plan change (2026-11-12): SLIM replaced by IM-2 Athena (Mons Mouton). Site id is now `im2` (`slim` removed). lat/lon/landingDate are null until sourced; show them as unverified/unknown.

## Technical review — notes for Claude Code (Lane A)

These are engineering concerns for discussion, not unilateral changes to decisions already frozen in PLAN.md. Do not edit Lane B's /web. Flag any proposed contract or scope change to both humans before changing it.

### P0 — Data-interface contract and provenance
- Preserve the three agreed exports and field names in PLAN.md: listSites(), getState(), getSummary(). Explicitly tell Lane B whether calls are synchronous or Promise-based. Lane B currently accepts either for listSites().
- Agree on valid UTC input type (recommend ISO 8601 with Z), angle units (degrees), azimuth reference and sign, site ID stability, valid date coverage, out-of-range/error behavior, and what null means for a missing next visibility change.
- Keep simulated/placeholder values identifiable as MOCK. Never silently mix mock and validated scientific outputs. Do not provide invented timestamps or intervals as real conditions.
- The M2 timeline and M4 horizon panorama require efficient time-series and terrain-profile access. Consider getTimeline(siteId,startUtc,days) and getHorizon(siteId) as *proposals*; coordinate with Lane B and both humans before modifying the frozen seam.
- Keep source, coverage, sampling interval and flat-vs-terrain provenance available for display; do not let the UI mistake flat-horizon estimates for verified terrain-aware results.

### P0 — Astronomical validation
- Document the exact Horizons setup reproducibly in /data/README.md: Moon topocentric observer (body 301), Sun/Earth target identifiers, site height datum, longitude east-positive, latitude convention, azimuth direction (typically clockwise from north), output quantity, UTC/time scale, and apparent-vs-geometric treatment.
- Confirm the correct observer-site syntax and whether any light-time, refraction or correction setting materially affects the chosen outputs. The Moon has no atmospheric refraction.
- Before declaring M1 done, compare at least three independent hand-queried Horizons site/time values to the exports. Test east/west sign and azimuth orientation, not just plausible Sun angles.
- A time series sampled hourly needs an explicit policy for interpolation and visibility-transition times; do not imply minute-level precision from hourly-only samples.

### P1 — Terrain visibility is the main scientific risk
- A horizon generated from LOLA topography must account for observation point elevation, terrain distance, Moon curvature and local slope, projection, and the highest obstruction along each azimuth.
- A 360-bin (1 degree/bin) horizon can miss narrow obstacles. Disclose resolution and consider validation at one south-pole site before scaling to four if time is tight; do not silently change the four-site commitment.
- Clarify treatment of the finite angular disks of the Sun and Earth. The current plan assumes point objects, so label computed results as approximations.
- 'lit' should mean Sun potentially visible, NOT actual solar electrical output. 'comms' should mean potential direct-to-Earth line of sight, NOT a guaranteed working link.
- Verify a terrain-blocked case against the computed profile: geometrically above flat horizon yet below terrain horizon, with consistent azimuth and time.

### P1 — Manage scope and site ranking
- The planned 2026–2029 hourly downloads for ten sites plus historical windows are substantial. Validate a smaller representative time range first; expand coverage only once retrieval, units and tests work. Discuss any lasting scope change with both humans.
- There is no universal 'better' landing site: sunlight and communications trade off. Do not invent a universal suitability score without explicitly chosen mission constraints or weights.
- Supply curated site coordinates and sources, including clear distinction between past landing coordinates and planned candidate locations.

## M0 acceptance checklist
- [x] Lane B added /web/index.html, which dynamically imports listSites() and displays the returned names.
- [ ] Lane A committed a working /lib/visibility.js and ten sourced sites. (visibility.js done; 4/10 sourced)
- [ ] Public static URL verified to show ten actual site names.
- [ ] Both humans confirm M0 pass; then update this STATUS.md.

## Change ownership
Lane A owns /scripts, /data, /lib. Lane B owns /web. STATUS.md is shared for coordination by explicit instruction. Leave PLAN.md unchanged unless both humans agree.
