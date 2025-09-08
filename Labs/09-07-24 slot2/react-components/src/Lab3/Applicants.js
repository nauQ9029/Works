const initialState = [
    {
        id: 1, firstName: "John", lastName: "Doe", email: "john.doe@example.com", phone: "+1234567890",
        address: {
            street: "123 Main St", city: "Anytown", state: "CA", zipCode: "12345",
        },
        education: [
            {
                degree: "B.Sc. Computer Science", institution: "University of Example", yearOfGraduation: 2020,
            },
        ],
        workExperience: [
            {
                company: "Tech Solutions Inc.", position: "Software Developer", startDate: "2021-01-15", endDate: "2023-06-30",
                responsibilities: [
                    "Developed and maintained web applications", "Collaborated with cross-functional teams to define project requirements",
                ],
            },
        ],
        skills: ["JavaScript", "React", "Node.js", "SQL"],
    },
    {
        id: 2, firstName: "Emily", lastName: "Johnson", email: "emily.johnson@example.com", phone: "+1234567892",
        address: {
            street: "456 Elm St", city: "Othertown", state: "TX", zipCode: "67890",
        },
        education: [
            {
                degree: "M.Sc. Information Technology", institution: "Institute of Example", yearOfGraduation: 2018,
            },
        ],
        workExperience: [
            {
                company: "Innovative Solutions Ltd.", position: "IT Consultant", startDate: "2019-03-01", endDate: "2022-12-31",
                responsibilities: [
                    "Provided IT consulting services to clients",
                    "Implemented software solutions and managed projects",
                ],
            },
        ],
        skills: ["Python", "Django", "Machine Learning", "Project Management"],
    },
];
