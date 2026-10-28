# Data sources, methodology and screenshot authenticity

This document describes where the real numbers shown by GitRoast Intelligence come from and what each widget can and cannot claim.

## Public REST endpoints

- `GET https://api.github.com/users/{username}` — profile, followers, public repository count, public bio/location/company.
- `GET https://api.github.com/users/{username}/repos?type=owner&sort=pushed&per_page=100&page=N` — public repository metadata, up to five pages (500 repositories).
- `GET https://api.github.com/users/{username}/events/public?per_page=100&page=N` — available recent public events, up to three pages.

## Exact KPI meanings

| Display | Computation | Scope |
| --- | --- | --- |
| Public repositories | Number of downloaded public repos | Up to 500; coverage shown separately |
| Stars earned | Sum of current `stargazers_count` on original public repos | Current snapshot only |
| Forks earned | Sum of current `forks_count` on original public repos | Current snapshot only |
| Followers | Current public `followers` field | Current snapshot only |
| Active repositories (90 days) | Count of original repos whose `pushed_at` is within 90 days | Not a measure of author activity |
| Public activity | Counts of observed public event records by their `created_at` timestamp | Limited event history, not full contributions |
| Primary languages | Count of original public repositories by `language` | Not lines or bytes of code |
| Portfolio signal | Rule-based heuristic using current repo/profile metadata | Not a skill or employability rating |

**No fabricated trendlines.** GitHub does not return historical star, follower or fork counts from the public profile API. KPI widgets therefore show current snapshots rather than artificial trends. Only public event timestamps are charted as a time series.

## Unavailable data

Repository traffic, unique visitors, full historical star/follower trajectories, revenue, conversion rates, private contributions, private repositories and actual engineering competence are **not** available and must not be invented or implied.

## Errors and partial data

Unauthenticated GitHub REST requests can be rate-limited. If repository retrieval fails before returning any results the dashboard shows an error, not a fictional zero. The interface explicitly discloses partial repository coverage; public event feeds are incomplete by nature.

## Real screenshot rule

The capture workflow starts a local server using the **committed index.html**, opens it in headless Chromium, and fetches real public REST responses for the author's public GitHub username. During the capture only, it uses the GitHub Actions token on the runner side to avoid public-rate limits. That token never enters the published app or the resulting images.

The workflow verifies a successful API load and rendered KPIs before capturing desktop and mobile PNG files. It also generates `assets/screenshot-source.json` with UTC timestamp, source account, coverage, KPI labels and HTTP statuses. PNGs are **point-in-time actual application screenshots**, not a mockup or generated dashboard illustration.

The README only references screenshots once these PNGs have actually been committed. When capture fails, no pretend screenshots are published.

## Hosting

Public GitHub source does not imply a live website. GitHub Pages hosting has not been enabled for this repository; previous Cloudflare provisioning attempts did not deploy a site. The current connector has no administrative rename or Pages-enable operation.

## License

MIT — see [LICENSE](../LICENSE).
