# STATUS — Lunar Landing Site Navigator

Current milestone: M0 SETUP. No milestone has passed yet.
Lane A (Claude Code): MOCK /lib/visibility.js and /data/sites.js committed (10 sites, all sourced).
Lane B (ChatGPT/Codex): web/index.html is committed and imports only listSites() from ../lib/visibility.js.
Failing test: No confirmed public live URL yet. listSites() now exists.
Next single task for Lane A: M1 step 1 — confirm the Horizons lunar-surface observer setup from its docs, then fetch one verified site (Apollo 11) as a test.
Next Lane B blocker: configure/verify static hosting and run M0 acceptance test once the shared module is available.

## Continuous two-agent coordination protocol (agreed 2026-11-12)

This is an explicit instruction from Advik for Lane B, and a coordination request to Lane A.

- **Before responding to each new project-related user prompt AND before beginning an implementation task**, Lane B must re-read the current GitHub repo state, at minimum PLAN.md and STATUS.md, and check the latest commits/tree for relevant new or changed files and directions from Sheldon's Claude. Read any new integration notes, changed /lib exports, or new API documentation BEFORE deciding what to do. Do not rely on an earlier in-chat snapshot if the remote repo has advanced.
- **Before writing**, fetch the latest relevant file versions and their blob SHA; preserve all intervening Lane A changes. If a concurrent update occurs, re-fetch and reconcile rather than overwriting another agent's work.
- **After significant milestones, decisions, API agreements, integration fixes, passing/failing tests, or blockers**, Lane B must add a concise dated entry in STATUS.md, then commit it to GitHub. Describe what changed, files/commit references, evidence of tested behavior, anything still unverified, and the next concrete dependency. Do not mark tests passed without execution or deployment evidence.
- Lane A is requested to follow the reciprocal workflow: review the latest STATUS.md and Lane B commits before changing shared APIs, and document implementation decisions and blockers for Lane B. Use this file as the persistent cross-agent handoff.
- Keep detailed changes/final integration contracts in appropriate sections rather than rewriting the status header inaccurately; update the opening status lines when milestones truly change. Label **proposals** versus **approved contracts** clearly.
- Ownership is unchanged: Lane A owns /scripts, /data and /lib; Lane B owns /web; STATUS.md is shared. No unapproved cross-lane source edits. If Claude and Codex disagree on interfaces or validation, record the disagreement and escalate to both humans.
- A new chat or coding session is not a reason to skip the remote check. These checks run on demand for each prompt/task; neither agent is claiming autonomous background monitoring.

## Lane A notes for Lane B (2026-11-12)
- All three exports are SYNCHRONOUS. Extra export: MOCK (true now; false once real Horizons data is in).
- Times in: ISO 8601 UTC with Z (or ms since epoch). Angles out: degrees. Mock azimuth/sign conventions are NOT yet confirmed; real ones go in /data/README.md at M1.
- sites carry extra fields coordsVerified and note; show "unverified" when coordsVerified is false.
- Site catalog is /data/sites.js (JS module, not JSON, so the browser can import it).
- Lane A rules live in CLAUDE.md. Lane B ignore it.
- M1 tests will use only verified sites; unverified sites do not block M1.
- Plan change (2026-11-12): SLIM replaced by IM-2 Athena (Mons Mouton). Site id is now `im2` (`slim` removed). Now sourced (LROC): -84.7906, 29.1957E, ~2025-03-06T17:30Z.

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
- [x] Lane A committed a working /lib/visibility.js and ten sourced sites. (done: 10/10 sourced)
- [ ] Public static URL verified to show ten actual site names.
- [ ] Both humans confirm M0 pass; then update this STATUS.md.

## Change ownership
Lane A owns /scripts, /data, /lib. Lane B owns /web. STATUS.md is shared for coordination by explicit instruction. Leave PLAN.md unchanged unless both humans agree.

