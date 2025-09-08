import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
const companies = [
    { id: "1", name: "Company One", category: "Finance", start: 1981, end: 2004 },
    { id: "2", name: "Company Two", category: "Retail", start: 1992, end: 2008 },
    { id: "3", name: "Company Three", category: "Auto", start: 1999, end: 2007 },
    { id: "4", name: "Company Four", category: "Retail", start: 1989, end: 2010 },
    { id: "5", name: "Company Five", category: "Technology", start: 2009, end: 2014 },
    { id: "6", name: "Company Six", category: "Finance", start: 1987, end: 2010 },
    { id: "7", name: "Company Eight", category: "Technology", start: 2011, end: 2016 },
    { id: "8", name: "Company Seven", category: "Auto", start: 1986, end: 1996 },
    { id: "9", name: "Company Nine", category: "Retail", start: 1981, end: 1989 }
];
function CompanyList() {
    return (
        <ul>
            {companies.map((company) => (
                <li key={company.id}>
                    <Link to={`/company/${company.id}`}>{company.name}</Link>
                </li>
            ))}
        </ul>
    );
}
const Home = () => {
    return <h2>Home Page</h2>
};
function CompanyDetail() {
    const { companyId } = useParams();
    const company = companies.find((c) => c.id === companyId);
    return (
        <div>
            {company ? (
                <>
                <h1>{company.name}</h1>
                <h1>Category: {company.category}</h1>
                <h1>Start Year: {company.start}</h1>
                <h1>End Year: {company.end}</h1>
                </>
            ) : (
                <p>Company not found</p>
            )}
        </div>
    );
}
function DemoRouterId(){
    return (
        <Router>
            <nav>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/companies">Companies</Link>
                    </li>
                </ul>
            </nav>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/companies" element={<CompanyList />} />
                <Route path="/company/:companyId" element={<CompanyDetail />} />
            </Routes>
        </Router>
    );
}
export default DemoRouterId;