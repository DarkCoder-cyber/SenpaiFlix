# SenpaiFlix

**Your anime universe: discover, explore, and watch.**

SenpaiFlix is a React-based anime discovery and streaming interface. Browse anime, search titles, explore categories, manage a watchlist, and open available episodes.

> Anime catalogs, metadata, and video playback may depend on third-party APIs and providers. Their availability can change.

## Table of Contents

- [Features](#features)
- [Technology](#technology)
- [Requirements](#requirements)
- [Setup](#setup)
- [Environment Variables](#environment-variables)
- [Development and Build](#development-and-build)
- [Project Structure](#project-structure)
- [Pages and Components](#pages-and-components)
- [API and Storage Services](#api-and-storage-services)
- [Bug Reports](#bug-reports)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [License and Disclaimer](#license-and-disclaimer)

## Features

- Discover featured anime and browse content sections.
- Search anime and view matching results.
- Browse recent content, movies, genres, and filtered results.
- View anime details and available episodes.
- Play episodes through configured providers; switch servers when available.
- Use a browser-based watchlist and continue-watching features where supported.
- Navigate responsive pages with reusable cards, grids, and carousels.
- See loading placeholders and notifications.
- Report issues through the in-app bug reporter where available.

Some features rely on external services and may be unavailable when those services are down or change their responses.

## Technology

- React 18, React Router DOM, and Create React App
- Axios for HTTP requests
- Vime and browser video playback
- Framer Motion
- CSS and Sass
- React Hot Toast
- React Icons, Font Awesome, and Ant Design icons

## Requirements

- Node.js 16 or newer recommended
- npm
- Git
- Internet access for package installation and external APIs

Check your installed versions:

```bash
node --version
npm --version
git --version
```

## Setup

Clone the repository and install the client dependencies:

```bash
git clone <your-repository-url>
cd <repository-folder>/client
npm install
```

In the current Codespaces workspace, the client directory may be:

```bash
cd /workspaces/SenpaiFlix/animebliss-main/client
npm install
```

## Environment Variables

Check whether the project provides an environment template:

```bash
find .. -maxdepth 2 -name ".env*"
```

If `.env.example` exists, copy it to `.env`:

```bash
cp .env.example .env
```

Use only variables documented by the template or source code. Restart the development server after changing environment values.

**Security:** Do not put private credentials in frontend variables such as `REACT_APP_*`. Frontend values can be visible to users. Never commit private keys, passwords, tokens, or a real `.env` file.

## Development and Build

Run these commands from the `client/` directory:

| Command | Purpose |
| --- | --- |
| `npm start` | Start the local development server |
| `npm run build` | Create a production build in `client/build/` |
| `npm test` | Run the test suite |
| `npm run eject` | Eject Create React App configuration; this is a one-way change |

The development server usually runs at [http://localhost:3000](http://localhost:3000). In Codespaces, open the forwarded port shown by the interface.

## Project Structure

```text
client/
├── public/                         # Static files and HTML shell
├── package.json                    # Dependencies and npm scripts
└── src/
    ├── assets/                     # Images and imported assets
    ├── components/
    │   ├── Cards/                  # Anime, hero, upcoming, skeleton cards
    │   ├── Layouts/                # Carousel and grid layouts
    │   ├── Others/                 # Bug reporter and loading indicator
    │   ├── Pages/                  # Website pages
    │   ├── Players/                # Anime and trailer players
    │   └── Sections/               # Navigation and page sections
    ├── services/
    │   ├── api/                    # API configuration and provider services
    │   └── storage.js              # Browser-side storage helpers
    ├── App.jsx                     # Top-level application and routes
    └── index.js                    # React entry point
```

## Pages and Components

### Pages

| File | Responsibility |
| --- | --- |
| `src/App.jsx` | Top-level application and route setup |
| `src/components/Pages/Welcome.jsx` | Welcome or landing experience |
| `src/components/Pages/Home.jsx` | Main anime discovery page |
| `src/components/Pages/Recent.jsx` | Recent anime content |
| `src/components/Pages/Movies.jsx` | Anime movie browsing |
| `src/components/Pages/Genres.jsx` | Genre browsing |
| `src/components/Pages/Filtered.jsx` | Filtered anime results |
| `src/components/Pages/SearchResults.jsx` | Search results |
| `src/components/Pages/AnimePlayerPage.jsx` | Anime details, episode selection, and playback page |
| `src/components/Pages/Watchlist.jsx` | Saved anime list |
| `src/components/Pages/Login.jsx` | Login interface |
| `src/components/Pages/Signup.jsx` | Signup interface |

### Sections

| File | Responsibility |
| --- | --- |
| `src/components/Sections/Navbar.jsx` | Main navigation and search |
| `src/components/Sections/Hero.jsx` | Featured anime presentation |
| `src/components/Sections/AnimeSection.jsx` | Anime listing section |
| `src/components/Sections/ContinueWatching.jsx` | Continue-watching section |
| `src/components/Sections/MoreSection.jsx` | Additional content |
| `src/components/Sections/UpcomingSection.jsx` | Upcoming anime |
| `src/components/Sections/InfiniteSection.jsx` | Incrementally loaded content |
| `src/components/Sections/MovieShowcase.jsx` | Movie presentation |

### Cards, layouts, players, and utilities

| File or folder | Responsibility |
| --- | --- |
| `src/components/Cards/` | Anime, hero, upcoming, and loading-placeholder cards |
| `src/components/Layouts/CarouselRenderer.jsx` | Carousel layout |
| `src/components/Layouts/GridRenderer.jsx` | Grid layout |
| `src/components/Layouts/VerticalCarousel.jsx` | Vertical carousel |
| `src/components/Players/AnimePlayer.jsx` | Episode player interface |
| `src/components/Players/TrailerPlayer.jsx` | Trailer player interface |
| `src/components/Others/ClockLoader.jsx` | Loading indicator |
| `src/components/Others/BugReporter.jsx` | In-app bug-report interface |

This guide describes file responsibilities. Refer to source files for current function names, arguments, component props, and routes.

## API and Storage Services

API modules are located in `src/services/api/`:

| File | Responsibility |
| --- | --- |
| `config.js` | API configuration and route helpers |
| `client.js` | Shared HTTP client and request handling |
| `animeKaiApi.js` | AnimeKai catalog and anime-related requests |
| `animeParadiseApi.js` | AnimeParadise provider requests |
| `providerApi.js` | Alternative provider and stream-related requests |
| `index.js` | Central exports for API modules |

Use these modules for API calls so request logic stays organized. Check each module for exact exported function names, parameters, and response formats.

`src/services/storage.js` contains browser-side storage helpers. Saved data may be limited to the current browser and can be removed when browser data is cleared. It does not automatically sync across devices unless account-backed syncing is implemented.

## Bug Reports

Use the in-app bug reporter if available. Otherwise, open an Issue in the project’s GitHub repository.

Include:

1. A short title and the affected page or feature
2. Browser and version, operating system, and device
3. Steps to reproduce the problem
4. Expected result and actual result
5. Any visible error message
6. How often the issue occurs
7. A screenshot or recording, if useful

### Bug report template

```text
Title:
Page or feature:
Browser and version:
Operating system/device:

Steps to reproduce:
1.
2.
3.

Expected result:
Actual result:
Error message:
How often does it happen?
Screenshot or recording:
```

Do not include passwords, API keys, access tokens, or private account details in public reports. Report security-sensitive issues privately to the repository owner.

## Troubleshooting

### `node` or `npm` is not found

Install Node.js, open a new terminal, then check `node --version` and `npm --version`.

### `npm install` fails

- Confirm the terminal is in `client/`.
- Check your internet connection and the first npm error.
- Confirm your Node.js version meets the requirements.
- Avoid deleting the lockfile unless you intend to regenerate dependency versions.

### The development server will not start

- Run `npm install` from `client/`.
- Check the first terminal error.
- If port 3000 is busy, use the alternate port offered by Create React App.

### Anime content is missing

- Check internet access and API configuration.
- Restart the server after changing `.env`.
- Check the browser Console and Network panels.
- External APIs may be down, rate-limited, or returning changed data.

### An episode will not play

- Try another available server if the player provides one.
- Check whether one episode or all episodes are affected.
- Check browser playback and network errors.
- Playback depends on third-party providers.

### Images are broken

Check that the image exists and the import path and filename capitalization match. If an image format changes, update every reference to it.

### The production build fails

Run `npm run build` from `client/` and fix the first reported error. Common causes include missing imports, syntax errors, missing assets, and case-sensitive path mismatches.

## Contributing

1. Create a branch for your change:

   ```bash
   git checkout -b feature/your-change
   ```

2. Make a focused change and update the documentation if behavior changes.
3. Build the client with `cd client && npm run build`.
4. Commit and push your branch, then open a pull request with a clear summary.

## License and Disclaimer

Check the repository for a `LICENSE` file and follow its terms before redistributing this project.

SenpaiFlix does not claim ownership of third-party anime content or streams. External media availability and rights are determined by their respective providers. Users are responsible for following applicable laws and provider terms.