## Lane A source log (2026-11-12)
- IM-1, IM-2 coords from LROC located-lander pages; IM-2 time minute-precision only (NASA).
- Apollo 11/12/17 landing times confirmed on NSSDCA spacecraft pages.
- Chandrayaan-3 landing time is secondary (collectSPACE) and approximate; Chandrayaan-3 kind changed to 'agency'.
- No source here states a reference frame except JAXA (ME); frames to be fixed in /data/README.md at M1.
- South pole sites now from NASA's 2024-10-28 nine-region list: Peak near Cabeus B, Haworth, Malapert Massif, Nobile Rim 2. Each is a 'representative point' = center of the LROC preliminary NAC mosaic for that region, not an official region center. IDs CHANGED: sp_shackleton and sp_connecting removed; added sp_cabeus_b_peak, sp_nobile_rim2; sp_haworth and sp_malapert kept with new coords. Better points would come from USGS region shapefiles (doi:10.5066/P1MEQ6UK), not yet opened. Slater Plain had no citable point.

---

# FINAL INTEGRATION BLUEPRINT — Sun/Earth/Moon visual + lunar mission planner (2026-11-12)

**Audience:** Sheldon/Claude Code (Lane A) and Advik/Codex/ChatGPT (Lane B). Read this after the status header above. This is a joint engineering handoff, NOT a claim that these features already exist.

**Authority/approval:** Advik has explicitly selected the four UX/stack choices below. Because PLAN.md says frozen technical decisions and shared-contract changes require both humans, Sheldon must review the effect on the /lib contract and confirm feasibility before either lane changes the agreed exports. Do not rewrite PLAN.md or silently change the seam. This section is a proposed integration design with implementation gates, and the original M0-M4/M7 criteria remain applicable unless both humans revise them.

## 1. Locked product experience (Advik's decisions)
1. **Opening = interactive Sun–Earth–Moon overview.** Space scene with visible, clickable Sun, Earth and Moon; drag/orbit, zoom, select, focus, pause/play, date input, and explanatory UI. Do NOT build a nine-planet simulator, physics sandbox or arbitrary spacecraft model.
2. **Moon click = zoom WITHIN the same 3D experience.** Cinematic camera approaches the Moon; no hard jump to an unrelated page. At close range, display surface-anchored landing markers. A separate detailed lunar geometry/LOD mesh MAY replace the coarse globe invisibly during zoom as long as the apparent interaction is continuous and coordinate-correct.
3. **Accuracy = date synchronized.** A single chosen UTC timestamp drives both the visual orbital arrangement and the site visibility dashboard. Treat orbital state and lunar orientation as scientific inputs, not independently guessed animations.
4. **Frontend = Vite + TypeScript + Three.js, static deployment.** Only Lane B implements the build/visual layer; Lane A still provides pure JS data modules. Vite is a build tool, not a requirement for an application backend.
5. **Always-present fast route to mission tools.** A landing-site dropdown / "Analyze site" shortcut must work without a camera journey. The 3D experience enriches the mission-planning workflow and must not make comparisons slower.
6. **Scope remains fixed at 10 curated sites** (three Apollo, Chandrayaan-3, IM-1, IM-2, four polar sites), with four south-pole terrain-aware horizons as intended end-state. No custom coordinates until stretch scope.

## 2. Overall system architecture

**Lane A /scripts + /data + /lib (scientific authority):**
- Source and validate all landing coordinates and dates. Store provenance, coverage windows and frame/datum conventions.
- Produce cached **local, lunar-surface apparent Sun/Earth azimuth + elevation** from Horizons; compute terrain-horizon obstruction from LOLA and derive site status and visibility windows.
- ALSO provide **precomputed Sun/Earth/Moon inertial positions and the Moon-fixed-to-inertial attitude**, or a compatible small cache consumed through a Lane A-owned /lib API. This is needed to make the orbital overview date-synchronized. OzAILabs' existing 2020–2035 ephemeris cache is a candidate source, but the exact frame, center, units, time scale and position-vs-attitude consistency must be validated. The 3D global ephemeris is not a substitute for topocentric site calculations.
- Own error handling for outside-coverage queries, mock/validated status, interpolation and time-scale notes.

