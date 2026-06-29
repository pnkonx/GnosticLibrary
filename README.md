# 🏺 Nag Hammadi Gnostic Library

A personal reading app for the complete Nag Hammadi Library — 40+ ancient Gnostic texts discovered in Egypt in 1945, presented in a clean, mobile-friendly interface with multiple translations for each text.

![JavaScript](https://img.shields.io/badge/JavaScript-63%25-yellow) ![HTML](https://img.shields.io/badge/HTML-37%25-orange)

---

## What Is This?

The Nag Hammadi Library is a collection of 13 ancient codices (books) found buried in the Egyptian desert in 1945. They contain over 50 texts — many previously unknown — that offer a window into early Gnostic Christianity, including the Gospel of Thomas, the Gospel of Philip, and the Gospel of Truth.

This project is a personal reading app that scrapes translations from the [Gnostic Society Library](http://www.gnosis.org/naghamm/nhl.html) and presents them through a clean REST API and reader interface. It was built as a heartfelt personal reference tool for studying these texts.

---

## Features

- 📖 40+ texts across 9 codices (I, II, III, V, VI, VII, VIII, IX, XI, XIII)
- 🔄 Multiple translations per text — switch between scholars like Meyer, Barnstone, Davies, and others
- 📱 Mobile-friendly with a collapsible sidebar
- 🔍 Filter texts by codex or search by title via the API
- 🌙 Dark parchment reading interface

---

## Tech Stack

- **Backend:** Node.js, Express
- **Scraping:** node-fetch, Cheerio
- **Frontend:** Vanilla HTML/CSS/JS (no framework)

---

## Running Locally

**Prerequisites:** Node.js installed

```bash
# Clone the repo
git clone https://github.com/pnkonx/GnosticLibrary.git
cd GnosticLibrary

# Install dependencies
npm install

# Start the server
npm start
```

Then open **http://localhost:3000** in your browser.

---

## API Endpoints

| Endpoint | Description |
|---|---|
| `GET /texts` | List all texts |
| `GET /texts?codex=II` | Filter by codex |
| `GET /texts?search=thomas` | Search by title |
| `GET /texts/:id` | Get text metadata |
| `GET /texts/:id/read` | Read full text (default: first translator) |
| `GET /texts/:id/read?translator=Meyer` | Read a specific translation |
| `GET /codices` | List all codices |
| `GET /codices/:codex` | Get all texts in a codex |

**Example:**
```
GET /texts/gospel-of-thomas/read?translator=Meyer
```

---

## Project Structure

```
GnosticLibrary/
├── server.js          # Express API + scraper
├── public/
│   └── index.html     # Frontend reader
├── package.json
└── README.md
```

---

## Texts Included

**Codex I** — Prayer of the Apostle Paul · Apocryphon of James · Gospel of Truth · Treatise on the Resurrection · Tripartite Tractate

**Codex II** — Apocryphon of John · Gospel of Thomas · Gospel of Philip · Hypostasis of the Archons · On the Origin of the World · Exegesis on the Soul · Book of Thomas the Contender

**Codex III** — Gospel of the Egyptians · Eugnostos the Blessed · Sophia of Jesus Christ · Dialogue of the Savior

**Codex V** — Apocalypse of Paul · First Apocalypse of James · Second Apocalypse of James · Apocalypse of Adam

**Codex VI** — Acts of Peter and the Twelve Apostles · The Thunder, Perfect Mind · Authoritative Teaching · Concept of Our Great Power · Discourse on the Eighth and Ninth · Prayer of Thanksgiving

**Codex VII** — Paraphrase of Shem · Second Treatise of the Great Seth · Apocalypse of Peter · Teachings of Silvanus · Three Steles of Seth

**Codex VIII** — Zostrianos · Letter of Peter to Philip

**Codex IX** — Melchizedek · Thought of Norea · Testimony of Truth

**Codex XI** — Interpretation of Knowledge · Allogenes

**Codex XIII** — Trimorphic Protennoia

---

## Hosting

This app requires a Node.js server to run. It cannot be hosted on GitHub Pages (static only). Recommended free hosting:

- **[Railway](https://railway.app)** — connect your GitHub repo, deploys automatically on every push
- **[Render](https://render.com)** — similar, free tier available

---

## Source Texts

All translations are sourced from the [Gnostic Society Library](http://www.gnosis.org/naghamm/nhl.html) at gnosis.org, which hosts the work of scholars including Dr. Marvin Meyer, Dr. Willis Barnstone, Dr. Stevan Davies, and Dr. John Turner. This project does not host or redistribute the texts — it fetches them live from gnosis.org.

---

## License

MIT — do whatever you like with the code. The translations themselves remain copyright of their respective translators.
