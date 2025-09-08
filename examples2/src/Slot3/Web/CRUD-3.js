let companies = [
  { id: 1, name: "Company One", category: "Finance", start: 1981, end: 2004 },
  { id: 2, name: "Company Two", category: "Retail", start: 1992, end: 2008 },
  { id: 3, name: "Company Three", category: "Auto", start: 1999, end: 2007 },
  { id: 4, name: "Company Four", category: "Retail", start: 1989, end: 2010 },
  {
    id: 5,
    name: "Company Five",
    category: "Technology",
    start: 2009,
    end: 2014,
  },
  { id: 6, name: "Company Six", category: "Finance", start: 1987, end: 2010 },
  { id: 7, name: "Company Seven", category: "Auto", start: 1986, end: 1996 },
  {
    id: 8,
    name: "Company Eight",
    category: "Technology",
    start: 2011,
    end: 2016,
  },
  { id: 9, name: "Company Nine", category: "Retail", start: 1981, end: 1989 },
];

// Read all companies' only name (map)
const cName = companies.map((company) => `Company name: ${company.name}`);
console.log(cName);

// Read all companies' details that are after 1988 (filter)
const cAfter88 = companies.filter((company) => company.start > 1988);
console.log("Company name more than 1988:\n", cAfter88);

// Add new company (create - push)
const newC = {
  id: 10,
  name: "Company Ten",
  category: "Finance",
  start: 1981,
  end: 2004,
};
companies.push(newC);
console.log(
  `Add new company {id :${newC.id} , name: ${newC.name}, category: ${newC.category}, start: ${newC.start}, end: ${newC.end}}:\n`,
  companies
);

// Update company with id = 5 (update - map)
const idToUpdate = 5;
const cNewData = {
  name: "Updated Company Five",
  end: 2022,
};

companies = companies.map((company) => {
  if (company.id === idToUpdate) {
    return { ...company, ...cNewData };
  }
  return company;
});
console.log(`updating company with id ${idToUpdate}:`, cNewData);
console.log(companies);

// Remove company with id = 3 (delete - filter)
const idToRemove = 3;
companies = companies.filter((company) => company.id !== idToRemove);
console.log(`deleting company with id ${idToRemove}:\n`, companies);