**Lane B /web (visualization only):**
- Own Vite, TS, Three.js renderer, clickable objects, controls, camera transitions, view-state machine, site markers, responsive UX, charts, timeline, and comparison cards.
- Import ALL astronomy/site/terrain data through Lane A's **/lib/visibility.js** exported functions (or jointly approved /lib re-exports), not direct raw /data reads and not independently calculated Sun/Earth/Moon ephemerides. JS→TS adapters may map units for rendering but MUST NOT generate scientific angles, orbital states or visibility flags.
- A purely graphical scaled vector transform is acceptable; it does not imply that the **rendering** scale is physically true. A marker's conversion from verified lunar coordinates to globe geometry is a display transform and needs explicit frame/texture alignment tests.
- Keep any unvalidated 3D placeholder clearly marked "illustrative / mock". No independent physically-looking orbit animation pretending to be scientific.

**Shared clock:** ISO 8601 UTC with Z (or epoch ms) as input; one selectedInstant shared by clock bar, 3D orbital view, local horizon, timeline cursor, comparison pane. The dashboard date range is distinct from the instantaneous cursor. Avoid drift between continuously animated time and the static site calculation; pause/play changes the same state.

**Architecture:** /lib/visibility.js → /web/src/data/VisibilityAdapter.ts → /web/src/{scene,ui,views}. /web/src/data/OrbitalDataAdapter.ts should consume a jointly approved Lane A /lib export, not reimplement astronomy or independently load and interpret incompatible ephemerides.

## 3. Existing contract (DO NOT BREAK)
- listSites() returns site IDs/names/coordinates/kinds/dates/sources. Current exports: listSites(), getState(siteId, utcTime), getSummary(siteId, startUtc, days), MOCK.
- getState currently returns {sunEl, sunAz, earthEl, earthAz, lit, comms, hoursToSunChange, hoursToEarthChange, terrain}. getSummary returns {pctLit, pctComms, pctBoth, longestDarkHours}.
- Current Lane A implementations are **synchronous**; UTC is ISO string with Z or epoch milliseconds; angles are degrees. If cache loading requires async later, propose a versioned contract and coordinate the migration BEFORE changing synchronous semantics.
- Proposed fixes for Lane A: listSites() currently strips coordsVerified/note, despite /data/sites.js carrying those fields. Forward those metadata fields. Mock getState() currently returns terrain:"real" for polar sites without real terrain; do not display this as validated. Provide explicit status/provenance (e.g. MOCK + terrain status) that cannot be mistaken for real calculations.
- Null lat/lon or coordsVerified:false means no precise globe marker. An unsourced placeholder can appear as an approximate *region* with explicit label, never as a verified landing point.

## 4. Proposed ADDITIVE integration exports — require both humans' approval
No new API function is approved merely by appearing here. Lane A should recommend final signatures and Lane B should confirm the UI can consume them. Preserve current exports and existing caller behavior.

A. **getTimeline(siteId, startUtc, days, stepHours=1)**
  → [{ utc, sunEl, sunAz, earthEl, earthAz, lit, comms }] or equivalent documented structure. Include sampling and accuracy metadata; timeline is generated by Lane A's scientific model, not by invented animation in Lane B. Memory/performance may favor precomputed arrays. Visibility transitions from hourly sampling are approximate; specify interpolation/accuracy.

B. **getHorizon(siteId)**
  → { azimuthDeg: number[], elevationDeg: number[], model:"lola"|"flat", resolutionDeg, source, verified, referenceFrame } or equivalent. Values are local terrain obstruction elevations; if not available, return an explicit flat approximation, NEVER an unmarked fabricated terrain profile. The panorama should draw THIS exact horizon curve.

C. **getSceneState(utcTime)** — new essential output for synchronized 3D.
  Suggested schema:
  {
    utc: "2026-11-14T12:00:00Z",
    center: "solar-system-barycenter",
    frame: "EXPLICIT_FRAME_NAME",
    unit: "km",
    sun: [x,y,z], earth: [x,y,z], moon: [x,y,z],
    moonFixedToInertialQuat: [x,y,z,w],
    source: "...", coverage: ["...", "..."],
    verified: true
  }
  This is an *example*, not a promise of a particular frame. Provide exact axis ordering, handedness, quaternion convention, reference body, timestamp definition and interpolation. Include Moon attitude using authoritative orientation data (SPICE/PCK/appropriate Horizons orientation capability), not merely Moon orbital revolution. If Moon-fixed orientation is not ready, label the lunar globe/date-linked marker arrangement "orientation approximate" and do not claim complete physical synchronization.

