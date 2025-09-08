import logo from './logo.svg';
import './App.css';
import { Provider } from 'react-redux';

import CompaniesList from './Components/Redux_with_Server/CompaniesList';
import store from './Components/Redux_with_Server/store_companies';

/*
import CompaniesList from './Components/Redux/CompaniesList';
import store from './Components/Redux/store_companies';*/
function App() {  
      return (
        <Provider store =  {store} >
          <CompaniesList />
        </Provider>             
              
      );
    };
 

export default App;
