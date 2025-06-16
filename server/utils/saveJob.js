// utils/saveJob.js
const { saveData } = require("../controllers/jobs");
const { isInIsrael } = require("./filter");

// config.js (or at top of each crawler file)
const RD_TITLES = [
  // Core SW engineering
  "software engineer",
  "software developer",
  "backend engineer",
  "backend developer",
  "frontend engineer",
  "front end engineer",
  "front-end engineer",
  "frontend developer",
  "full stack engineer",
  "full stack developer",

  // DevOps, infra & reliability
  "devops engineer",
  "site reliability engineer",
  "sre engineer",
  "cloud engineer",
  "infrastructure engineer",
  "platform engineer",
  "build engineer",
  "release engineer",
  "integration engineer",

  // QA & testing
  "quality assurance engineer",
  "qa engineer",
  "test engineer",
  "automation engineer",
  "test automation engineer",

  // Data & AI
  "data engineer",
  "data scientist",
  "machine learning engineer",
  "ml engineer",
  "ai engineer",
  "big data engineer",
  "analytics engineer",

  // Research & algorithms
  "research engineer",
  "research scientist",
  "algorithm engineer",
  "algorithm scientist",

  // Embedded, firmware & specialized
  "embedded engineer",
  "firmware engineer",
  "graphics engineer",
  "performance engineer",
  "security engineer",
  "mobile engineer",
  "android engineer",
  "ios engineer",
  "computer vision engineer",
  "nlp engineer",
  "natural language processing engineer",
];


async function processJob({ title, link, location, country, city, idJob, companyName }) {
    title    = (title    || "").trim();
    location = (location || "").trim();
    if (!title || !location) {
        console.warn(
            `[saveData] skipping invalid job — title or location missing`,
            { title, location, idJob, companyName }
        );
        return;
    }
    if (!RD_TITLES.some(r => title.toLowerCase().includes(r))) {
        return;
    }                   // drop invalid
    if (!isInIsrael(location, country, city)) return;  // drop non-Israel
    await saveData(title, link, location, idJob, companyName);
}
module.exports = { processJob };