D. **getCoverage()/getMetadata()** (or fields on existing exports)
  → what sites/times are actually supported, sampling interval, source URLs/attribution, mock-vs-validated status and per-site terrain reliability. The UI must disable unsupported date ranges and give explanatory unavailable states, not silently extrapolate.

**Data QA / semantic rules:**
- Distinguish **Sun unobstructed** from actual electrical wattage: no "power generation potential in W" without array area, orientation, efficiency, incidence angle and system assumptions. Say "sunlight availability / solar elevation".
- Distinguish **Earth visible** from assured communication: say "potential direct-to-Earth line of sight", not "guaranteed link."
- Terrain may block a body above the geometric horizon. Clearly distinguish flat horizon versus verified local terrain and disclose point-body approximation and angular horizon resolution.
- Do not pick a universally "better" site without mission-specific weights. Comparisons first show pctLit, pctComms, pctBoth, longestDarkHours, countdown and a timeline; optional weighted ranking only with transparent user-selected priorities.

## 5. Reference simulator decision / source licensing
- **Preferred reference:** OzAILabs/SolarSystemSimulator (modular TypeScript Three.js scene/camera/body selection, animated Sun and Earth visuals, existing Horizons vector-cache concepts). SOL/CKret is less suitable for customization because its primary scene is monolithic, though it has an explicit MIT license and can be studied as fallback.
- **Do NOT wholesale copy** the OzAILabs repo into /web or import its N-body engine/planetary catalog. Only Sun, Earth, Moon, camera, selection, render loop and useful effects are needed. Avoid asteroid swarm, spacecraft, gravity engine, chatbot, heavy simulations, extra planets.
- OzAILabs README says MIT but the inspected repository had no standalone LICENSE. Before copying significant source code/assets, confirm permissions and retain license notices/credit. If unclear, implement equivalent scene logic using independently authored Three.js code. External texture licenses are separate; Solar System Scope textures require CC BY 4.0 attribution and NASA datasets need appropriate citation.
- Preserve third-party source citations in an in-app "Data & Credits" panel and final submission.
- Three.js rendering is **NOT** the source of visibility ground truth.

## 6. 3D/UI feature inventory (implementation contract)
**Overview:** Three recognizable bodies only; clear clickable targets (raycasting), hover/focus indication, touch + keyboard reachable selectors, zoom/orbit controls, pause/play, adjustable playback rate, UTC time picker, reset overview, mini legend for educational/non-physical scale. Render Sun with emissive material + light, Earth with textured sphere, Moon with correctly aligned texture. Prefer readable speed over excessive effects.

**Moon focus:** Moon-click smoothly moves camera and OrbitControls target, preserving the same selected UTC. Close Moon mode maintains globe orientation and sites. Add "Back to overview" and "Analyze selected site". Prevent landing markers from disappearing through clipping or becoming enormous; use LOD/adaptive scaling, readable labels and occlusion awareness. High detail southern polar imagery/terrain may load on demand; fall back to a textured sphere. Visual surface relief must NOT be used for scientific horizon decisions.

**Landing markers:** Derive positions from Lane A-verified lat/lon and the Moon-fixed orientation; validate both near-side Apollo and south-pole placement against a trustworthy lunar atlas. Differentiate historical landings, agency/commercial landings and candidate regions. Unverified candidates marked "approximate" or excluded. Selection opens site's analysis without changing time unexpectedly.

**Mission panel:** Prominent exact UTC, site coordinates, Sun/Earth az/el, present visibility, countdown to next Sun/Earth obstruction/sunrise/sunset, terrain model badge/wording, coverage source and limitations. Treat missing values as "unavailable" not zero.

**Timeline:** Default 30 days, four mutually exclusive states: sunlight+Earth, sunlight only, Earth only, neither. Time scrubber updates the SAME shared clock and 3D scene, with tooltips and UTC ticks. Don't substitute sinusoidal UI interpolation for science; use Lane A timeline.

