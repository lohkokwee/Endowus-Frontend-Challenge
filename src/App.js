import './App.css';
import Details from './features/details';
import Inputs from './features/inputs';
import Graph from './features/graph'
import { store } from './app/store'
import { Provider } from 'react-redux'

function App() {
  return (
    <Provider store={store}>
      <div className="App m-5">
        <Details></Details>
        <Inputs></Inputs>
        <Graph></Graph>
      </div>
    </Provider>
  );
}

export default App;
