import './App.css';
import React from 'react';
import Hello from './Components/Hello';
import UserWithMessage from './Components/HigerOrderComponent';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Carousel from 'react-bootstrap/Carousel';
import Dropdown from 'react-bootstrap/Dropdown';
import DemoRenderSimpleData from './Components/DemoRenderSimpleCompany';
import DemoUseContext from './Components/DemoUseContext';
import DemoNoContext from './Components/DemoNoContext';

import ChangeBackground from './Components/ChangeBackground';
import CounterReducer from './Components/DemoReducer';
import CompanyReducer from './Components/DemoReducerCompany';
import DemoRouter from './Components/DemoRouter';
import DemoRouterId from './Components/DemoRouterId';
import User from './Components/21a-User';
import DemoLazyComponent from './Components/DemoLazy';
import { Provider } from 'react-redux';
import CompaniesList from './Redux/CompaniesList';
import store from './Redux/store_companies';
import ApplicantReducer from './Components/Lab3/ReducerApplicants';

function App() {
  // return (
  //   <>
  //     <Hello name="nauQ" age="20" />
  //     <Hello favcol="Yellow" />

  //     <UserWithMessage name="John Doe" />


  //     {/* Buttons */}
  //     <div>
  //       <Button variant="primary" size='lg'>Primary</Button>{' '}
  //       <Button variant="secondary" size='sm'>Secondary</Button>{' '}
  //     </div>
  //     <div className='mb-4'>
  //       <Button variant="danger" size='sm'>Danger</Button>{' '}
  //       <Button variant="success" size='lg'>Success</Button>{' '}
  //     </div>

  //     <Button variant="warning">Warning</Button>{' '}
  //     <Button variant="info">Info</Button>{' '}
  //     <Button variant="light">Light</Button>{' '}
  //     <Button variant="dark">Dark</Button>
  //     <Button variant="link">Link</Button>

  //     {/* Dropdown */}
  //     <div className='col-4'>
  //       <Dropdown>
  //         <Dropdown.Toggle variant="info" id="dropdown-basic">
  //           Dropdown Button
  //         </Dropdown.Toggle>

  //         <Dropdown.Menu>
  //           <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
  //           <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
  //           <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
  //         </Dropdown.Menu>
  //       </Dropdown>
  //     </div>

  //     {/* Carousels */}
  //     <div div style={{ display: 'block', width: 700, padding: 30 }
  //     }>
  //       <h4>React-Bootstrap Carousel Component</h4>
  //       <Carousel>
  //         <Carousel.Item interval={1500}>
  //           <img
  //             className="d-block w-100"
  //             src="https://media.geeksforgeeks.org/wp-content/uploads/20210425122739/2-300x115.png"
  //             alt="Image One"
  //           />
  //           <Carousel.Caption>
  //             <h3>Label for first slide</h3>
  //             <p>Sample Text for Image One</p>
  //           </Carousel.Caption>
  //         </Carousel.Item>
  //         <Carousel.Item interval={500}>
  //           <img
  //             className="d-block w-100"
  //             src="https://media.geeksforgeeks.org/wp-content/uploads/20210425122716/1-300x115.png"
  //             alt="Image Two"
  //           />
  //           <Carousel.Caption>
  //             <h3>Label for second slide</h3>
  //             <p>Sample Text for Image Two</p>
  //           </Carousel.Caption>
  //         </Carousel.Item>
  //       </Carousel>
  //     </div>

  //     {/* Render Simple Data */}
  //     <div>
  //       <h1>Demo Render Simple Data</h1>
  //       <DemoRenderSimpleData />
  //     </div>
  //   </>
  // );
  // return (
  //   <div>
  //     <DemoUseContext name = "Mery"/>
  //   </div>
  // )

  // return (
  //   <div>
  //     <ChangeBackground />
  //   </div>
  // );

  // return (
  //   <div>
  //     <CounterReducer />
  //   </div>
  // )

  // return (
  //   <div>
  //     <CompanyReducer />
  //   </div>
  // )
  // return (
  //   <div>
  //     <DemoRouterId />
  //   </div>
  // )

  // return (
  //   <div>
  //     <User />
  //   </div>
  // )
  // return (
  //   <div>
  //     <DemoLazyComponent />
  //   </div>
  // )

  // Redux
  // return (
  //   <Provider store={store}>
  //     <CompaniesList />
  //   </Provider>
  // );

  // lab 3
  return (
    <ApplicantReducer/>
  )
};

export default App;