**Comparison:** Two columns: site A vs site B OR same site on date A vs B. Expose durations/percentages and dark intervals from getSummary; show trade-offs rather than invented best-site claims. Both panels update quickly; don't change one another unless "link dates" is explicitly enabled.

**Local-horizon view (terrain milestone):** A compact 2D azimuth-elevation panorama adjacent to Moon globe/mission card, plotting getHorizon plus getState-derived Sun/Earth positions/paths. Verify a test case where flat horizon predicts Sun visible but terrain blocks it. A full immersive 3D terrain scene is optional and must not replace this accurate graph.

**Accessibility and responsiveness:** Mobile + desktop layout, high contrast, non-color-only categorical labels, keyboard operability, reduced-motion option, clear loading/error/unsupported-date states and acceptable frame rates on ordinary laptops. Users can reach mission analysis in <=2 interactions from initial load (site picker + analyze).

## 7. Synchronization / coordinate correctness checklist (non-negotiable)
1. Single UTC timestamp for all outputs; document UTC vs JD_TDB conversion and ephemeris coverage.
2. Agree on **barycentric vs geocentric/selenocentric** origins; geometric vs apparent positions, ICRF vs ecliptic reference planes, right-/left-handed axes and kilometers-to-render-scale transform. Never compare unlike quantities without transforming.
3. Define lunar surface reference: Moon-fixed frame (e.g., ME/PA with definition), planetocentric latitude, east-positive longitude, reference radius/shape and height datum. A texture seam must correspond to the agreed 0° longitude.
4. Moon orientation changes with time; account for rotational attitude/libration. Orbit-only placement with visually arbitrary rotation would make the site markers wrong.
5. Cross-check at least three site/time examples that a ray from a Moon-fixed marker toward displayed Sun/Earth is geometrically consistent (within documented tolerance and apparent/geometric corrections) with local topocentric results. Also compare 3 local Horizons readouts to +/-0.1° as planned.
6. **Historical coverage conflict:** OzAILabs' bundled vector cache covers 2020–2035, while Apollo landings occurred in 1969–1972. Either precompute historical global ephemerides and Moon orientation for those periods OR clearly disable synchronized historical 3D playback while allowing independently validated historical site readouts. Never apply a 2026 scene to an Apollo 1969 landing instant.
7. Do not exceed a cache's bounds. Missing time/site data → explicit unavailable state. Do not silently fallback to approximate Kepler orbit while labeling it JPL synchronized.
8. As long as MOCK is true, show a persistent "DEMO / SIMULATED VALUES — NOT FOR MISSION USE" indicator in *all* scientific readouts.

## 8. Phased delivery / acceptance gates (existing PLAN criteria preserved)
**Gate 0 — M0 / infrastructure (IMMEDIATE):**
- Lane A has already sourced all 10 site coordinates (including four **representative**, not exact landing, south-polar points). Confirm catalog metadata is exposed by listSites(); coordinate-frame/datum alignment still requires M1 validation.
- Lane B migrates the existing simple /web/index.html into a minimal Vite/TS app, importing ../lib/visibility.js; build must include source outside /web correctly. Choose one canonical Vite config/root, verify dev, production build, actual hosted URL, phone viewport, mock banner and all ten names. Static deployment can use GitHub Pages or equivalent, but require correct repository subpath/base URLs. Do not ship a broken static import.
- PASS when deployed ten-name list works, source verification is honest, and both humans sign off. Do not mark done merely because files were committed.

**Gate 1 — Scientific and data validation (Lane A M1; Lane B can work in parallel):**
- Validate topocentric Horizons setup (observer Moon surface, Sun=10, Earth=399, correct lon/az/alt/UTC conventions) and three independent checks.
- Deliver actual, sampled coverage for a small representative window before mass-downloading 2026–2029, then widen toward original scope. Expose real coverage in metadata. No silent reduction of agreed final scope without both humans.
- Agree on proposed additive APIs for scene state, horizon and timeline, as needed.

