# GitRoast Intelligence

**A real analytics dashboard for public GitHub profiles. No fabricated traffic, earnings, trendlines or user metrics.**

GitRoast turns GitHub public profile, repository and event API responses into a responsive developer dashboard. The original card creator is preserved as [Card Studio](./studio.html), with themed SVG/PNG exports.

**Status:** public source · automated tests · no paid API · GitHub Pages hosting not enabled.

## What actually works

- **Public profile:** avatar, username, display name, bio, publicly provided company/location, join year, follower count.
- **Current snapshot KPIs:** sampled public repositories, stars and forks on original repos, followers, recently pushed repos, observed events.
- **Public event timeline:** 7/30/90-day plot of the actual available event records. Not GitHub's complete contribution graph.
- **Primary language distribution:** counts of original repositories by their main language, not byte shares.
- **Repository explorer:** search, sorting, pagination, archived/fork/stale labels, stars, forks, latest push.
- **Health & insights:** documented rule-based portfolio observations and a playful roast, not a skill score.
- **Exports:** actual sampled repo data to CSV and the preserved Studio for SVG/PNG report cards.

## Screenshots — only from the real app

These images were **captured by Chromium running the actual committed application**. The dashboard loaded the real public profile `pinozzi94-hue` using genuine GitHub REST API responses. No sample metrics, stock images or generated dashboard art.

![Actual GitRoast Intelligence dashboard, desktop screenshot with public GitHub data](./assets/dashboard-desktop.png)

[View actual mobile screenshot](./assets/dashboard-mobile.png) · [Inspect screenshot timestamp, KPI values and HTTP provenance](./assets/screenshot-source.json)

**Capture:** 28 October 2026, 20:41 UTC. **Coverage:** 2 of 2 public repositories. These are point-in-time results; today's counts can differ. The [capture workflow](./.github/workflows/capture.yml) runs the site in Chromium and regenerates both screenshots from real GitHub data after changes to the app.

## Avvio rapido — Windows, macOS e Linux

Il progetto è un sito **statico e gratuito**, senza database, chiavi API o server applicativo. Per usarlo in locale basta un browser e un piccolo server HTTP: **non aprire direttamente `index.html` con il protocollo `file://`**, perché alcune funzionalità potrebbero non comportarsi come su HTTP.

### Metodo consigliato: Node.js

1. Installa **Node.js** da [nodejs.org](https://nodejs.org/) (versione LTS).
2. Scarica questo repository come ZIP tramite **Code → Download ZIP** e decomprimilo; in alternativa usa `git clone`.
3. Apri il terminale nella cartella che contiene `package.json`.
4. Esegui:

```bash
npm install
npm run dev
```

5. Apri nel browser l'indirizzo locale che Vite mostra nel terminale, in genere **http://localhost:5173/**.

### Metodo alternativo: Python, senza installare pacchetti del progetto

Se hai Python 3 installato, apri il terminale nella cartella principale e avvia:

```bash
python -m http.server 4173
```

Su alcuni sistemi Linux/macOS il comando è `python3 -m http.server 4173`. Poi apri **http://localhost:4173/**.

### Metodo Git

```bash
git clone https://github.com/pinozzi94-hue/Chat-AI-Template-TypeScript-React.git
cd Chat-AI-Template-TypeScript-React
npm install
npm run dev
```

### Come usare l'app

1. Inserisci uno **username GitHub pubblico** nella casella di ricerca.
2. Consulta le schede Overview, attività, linguaggi, repository e insights.
3. Filtra e ordina i repository; scegli 7, 30 o 90 giorni per gli eventi pubblici.
4. Usa **Export CSV** per salvare i repository analizzati.
5. Apri **Card Studio** (`/studio.html?u=nomeutente`) per generare SVG/PNG.

Per verificare il codice:

```bash
npm test
npm run build
```

Se compare **API rate limit** o non arrivano dati, GitHub potrebbe aver temporaneamente limitato le richieste anonime. L'app non richiede token né login; non mostra numeri inventati in sostituzione dei risultati non ricevuti.

### Compatibilità e dimensioni dello schermo

Dashboard e Studio usano layout adattivi con ottimizzazioni dedicate per schermi **320–360 px**, **361–479 px**, smartphone standard, **tablet 480–980 px**, laptop, desktop e monitor **Full HD / 4K / ultrawide**. I componenti si riordinano in base allo spazio, le tabelle ampie scorrono orizzontalmente quando necessario, i pulsanti touch hanno un'area di tocco più grande e vengono rispettate le preferenze di movimento ridotto.

**Nota:** questi sono breakpoint e comportamenti implementati nel CSS. Il test automatico controlla la presenza delle regole; non significa che ogni dispositivo fisico esistente sia stato provato uno a uno.

### Pubblicazione online

GitHub ospita qui il **codice sorgente**, ma questo da solo non attiva una demo web. Per pubblicare una versione online occorre configurare un servizio di hosting statico (per esempio GitHub Pages). **Non viene dichiarato un sito live finché non è verificato.**


## Where the data comes from

| Metric | Source | Important limitation |
| --- | --- | --- |
| Profile/followers | `GET /users/{username}` | Public data only |
| Repositories, stars, forks, statuses | `GET /users/{username}/repos` | Up to 500 downloaded repos; partial coverage disclosed |
| Language donut | Primary `language` on original public repos | Not lines of code |
| Activity timeline | `GET /users/{username}/events/public` | Visible public events only; not all contributions |
| Signal and roast | Local rule-based heuristics | Not a professional assessment |

**GitHub public profile data does not contain** visitor counts, revenue, conversion rates, historic star/follower growth, complete contribution histories, or private repositories. The dashboard does not fabricate them. Static KPIs are marked as current snapshots.

For all details, see **[Data sources, limitations & screenshot provenance](./docs/DATA_SOURCES.md)**.

## Test and verification

```bash
npm test
```

or `node scripts/verify.mjs`. The [quality workflow](./.github/workflows/quality.yml) checks syntax, navigation, data metrics, SVG/PNG export paths and public API usage on every push.

## Privacy, costs and availability

The browser calls the GitHub API directly; there is no account sign-in, database, telemetry or paid AI service. The public API rate limits still apply. The screenshot capture uses a short-lived GitHub Actions token **in CI only** to retrieve unmodified public responses; that token is not embedded in the site.

**There is not yet a verified hosted live demo.** A public GitHub repository is not itself a deployed website. GitHub Pages is not enabled. The existing repository slug remains `Chat-AI-Template-TypeScript-React` because the available GitHub connector does not expose the rename operation.

## Nome del repository

**Nome del prodotto:** `GitRoast Intelligence`  
**Nome GitHub consigliato:** `gitroast-intelligence`  
**Slug attuale:** `Chat-AI-Template-TypeScript-React`

La rinomina dello slug richiede un'operazione amministrativa GitHub che il connettore usato qui **non espone**. Per completarla, il proprietario può usare [Repository Settings](https://github.com/pinozzi94-hue/Chat-AI-Template-TypeScript-React/settings) → **General** → **Repository name**, inserire `gitroast-intelligence` e premere **Rename**. Al termine GitHub solitamente reindirizza gli URL precedenti; aggiorna comunque i link e la remote Git quando il nuovo indirizzo è confermato.

## License

[MIT](./LICENSE).
