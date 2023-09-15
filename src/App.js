// import './App.css';
// import {BrowserRouter, Route, Switch} from 'react-router-dom'
// import Home from './components/Home'
// import 'bootstrap/dist/css/bootstrap.min.css';
 
// function App() {
//   return (
//     <BrowserRouter>
//     <div className="App">
//       <Switch>
//         <Route exact path = '/' component = {Home}/>
//       </Switch>
//     </div>
//     </BrowserRouter>
//   );
// }

// export default App;

import './App.css';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Home from './components/Home';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path="/peritajes" component={Home} />
          <Redirect from="/" to="/peritajes" />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;





