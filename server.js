const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");
const cheerio = require("cheerio");
const path = require("path");

const app = express();
app.use(cors({ origin: "*", methods: ["GET"], allowedHeaders: ["Content-Type"] }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

const BASE_URL = "http://www.gnosis.org/naghamm";

const TEXTS = [
  // CODEX I
  { id: "prayer-of-apostle-paul", title: "The Prayer of the Apostle Paul", codex: "I", position: 1, translations: [
    { translator: "Meyer", url: `${BASE_URL}/prayp-meyer.html` },
    { translator: "Mueller (CGLP)", url: `${BASE_URL}/prayp.html` }
  ]},
  { id: "apocryphon-of-james", title: "The Apocryphon of James", codex: "I", position: 2, translations: [
    { translator: "Meyer & Barnstone", url: `${BASE_URL}/jam-meyer.html` },
    { translator: "Williams (CGLP)", url: `${BASE_URL}/jam.html` },
    { translator: "Cameron", url: `${BASE_URL}/jam2.html` }
  ]},
  { id: "gospel-of-truth", title: "The Gospel of Truth", codex: "I", position: 3, translations: [
    { translator: "Barnstone & Meyer", url: `${BASE_URL}/got-barnstone.html` },
    { translator: "Grant", url: `${BASE_URL}/got.html` },
    { translator: "Attridge & MacRae (CGLP)", url: `${BASE_URL}/gostruth.html` }
  ]},
  { id: "treatise-on-resurrection", title: "The Treatise on the Resurrection", codex: "I", position: 4, translations: [
    { translator: "Barnstone", url: `${BASE_URL}/resurrection-barnstone.html` },
    { translator: "Peel (CGLP)", url: `${BASE_URL}/res.html` }
  ]},
  { id: "tripartite-tractate", title: "The Tripartite Tractate", codex: "I", position: 5, translations: [
    { translator: "Attridge & Mueller (CGLP)", url: `${BASE_URL}/tripart.htm` }
  ]},

  // CODEX II
  { id: "apocryphon-of-john", title: "The Apocryphon of John", codex: "II", position: 1, translations: [
    { translator: "Meyer", url: `${BASE_URL}/apocjn-meyer.html` },
    { translator: "Davies", url: `${BASE_URL}/apocjn-davies.html` },
    { translator: "Wisse (CGLP)", url: `${BASE_URL}/apocjn.html` }
  ]},
  { id: "gospel-of-thomas", title: "The Gospel of Thomas", codex: "II", position: 2, translations: [
    { translator: "Meyer", url: `${BASE_URL}/gosthom-meyer.html` },
    { translator: "Davies", url: `${BASE_URL}/gosthom-davies.html` },
    { translator: "Lambdin (CGLP)", url: `${BASE_URL}/gthlamb.html` },
    { translator: "Patterson & Meyer", url: `${BASE_URL}/gthomas.html` }
  ]},
  { id: "gospel-of-philip", title: "The Gospel of Philip", codex: "II", position: 3, translations: [
    { translator: "Meyer", url: `${BASE_URL}/GPhilip-Meyer.html` },
    { translator: "Barnstone", url: `${BASE_URL}/GPhilip-Barnstone.html` },
    { translator: "Isenberg (CGLP)", url: `${BASE_URL}/philip.html` }
  ]},
  { id: "hypostasis-of-the-archons", title: "The Hypostasis of the Archons", codex: "II", position: 4, translations: [
    { translator: "Barnstone & Meyer", url: `${BASE_URL}/Hypostas-Barnstone.html` },
    { translator: "Layton (CGLP)", url: `${BASE_URL}/hypostas.html` }
  ]},
  { id: "on-the-origin-of-the-world", title: "On the Origin of the World", codex: "II", position: 5, translations: [
    { translator: "Barnstone & Meyer", url: `${BASE_URL}/origin-Barnstone.html` },
    { translator: "Bethge & Layton (CGLP)", url: `${BASE_URL}/origin.html` }
  ]},
  { id: "exegesis-on-the-soul", title: "The Exegesis on the Soul", codex: "II", position: 6, translations: [
    { translator: "Barnstone & Meyer", url: `${BASE_URL}/exegesis-barnstone.html` },
    { translator: "Robinson (CGLP)", url: `${BASE_URL}/exegesis.html` }
  ]},
  { id: "book-of-thomas-the-contender", title: "The Book of Thomas the Contender", codex: "II", position: 7, translations: [
    { translator: "Turner (CGLP)", url: `${BASE_URL}/bookt.html` }
  ]},

  // CODEX III
  { id: "gospel-of-the-egyptians", title: "The Gospel of the Egyptians", codex: "III", position: 2, translations: [
    { translator: "Bohlig & Wisse (CGLP)", url: `${BASE_URL}/goseqypt.html` }
  ]},
  { id: "eugnostos-the-blessed", title: "Eugnostos the Blessed", codex: "III", position: 3, translations: [
    { translator: "Parrott (CGLP)", url: `${BASE_URL}/eugn.html` }
  ]},
  { id: "sophia-of-jesus-christ", title: "The Sophia of Jesus Christ", codex: "III", position: 4, translations: [
    { translator: "Parrott (CGLP)", url: `${BASE_URL}/sjc.html` }
  ]},
  { id: "dialogue-of-the-savior", title: "The Dialogue of the Savior", codex: "III", position: 5, translations: [
    { translator: "Emmel (CGLP)", url: `${BASE_URL}/dialog.html` }
  ]},

  // CODEX V
  { id: "apocalypse-of-paul", title: "The Apocalypse of Paul", codex: "V", position: 2, translations: [
    { translator: "MacRae & Murdock (CGLP)", url: `${BASE_URL}/ascp.html` }
  ]},
  { id: "first-apocalypse-of-james", title: "The First Apocalypse of James", codex: "V", position: 3, translations: [
    { translator: "Schoedel (CGLP)", url: `${BASE_URL}/1ja.html` }
  ]},
  { id: "second-apocalypse-of-james", title: "The Second Apocalypse of James", codex: "V", position: 4, translations: [
    { translator: "Hedrick (CGLP)", url: `${BASE_URL}/2ja.html` }
  ]},
  { id: "apocalypse-of-adam", title: "The Apocalypse of Adam", codex: "V", position: 5, translations: [
    { translator: "Barnstone", url: `${BASE_URL}/adam-barnstone.html` },
    { translator: "MacRae (CGLP)", url: `${BASE_URL}/adam.html` }
  ]},

  // CODEX VI
  { id: "acts-of-peter-and-twelve", title: "The Acts of Peter and the Twelve Apostles", codex: "VI", position: 1, translations: [
    { translator: "Parrott & Wilson (CGLP)", url: `${BASE_URL}/actp.html` }
  ]},
  { id: "thunder-perfect-mind", title: "The Thunder, Perfect Mind", codex: "VI", position: 2, translations: [
    { translator: "Barnstone", url: `${BASE_URL}/thunder-barnstone.html` },
    { translator: "MacRae (CGLP)", url: `${BASE_URL}/thunder.html` }
  ]},
  { id: "authoritative-teaching", title: "Authoritative Teaching", codex: "VI", position: 3, translations: [
    { translator: "MacRae (CGLP)", url: `${BASE_URL}/autho.html` }
  ]},
  { id: "concept-of-our-great-power", title: "The Concept of Our Great Power", codex: "VI", position: 4, translations: [
    { translator: "Wisse (CGLP)", url: `${BASE_URL}/cgp.html` }
  ]},
  { id: "discourse-on-eighth-and-ninth", title: "The Discourse on the Eighth and Ninth", codex: "VI", position: 6, translations: [
    { translator: "Meyer", url: `${BASE_URL}/discourse-meyer.html` },
    { translator: "Brashler, Dirkse & Parrott (CGLP)", url: `${BASE_URL}/discorse.html` }
  ]},
  { id: "prayer-of-thanksgiving", title: "The Prayer of Thanksgiving", codex: "VI", position: 7, translations: [
    { translator: "Brashler, Dirkse & Parrott (CGLP)", url: `${BASE_URL}/pray-thanks.html` }
  ]},

  // CODEX VII
  { id: "paraphrase-of-shem", title: "The Paraphrase of Shem", codex: "VII", position: 1, translations: [
    { translator: "Barnstone", url: `${BASE_URL}/para_shem-barnstone.html` },
    { translator: "Wisse (CGLP)", url: `${BASE_URL}/para_shem.html` }
  ]},
  { id: "second-treatise-of-great-seth", title: "The Second Treatise of the Great Seth", codex: "VII", position: 2, translations: [
    { translator: "Barnstone", url: `${BASE_URL}/2seth-barnstone.html` },
    { translator: "Bullard & Gibbons (CGLP)", url: `${BASE_URL}/2seth.html` }
  ]},
  { id: "apocalypse-of-peter", title: "The Apocalypse of Peter", codex: "VII", position: 3, translations: [
    { translator: "Brashler & Bullard (CGLP)", url: `${BASE_URL}/apopet.html` }
  ]},
  { id: "teachings-of-silvanus", title: "The Teachings of Silvanus", codex: "VII", position: 4, translations: [
    { translator: "Peel & Zandee (CGLP)", url: `${BASE_URL}/silvanus.html` }
  ]},
  { id: "three-steles-of-seth", title: "The Three Steles of Seth", codex: "VII", position: 5, translations: [
    { translator: "Meyer & Barnstone", url: `${BASE_URL}/steles-barnstone.html` },
    { translator: "Robinson (CGLP)", url: `${BASE_URL}/steles.html` }
  ]},

  // CODEX VIII
  { id: "zostrianos", title: "Zostrianos", codex: "VIII", position: 1, translations: [
    { translator: "Sieber (CGLP)", url: `${BASE_URL}/zostrian.html` }
  ]},
  { id: "letter-of-peter-to-philip", title: "The Letter of Peter to Philip", codex: "VIII", position: 2, translations: [
    { translator: "Meyer", url: `${BASE_URL}/letpet-meyer.html` },
    { translator: "Wisse (CGLP)", url: `${BASE_URL}/letpet.html` }
  ]},

  // CODEX IX
  { id: "melchizedek", title: "Melchizedek", codex: "IX", position: 1, translations: [
    { translator: "Giversen & Pearson (CGLP)", url: `${BASE_URL}/melchiz.html` }
  ]},
  { id: "thought-of-norea", title: "The Thought of Norea", codex: "IX", position: 2, translations: [
    { translator: "Giversen & Pearson (CGLP)", url: `${BASE_URL}/nore.html` }
  ]},
  { id: "testimony-of-truth", title: "The Testimony of Truth", codex: "IX", position: 3, translations: [
    { translator: "Giversen & Pearson (CGLP)", url: `${BASE_URL}/testruth.html` }
  ]},

  // CODEX XI
  { id: "interpretation-of-knowledge", title: "The Interpretation of Knowledge", codex: "XI", position: 1, translations: [
    { translator: "Turner (CGLP)", url: `${BASE_URL}/interp.html` }
  ]},
  { id: "allogenes", title: "Allogenes — The Foreigner", codex: "XI", position: 3, translations: [
    { translator: "Turner & Wintermute (CGLP)", url: `${BASE_URL}/allogene.html` }
  ]},

  // CODEX XIII
  { id: "trimorphic-protennoia", title: "Trimorphic Protennoia", codex: "XIII", position: 1, translations: [
    { translator: "Barnstone", url: `${BASE_URL}/trimorph-barnstone.html` },
    { translator: "Turner (CGLP)", url: `${BASE_URL}/trimorph.html` }
  ]},
];

async function fetchTextContent(url) {
  const res = await fetch(url, {
    headers: {
      "User-Agent": "Mozilla/5.0 (compatible; NagHammadiAPI/1.0)",
      Accept: "text/html"
    }
  });

  if (!res.ok) throw new Error(`Failed to fetch ${url}: ${res.status}`);

  const html = await res.text();
  const $ = cheerio.load(html);

  $("script, style, img, nav").remove();

  let text = $("body").text();

  const dividerIndex = text.indexOf("_____");
  if (dividerIndex !== -1) {
    text = text.slice(dividerIndex).replace(/^[_\s]+/, "");
  }

  return text
    .replace(/[ \t]+/g, " ")
    .replace(/\n[ \t]+/g, "\n")
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

app.get("/", (req, res) => {
  res.json({
    name: "Nag Hammadi Library REST API",
    endpoints: {
      "GET /texts": "List all texts (?codex=II, ?search=thomas)",
      "GET /texts/:id": "Get text metadata",
      "GET /texts/:id/read": "Read full text (?translator=Meyer)",
      "GET /codices": "List all codices",
      "GET /codices/:codex": "Texts in a codex"
    }
  });
});

app.get("/texts", (req, res) => {
  let results = TEXTS;
  if (req.query.codex) {
    results = results.filter(t => t.codex.toLowerCase() === req.query.codex.toLowerCase());
  }
  if (req.query.search) {
    results = results.filter(t => t.title.toLowerCase().includes(req.query.search.toLowerCase()));
  }
  res.json(results.map(({ id, title, codex, position, translations }) => ({
    id, title, codex, position,
    translationCount: translations.length,
    translators: translations.map(t => t.translator),
    links: { self: `/texts/${id}`, read: `/texts/${id}/read` }
  })));
});

app.get("/texts/:id", (req, res) => {
  const text = TEXTS.find(t => t.id === req.params.id);
  if (!text) return res.status(404).json({ error: "Text not found" });
  res.json({ ...text, links: { read: `/texts/${text.id}/read` } });
});

app.get("/texts/:id/read", async (req, res) => {
  const text = TEXTS.find(t => t.id === req.params.id);
  if (!text) return res.status(404).json({ error: "Text not found" });

  let translation = text.translations[0];
  if (req.query.translator) {
    const match = text.translations.find(t =>
      t.translator.toLowerCase().includes(req.query.translator.toLowerCase())
    );
    if (match) translation = match;
  }

  try {
    const content = await fetchTextContent(translation.url);
    res.json({ id: text.id, title: text.title, codex: text.codex, translator: translation.translator, sourceUrl: translation.url, content });
  } catch (err) {
    res.status(502).json({ error: "Failed to fetch content", details: err.message });
  }
});

app.get("/codices", (req, res) => {
  const order = ["I","II","III","IV","V","VI","VII","VIII","IX","X","XI","XII","XIII"];
  const map = {};
  for (const t of TEXTS) {
    if (!map[t.codex]) map[t.codex] = [];
    map[t.codex].push({ id: t.id, title: t.title, position: t.position });
  }
  const codices = Object.entries(map)
    .sort(([a], [b]) => order.indexOf(a) - order.indexOf(b))
    .map(([codex, texts]) => ({ codex, textCount: texts.length, texts }));
  res.json({ count: codices.length, codices });
});

app.get("/codices/:codex", (req, res) => {
  const codex = req.params.codex.toUpperCase();
  const texts = TEXTS.filter(t => t.codex === codex);
  if (!texts.length) return res.status(404).json({ error: "Codex not found" });
  res.json({ codex, textCount: texts.length, texts: texts.sort((a, b) => a.position - b.position) });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`\n🏺 Nag Hammadi API → http://localhost:${PORT}`);
  console.log(`📖 Example: http://localhost:${PORT}/texts/gospel-of-thomas/read\n`);
});