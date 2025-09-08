import "./App.css";
// import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

// import CompanyTable from "./Slot3/bootstrap-included/components/CompanyTable";

// import FruitsCards from "./Slot4/imageWithBootstrap/FruitsCards";
// import JobsTable from "./Slot4/Job/jobsCRUD/components/jobsTable";
// import chatRoomData from "./Slot4/Message/Web/message";
// import { ChatLogic, ChatRoomUI } from "./Slot4/Message/Web/ChatLogic";

// import HelloWorld from "./Slot5/components/HelloComponent";
// import Demo from "./Slot5/components/Demo";
// import Welcome from "./Slot5/components/Welcome";

// import EmployeeDashboard from "./Slot5-Lab1/empCRUD";

// import ImgCarousel from "./Slot7/Carousel";

// import DemoWithContext from "./Slot8/DemoWithContext";
// import UserProvider from "./Slot8/LoginWithContext/contexts/UserProvider";
// import Header from "./Slot8/LoginWithContext/components/Header";
// import LoginForm from "./Slot8/LoginWithContext/components/LoginForm";
// import ContentSwitcher from "./Slot8/LoginWithContext/components/ContentSwitcher";

// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Login from "./Slot9/TPE-login/components/Login";
// import React, { Suspense, lazy } from "react";
// const PatientPage = lazy(() =>
//   import("./Slot9/TPE-login/reducers/PatientPage")
// );

// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import BookPage from "./src/Slot10/LAB3/components/BookPage";
// import { BookProvider } from "./src/Slot10/LAB3/context/BookProvider";

// import CounterReducer from "./Slot8/useReducer/DemoReducer";

// import CustomThemeProvider from "./Slot11/LAB_useContext-useReducer(Theme Customization App)/context/CustomThemeProvider";
// import ThemeToggler from "./Slot11/LAB_useContext-useReducer(Theme Customization App)/components/ThemeToggler";
// import ThemeSelector from "./Slot11/LAB_useContext-useReducer(Theme Customization App)/components/ThemeSelector";
// import ThemePreview from "./Slot11/LAB_useContext-useReducer(Theme Customization App)/components/ThemePreview";

// import "bootstrap/dist/css/bootstrap.min.css";
// import React, { Suspense, lazy } from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { UserProvider } from "./context/UserContext";
// import Navbar from "./components/Navbar";

// import React, { Suspense, lazy } from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Navbar from "./Slot13/TLAB5/components/Navbar";

// const Home = lazy(() => import("./Slot13/TLAB5/components/Home"));
// const Users = lazy(() => import("./Slot13/TLAB5/components/Users"));
// const UserDetail = lazy(() => import("./Slot13/TLAB5/components/UserDetail"));
// const NotFound = lazy(() => import("./Slot13/TLAB5/components/NotFound"));

// import React from "react";
// import AddExpenseForm from "./Slot15/Lab5/components/AddExpenseForm";
// import ExpenseList from "./Slot15/Lab5/features/expenses/ExpenseList";
// import ExpenseSummary from "./Slot15/Lab5/components/ExpenseSummary";
// import { Layout, Typography } from "antd";
// const { Header, Content, Footer } = Layout;
// const { Title } = Typography;

import React from "react";
import { PetProvider } from "./Slot17/Lab6/contexts/PetContext";
import PetList from "./Slot17/Lab6/components/PetList";
import Filter from "./Slot17/Lab6/components/Filter";
import { Layout, Typography } from "antd";

const { Header, Footer, Content } = Layout;
const { Title, Text } = Typography;

