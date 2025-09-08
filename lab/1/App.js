import "./App.css";
// import CompanyTable from "./Slot3/bootstrap-included/components/CompanyTable";

// import FruitsCards from "./Slot4/imageWithBootstrap/FruitsCards";

import JobsTable from "./Slot4/jobsCRUD/components/jobsTable";

// import HelloWorld from "./Slot5/components/HelloComponent";
// import Demo from "./Slot5/components/Demo";
// import Welcome from "./Slot5/components/Welcome";

function App() {
  return (
    // Slot 3 - Bootstrap included with CRUD-3.js
    //   <div className="container mt-3">
    //     <h1>Company List</h1>
    //     <CompanyTable />
    //   </div>

    //  Slot 4.1 - Images in cards with bootstrap
    //   <div className="container mt-3">
    //     <h1>Fruits</h1>
    //     <FruitsCards />
    //   </div>

    // Slot 4.2 - CRUD with jobs (array)
    <div className="container mt-3">
      <JobsTable />
    </div>

    // Slot 5.1 - Hello component - Old component structure (class comoponents - Demo.js)
    // <div className="App">
    //   <HelloWorld name="John Weak" age={21} />
    // </div>
    // Slot 5.2 - New component structure (functional components - Welcome.js)
    // <div>
    //   <Welcome name="functional class" />
    // </div>
  );
}

export default App;
