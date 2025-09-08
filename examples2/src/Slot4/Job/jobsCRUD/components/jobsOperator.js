import { getJobs, setJobs } from "../jobs";

// 1. CRUD Operations for Jobs
const createJob = (jobId, title, location, salary) => {
  const jobs = getJobs();
  jobs.push({
    jobId,
    title,
    company: "New Company",
    location,
    description: "New job description",
    requirements: ["New requirement 1", "New requirement 2"],
    salary: { currency: "VND", amount: salary },
    employmentType: "Full-Time",
    postedDate: new Date().toISOString().split("T")[0],
    applicationDeadline: new Date(
      new Date().setMonth(new Date().getMonth() + 1)
    )
      .toISOString()
      .split("T")[0],
  });
};

const readJob = (id) => getJobs().find((j) => j.jobId === id);

const updateJob = (jobId, updatedJob) => {
  const jobs = getJobs();
  const index = jobs.findIndex((j) => j.jobId === jobId);
  if (index !== -1) {
    jobs[index] = { ...jobs[index], ...updatedJob };
  }
};

const deleteJob = (jobId) => {
  const jobs = getJobs();
  const index = jobs.findIndex((j) => j.jobId === jobId);
  if (index !== -1) {
    jobs.splice(index, 1);
  }
};

// 2. Filter jobs by Full-Time or salary >= 7000 USD
const filterFullTimeGoodSalary = (jobs) => {
  return jobs.filter(
    (job) => job.employmentType === "Full-Time" && job.salary.amount >= 7000
  );
};

// 3. Find the Most Recently Posted Job
const findMostRecentJob = (jobs) => {
  return jobs.reduce((mostRecent, job) => {
    const jobDate = new Date(job.postedDate);
    const mostRecentDate = new Date(mostRecent.postedDate);
    return jobDate > mostRecentDate ? job : mostRecent;
  });
};

// 4. Find Remote Jobs (location === "Remote")
const findRemoteJobs = (jobs) => {
  return jobs.filter((job) => job.location === "Remote");
};

// 5. Find Jobs Matching a Keyword in requirements
const findJobsByKeyword = (jobs, keyword) => {
  return jobs.filter((job) =>
    job.requirements.some((req) =>
      req.toLowerCase().includes(keyword.toLowerCase())
    )
  );
};

module.exports = {
  createJob,
  readJob,
  updateJob,
  deleteJob,
  filterFullTimeGoodSalary,
  findMostRecentJob,
  findRemoteJobs,
  findJobsByKeyword,
};
