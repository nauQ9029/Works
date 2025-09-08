let jobs = [
  {
    jobId: "101",
    title: "Frontend Developer",
    company: "Innovative Web Solutions",
    location: "San Francisco, CA",
    description:
      "Develop user-friendly web applications using modern frameworks.",
    requirements: [
      "Experience with React or Angular",
      "Proficiency in JavaScript, HTML, and CSS",
      "Familiarity with RESTful APIs",
    ],
    salary: { currency: "USD", amount: 85000 },
    employmentType: "Full-Time",
    postedDate: "2024-10-12",
    applicationDeadline: "2024-11-15",
  },
  {
    jobId: "102",
    title: "Backend Developer",
    company: "DataCorp",
    location: "Remote",
    description: "Design and maintain backend systems and services.",
    requirements: [
      "Experience with Node.js or Python",
      "Knowledge of SQL and NoSQL databases",
      "Familiarity with cloud services (AWS, Azure)",
    ],
    salary: { currency: "USD", amount: 95000 },
    employmentType: "Full-Time",
    postedDate: "2024-10-10",
    applicationDeadline: "2024-12-01",
  },
  {
    jobId: "103",
    title: "Mobile App Developer",
    company: "AppGenie",
    location: "Austin, TX",
    description: "Develop cross-platform mobile applications using Flutter.",
    requirements: [
      "Experience in mobile app development",
      "Proficiency in Flutter and Dart",
      "Familiarity with REST APIs and third-party libraries",
    ],
    salary: { currency: "USD", amount: 78000 },
    employmentType: "Full-Time",
    postedDate: "2024-09-30",
    applicationDeadline: "2024-11-01",
  },
  {
    jobId: "104",
    title: "Data Scientist",
    company: "AI Insights",
    location: "New York, NY",
    description:
      "Analyze and interpret complex data to drive business decisions.",
    requirements: [
      "Strong background in data analysis and statistics",
      "Experience with Python or R",
      "Knowledge of machine learning algorithms and tools",
    ],
    salary: { currency: "USD", amount: 120000 },
    employmentType: "Full-Time",
    postedDate: "2024-09-25",
    applicationDeadline: "2024-10-30",
  },
  {
    jobId: "105",
    title: "UX/UI Designer",
    company: "Creative Designs Studio",
    location: "Los Angeles, CA",
    description:
      "Design user interfaces and enhance user experiences for digital products.",
    requirements: [
      "Proficiency in design tools like Figma, Sketch, or Adobe XD",
      "Strong portfolio of previous UI/UX design work",
      "Experience in creating wireframes, prototypes, and high-fidelity designs",
    ],
    salary: { currency: "USD", amount: 70000 },
    employmentType: "Full-Time",
    postedDate: "2024-10-05",
    applicationDeadline: "2024-11-10",
  },
];

module.exports = {
  getJobs: () => jobs,
  setJobs: (newJobs) => (jobs = newJobs),
};