**Gate 2 — Core mission dashboard (Lane B M2 + Lane A):**
- Date/site selector, Sun/Earth angles, flags, countdowns, four-color 30-day strip, provenance + mock state. PASS: outside user answers potential Earth line-of-sight for selected date within 10 seconds.

**Gate 3 — Minimal synchronized three-body scene (NEW core visual):**
- Render Sun, Earth, Moon only, focus by click, same selected UTC, controls/pause, accurate cached global positions and documented Moon orientation (or clearly mocked until validated). No heavy physics or other planets. PASS: change date → all three-body poses and mission readouts update to the same timestamp; no fake accuracy claims. Hardware/mobile smoke test.

**Gate 4 — Zoom + lunar markers (NEW core visual):**
- Camera zooms continuously into Moon; site markers located with Moon-fixed coordinates; verified historical/near-side + polar sanity checks. Direct site picker stays available. PASS: clicking Moon/site opens valid site analysis and back navigation, without date drift; unverified sites clearly flagged.

**Gate 5 — Comparison (M3):**
- Same-site/different-dates and two-site comparisons, meaningful trade-offs rather than predetermined winner, measurable update responsiveness under ~1 second for cached datasets.

**Gate 6 — Terrain + accurate horizon (M4):**
- Four south-pole terrain horizons target, starting with a well-validated single exemplar to de-risk methods; compare the 360-bin horizon with real terrain sampling and document precision. PASS: one geometric-above-horizon but terrain-blocked case and the panorama agrees.

**Gate 7 — Submission hardening (M7):**
- Preserve three-hour freeze for recorded demo, mobile checks, data/method credits, limitation explanations, project page, and deployed URL. Define an "accurate minimum" fallback: if 3D syncing is not scientifically validated, ship the working site/date comparison with explicitly illustrative 3D rather than false precision.

**Out of initial scope:** chatbot, arbitrary solar-system bodies, N-body engine, custom coordinate live Horizons calls, immersive DEM terrain meshes, opaque AI rankings. Optional only if gates above pass with substantial time remaining.

## 9. Build / collaboration protocol
- Respect folders: Lane A edits /scripts,/data,/lib; Lane B edits /web. STATUS.md is the shared handoff; no one changes the other lane's files without explicit agreement.
- Keep root package.json currently {"type":"module"} as-is unless both approve; place Vite's package.json and tsconfig in /web. Decide deployment strategy and permissions for imports above /web. Include reproducible build commands in Lane B docs.
- Run a lightweight integration smoke test when either side changes /lib exports; record which commit/data version the UI was tested against.
- Before making an interface-breaking change: propose the exact new shape here, get the humans' approval, implement a stub, update the visualization adapter, THEN deploy. Coordinate commit/pull to avoid overwriting shared STATUS.md.
- Each session still begins with PLAN.md + STATUS.md and the required 3-line report. Update pass/fail checklists only after tests actually run.

## 10. Immediate handoff to Sheldon / Claude Code
**Please read this whole section and reply in STATUS.md** (or tell both humans, then document the outcome):
1. Confirm that Vite+TS **within /web** is compatible with the Lane A module contract, and whether current synchronous access can be preserved.
2. Recommend precise, minimal signatures for getSceneState/getTimeline/getHorizon or an equally small combined API. Provide concrete NASA/JPL source, frame, orientation strategy and feasible date coverage, including historic Apollo handling.
3. Identify a credible Moon-attitude source / pipeline that allows surface sites to stay geographically correct during date changes; call out if full consistency cannot be validated in the allotted time.
4. Confirm fixes to listSites() metadata and false "real terrain" label under MOCK.
5. Continue Lane A's current **single next task**: M1 step 1, verify Horizons' lunar surface observer configuration from documentation and fetch/check one verified site (Apollo 11). The 10-site catalog is already fully sourced; do not re-source it as the next task.

**Immediate Lane B next task (unchanged until M0 passes):** Vite migration + verified deployed ten-site catalog, entirely in /web. DO NOT start full OzAILabs import, 3D scene or new ephemeris calculations before that acceptance check.

**Status accounting:** This blueprint is documentation only. No new feature, scientific validation, build, or deployment has passed merely because this section was committed.
