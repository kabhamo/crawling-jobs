const Jobs = require("../model/Jobs.mongo");

//const saveData = async (title, link, location, idJob, companyName) => {
//   // 1) Trim and normalize
//  title    = (title    || '').trim();
//  location = (location || '').trim();

//  // 2) If either is empty, bail out early:
//  if (!title || !location) {
//    console.warn(
//      `[saveData] skipping invalid job — title or location missing`,
//      { title, location, idJob, companyName }
//    );
//    return;
//  }

//  const found = await Jobs.findOne({ idJob: idJob });
//  if (!found) {
//    try {
//      const job = new Jobs({
//        title: title,
//        link: link,
//        location: location,
//        idJob: idJob,
//        companyName: companyName,
//      });
//      await job.save();
//      console.log(job);
//    } catch (e) {
//      console.log(e);
//    }
//  } else {
//    console.log(`${title} ***** is already in the data with id ***** ${idJob}`);
//  }
//};


// controllers/jobs.js :contentReference[oaicite:0]{index=0}
const saveData = async (title, link, location, idJob, companyName) => {
  try {
    const result = await Jobs.findOneAndUpdate(
      { idJob },
      { $setOnInsert: { title, link, location, companyName, createdAt: new Date() } },
      { upsert: true, new: false }
    );
    if (!result) {
      console.log(`✔ saved job: ${title}@${location}`);
    } else {
      console.log(`↺ already exists: ${idJob}${title}@${location}`);
    }
  } catch (err) {
    console.error(`[saveData] error saving ${idJob}:`, err);
  }
};

const getAllJobs = async (req, res) => {
  const jobs = await Jobs.find({}).sort({ createdAt: "desc" }).lean();
  res.status(200).json({ jobs, count: jobs.length });
};

const getJobByCompany = async (req, res) => {
  const {
    params: { companyName: companyName },
  } = req;

  const job = await Jobs.find({
    companyName: companyName,
  });
  if (!job) {
    res.status(404).json({});
  }
  res.status(200).json({ job, count: job.length });
};

module.exports = {
  saveData,
  getAllJobs,
  getJobByCompany,
};
