import './style.css';
import { listSites, MOCK } from '../../lib/visibility.js';

interface Site {
  id: string;
  name: string;
  kind?: string;
  lat?: number | null;
  lon?: number | null;
  coordsVerified?: boolean;
}

const app = document.querySelector<HTMLDivElement>('#app');
if (!app) throw new Error('Missing #app container');

app.innerHTML = `
  <main class="shell">
    <header class="page-header">
      <p class="eyebrow">NASA Space Apps 2026 · M0 site catalog</p>
      <h1>Lunar Landing Site Navigator</h1>
      <p class="intro">Landing locations provided exclusively by the shared scientific-data module.</p>
    </header>
    <aside id="mock-notice" class="mock-notice" hidden role="note">
      DEMO / SIMULATED VALUES — NOT FOR MISSION USE
    </aside>
    <section aria-labelledby="sites-heading">
      <div class="section-heading">
        <h2 id="sites-heading">Landing sites</h2>
        <p id="load-status" role="status" aria-live="polite">Loading site catalog…</p>
      </div>
      <ul id="site-list" class="site-list" aria-label="Landing sites"></ul>
    </section>
    <footer>
      This page verifies integration with <code>/lib/visibility.js</code>. It does not calculate
      Sun or Earth positions.
    </footer>
  </main>
`;

const notice = document.getElementById('mock-notice');
const status = document.getElementById('load-status');
const list = document.getElementById('site-list');

if (!notice || !status || !list) throw new Error('Catalog DOM elements missing');
notice.hidden = !MOCK;

try {
  // Lane A owns all source data. Never replace this with fabricated site data.
  const sites = listSites() as Site[];
  if (!Array.isArray(sites)) throw new TypeError('listSites() must return an array');

  const fragment = document.createDocumentFragment();
  for (const site of sites) {
    if (!site || typeof site.name !== 'string' || typeof site.id !== 'string') {
      throw new TypeError('listSites() returned a malformed site');
    }
    const item = document.createElement('li');
    item.className = 'site';
    const title = document.createElement('span');
    title.className = 'site-name';
    title.textContent = site.name;
    item.append(title);

    if (site.coordsVerified === false) {
      const note = document.createElement('span');
      note.className = 'site-warning';
      note.textContent = 'Coordinates unverified';
      item.append(note);
    }
    fragment.append(item);
  }

  list.replaceChildren(fragment);
  status.textContent = `${sites.length} site${sites.length === 1 ? '' : 's'} loaded`;
  if (sites.length !== 10) {
    status.textContent += ' — M0 expects 10 sites';
    status.dataset.state = 'warning';
  }
} catch (error) {
  console.error('Site catalog integration failed:', error);
  status.textContent = 'Site catalog unavailable — check the Lane A module.';
  status.dataset.state = 'error';
}
