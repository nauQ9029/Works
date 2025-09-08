const companies = [
    { id: 1, name: "Company One", category: "Finance", start: 1981, end: 2004 },
    { id: 2, name: "Company Two", category: "Retail", start: 1992, end: 2008 },
    { id: 3,name: "Company Three", category: "Auto", start: 1999, end: 2007 },
    { id: 4, name: "Company Four", category: "Retail", start: 1989, end: 2010 },
    { id: 5, name: "Company Five", category: "Technology", start: 2009, end: 2014 },
    { id: 6, name: "Company Six", category: "Finance", start: 1987, end: 2010 },
    { id: 7, name: "Company Seven", category: "Auto", start: 1986, end: 1996 },
    { id: 8, name: "Company Eight", category: "Technology", start: 2011, end: 2016 },
    { id: 9, name: "Company Nine", category: "Retail", start: 1981, end: 1989 }
];

// Show all of the companies
var myCompanies = companies.map(item => {
    console.log(`ID: ${item.id}, Name: ${item.name}, Category: ${item.category}, Start: ${item.start}, End: ${item.end}`);
})

// Show companies that start after 1987
// console.log("\nCompanies that start after 1987:")
// var myFileter = companies.filter(function (company) {
//     return company.start > 1987;
// })
// console.log(myFileter);

// Create a new company and add it into the list:
// const newCompany = {id: 10, name: "Company Ten", catergory: "Education", start: 2013, end: 2030};
// const addCompany = (newCompany) => {
//     companies.push(newCompany);
// };
// console.log(addCompany);

// Update
// const updateCompany = (id, updateData) => {
//     const index = companies.findIndex(company => company.id === id);
//     if (index !== -1) {
//         companies[index] = { ...companies[index], ...updateData };
//     }
// };

// updateCompany(1, {name: "Updated Company Five", category: "Education", start: 2013, end: 2030});
// console.log(companies);
// // Delete
// const deleteCompany = (id) => {
//     const index = companies.findIndex(company => company.id === id);
//     if (index !== -1) {
//         companies.splice(index, 1);
//     }
// }