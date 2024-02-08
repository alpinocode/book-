import {BrowserRouter, Route, Switch} from "react-router-dom"
import Login from "./components/Login";
import Register from "./components/Register";
import Navbar from "./components/Navbar";
import Dasboard from "./components/Dashbord";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Login/>
        </Route>
        <Route  path="/register">
          <Register/>
        </Route>
        <Route path= "/dashboard">
          <Navbar/>
          <Dasboard/>
        </Route>
      </Switch>             
    </BrowserRouter>
  );
}

export default App;
