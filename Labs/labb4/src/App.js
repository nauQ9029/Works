import logo from './logo.svg';
import './App.css';
import { Provider } from 'react-redux';
import store from './redux/store';
import View from './component/view';

function App() {
  return (
    <div >
     <Provider store={store}>
      <View></View>
     </Provider>
    </div>
  );
}

export default App;
