import React, { useReducer } from "react";

const initialState = {
  applicants: [
    {
      id: 1, 
      firstName: "John", 
      lastName: "Doe", 
      email: "john.doe@example.com", 
      phone: "+1234567890", 
      address: {
        street: "123 Main St", 
        city: "Anytown", 
        state: "CA", 
        zipCode: "12345"
      },
      education: [
        { 
          degree: "B.Sc. Computer Science", 
          institution: "University of Example", 
          yearOfGraduation: 2020 
        }
      ], 
      workExperience: [
        { 
          company: "Tech Solutions Inc.", 
          position: "Software Developer", 
          startDate: "2021-01-15", 
          endDate: "2023-06-30", 
          responsibilities: [
            "Developed and maintained web applications", 
            "Collaborated with cross-functional teams to define project requirements"
          ] 
        }
      ], 
      skills: [
        "JavaScript", 
        "React", 
        "Node.js", 
        "SQL"
      ],
    }, 
    { 
      id: 2, 
      firstName: "Emily", 
      lastName: "Johnson", 
      email: "emily.johnson@example.com", 
      phone: "+1234567892", 
      address: {
        street: "456 Elm St", 
        city: "Othertown", 
        state: "TX", 
        zipCode: "67890"
      }, 
      education: [
        { 
          degree: "M.Sc. Information Technology", 
          institution: "Institute of Example", 
          yearOfGraduation: 2018 
        }
      ], 
      workExperience: [
        { 
          company: "Innovative Solutions Ltd.", 
          position: "IT Consultant", 
          startDate: "2019-03-01", 
          endDate: "2022-12-31", 
          responsibilities: [
            "Provided IT consulting services to clients", 
            "Implemented software solutions and managed projects"
          ] 
        }
      ], 
      skills: [
        "Python", 
        "Django", 
        "Machine Learning", 
        "Project Management"
      ], 
    }
  ]
};

// Define the reducer function for applicants
function applicantReducer(state, action) {
  switch (action.type) {
    case 'add':
      const newApplicant = {
        id: state.applicants.length + 1,
        firstName: "John",
        lastName: "Weak",
        email: "abc@gmail.com",
        phone: "1234567890",
        address: {
          street: "82 Phan Dang Luu",
          city: "Hue",
          state: "Thua Thien Hue",
          zipCode: "10010",
        },
        education: [
          {
            degree: "B.Sc. Computer Science",
            institution: "FPT University",
            yearOfGraduation: 2025,
          },
        ],
        workExperience: [
          {
            company: "Computer Science Inc.",
            position: "Computer Science Analyst",
            startDate: "2025-06-01",
            endDate: "Present",
            responsibilities: [
              "Analyzed Computer science trends",
              "Created Computer science marketing strategies",
            ],
          },
        ],
        skills: ["Java", "Ruby", "Machine Learning", "SQL"],
      };
      return { ...state, applicants: [...state.applicants, newApplicant] };

    case 'delete':
      return { ...state, applicants: state.applicants.filter(applicant => applicant.id !== action.id) };

    case 'update':
      return {
        ...state, applicants: state.applicants.map(applicant =>
          applicant.id === action.id ? { ...applicant, firstName: action.firstName, lastName: action.lastName } : applicant
        )
      };

    default:
      throw new Error("Error!!!");
  }
}

function ApplicantReducer() {
  const [state, dispatch] = useReducer(applicantReducer, initialState);

  return (
    <>
      {state.applicants.map((applicant) => (
        <div key={applicant.id}>
          <h1>{applicant.id}: {applicant.firstName} {applicant.lastName}</h1>
          <p>Email: {applicant.email}</p>
          <p>Phone: {applicant.phone}</p>
          <p>Address: {applicant.address.street}, {applicant.address.city}, {applicant.address.state}, {applicant.address.zipCode}</p>
          <h3>Education:</h3>
          {applicant.education.map((edu, index) => (
            <p key={index}>
              Degree: {edu.degree}, Institution: {edu.institution}, Year of Graduation: {edu.yearOfGraduation}
            </p>
          ))}
          <h3>Work Experience:</h3>
          {applicant.workExperience.map((work, index) => (
            <div key={index}>
              <p>Company: {work.company}</p>
              <p>Position: {work.position}</p>
              <p>Time: {work.startDate} - {work.endDate}</p>
              <p>Responsibilities:</p>
              <ul>
                {work.responsibilities.map((responsibility, i) => (
                  <li key={i}>{responsibility}</li>
                ))}
              </ul>
            </div>
          ))}

          <button onClick={() => dispatch({ type: 'delete', id: applicant.id })}>Delete</button>
          <button onClick={() => dispatch({ type: 'update', id: applicant.id, firstName: "Updated " + applicant.firstName, lastName: "Updated " + applicant.lastName })}>Update</button>
        </div>
      ))}
      <button onClick={() => dispatch({ type: 'add' })}>Add New Applicant</button>
    </>
  );
}

export default ApplicantReducer;