function App() {
  // const [chat] = useState(new ChatLogic(chatRoomData));
  // const [messages, setMessages] = useState(chat.listMessages("asc"));
  // const [messageInput, setMessageInput] = useState("");
  // const [selectedSender, setSelectedSender] = useState(
  //   chatRoomData.participants[0] || ""
  // );

  // const sendMessage = () => {
  //   if (!messageInput.trim()) return;
  //   try {
  //     chat.sendMessage(messageInput, selectedSender);
  //     setMessages(chat.listMessages("asc"));
  //     setMessageInput("");
  //   } catch (err) {
  //     alert(err.message);
  //   }
  // };

  // const onSubmit = (e) => {
  //   e.preventDefault();
  //   sendMessage();
  // };

  // ------------------------

  // Slot 3 - Bootstrap included with CRUD-3.js
  // return (
  //   //   <div className="container mt-3">
  //   //     <h1>Company List</h1>
  //   //     <CompanyTable />
  //   //   </div>
  // );

  //  Slot 4.1 - Images in cards with bootstrap
  // return (
  //   <div className="container mt-3">
  //     <h1>Fruits</h1>
  //     <FruitsCards />
  //   </div>
  // );

  // Slot 4.2 - CRUD with jobs (array)
  // return (
  // <div className="container mt-3">
  //   <JobsTable />
  // </div>
  //);

  // Slot 4.3 - CRUD with message
  // return (
  // <ChatRoomUI
  //   chat={chat}
  //   messages={messages}
  //   messageInput={messageInput}
  //   setMessageInput={setMessageInput}
  //   selectedSender={selectedSender}
  //   setSelectedSender={setSelectedSender}
  //   onSubmit={onSubmit}
  // />
  // );

  // Slot 5.1 - Hello component - Old component structure (class comoponents - Demo.js)
  // return (
  // <div className="App">
  //   <HelloWorld name="John Weak" age={21} />
  // </div>
  // );

  // Slot 5.2 - New component structure (functional components - Welcome.js)
  // return (
  // <div>
  //   <Welcome name="functional class" />
  // </div>
  // );

  // Slot 6 - Lab 1 Render to web browser
  // return (
  // <div>
  //   <EmployeeDashboard />
  // </div>
  /// );

  // Slot 7 - React Bootstrap included (Carousel)
  // return (
  // <div>
  //   <ImgCarousel />
  //   <JobsTable />
  //   <CompanyTable />
  // </div>
  // );

  // Slot 8.1 - useContext
  // return (
  // <div>
  //   <DemoWithContext />
  // </div>
  // );

  // Slot 8.2 - Login with useContext
  // return (
  // <div>
  //   <UserProvider>
  //     <Header />
  //     <LoginForm />
  //     <div className="container mt-4">
  //       <ContentSwitcher />
  //     </div>
  //   </UserProvider>
  // </div>
  // );

  // Slot 8.3 - Count with useReducer
  // return (
  // <div>
  //   <CounterReducer />
  // </div>
  // );

  // Slot 9 - TPE-Login Patients Management
  // return (
  //   <Router>
  //     <Routes>
  //       <Route path="/" element={<Login />} />
  //       <Route
  //         path="/patients"
  //         element={
  //           <Suspense fallback={<div>Loading...</div>}>
  //             <PatientPage />
  //           </Suspense>
  //         }
  //       />
  //     </Routes>
  //   </Router>
  // );

  // // Slot 10 - LAB3
  // return (
  //   <BookProvider>
  //     <Router>
  //       <Routes>
  //         <Route path="/books" element={<BookPage />} />
  //       </Routes>
  //     </Router>
  //   </BookProvider>
  // );

  // Slot 11
  // return (
  //   <CustomThemeProvider>
  //     <div
  //       style={{ maxWidth: "500px", margin: "20px auto", textAlign: "center" }}
  //     >
  //       <h1>Theme Customization App</h1>
  //       <ThemeSelector />
  //       <ThemeToggler />
  //       <ThemePreview />
  //     </div>
  //   </CustomThemeProvider>
  // );

  // Slot 12 - TLAB4
  // return (
  //   <UserProvider>
  //     <Router>
  //       <Navbar />
  //       <Suspense fallback={<p>Loading...</p>}>
  //         <Routes>
  //           <Route path="/" element={<Home />} />
  //           <Route path="/users" element={<Users />} />
  //           <Route path="/users/:id" element={<UserDetail />} />
  //           <Route path="*" element={<NotFound />} />
  //         </Routes>
  //       </Suspense>
  //     </Router>
  //   </UserProvider>
  // );

  // Slot 13 - TLAB5
  // return (
  //   <Router>
  //     <Navbar />
  //     <Suspense fallback={<div className="container mt-3">Loading...</div>}>
  //       <Routes>
  //         <Route path="/" element={<Home />} />
  //         <Route path="/users" element={<Users />} />
  //         <Route path="/users/:id" element={<UserDetail />} />
  //         <Route path="*" element={<NotFound />} />
  //       </Routes>
  //     </Suspense>
  //   </Router>
  // );

  // Slot 15 - redux
  // return (
  //   <Layout className="layout">
  //     <Header style={{ background: "#8ba888" }}>
  //       <Title style={{ color: "#fff", margin: 0, paddingTop: 15 }} level={3}>
  //         Personal Budget Planner
  //       </Title>
  //     </Header>

  //     <Content style={{ padding: "24px 50px" }}>
  //       <AddExpenseForm />
  //       <ExpenseSummary />
  //       <ExpenseList />
  //     </Content>

  //     <Footer style={{ textAlign: "center" }}>
  //       FER202
  //     </Footer>
  //   </Layout>
  // );

  // Slot 17 - Lab 6
  return (
    <PetProvider>
      <Layout style={{ minHeight: "100vh" }}>
        <Header
          style={{ background: "#fff", padding: 20, textAlign: "center" }}
        >
          <Title level={2}>Happy Paws Center - Animal City</Title>
          <Text>123 Hai Phong Street, Danang</Text>
        </Header>

        <Content style={{ padding: "40px 80px" }}>
          <Filter />
          <PetList />
        </Content>

        <Footer style={{ textAlign: "center" }}>Happy Paws Center - Animal City</Footer>
      </Layout>
    </PetProvider>
  );
}

export default App;
