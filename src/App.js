import {BrowserRouter, Route, Switch} from "react-router-dom"
import Home from "./comps/pages/Home"
import Login from "./comps/pages/Login";
import Navbar from "./comps/Navbar";
import Signup from "./comps/pages/Signup";
import {ContextProvider} from "./context/context"
import PrivateRoute from "./comps/PrivateRoute"
function App() {
  // const [value, setValue] = useState({name:"ivan", surname:"batur", age:23})
  return (
    <div>
      
        <BrowserRouter>
          <ContextProvider>
            <Navbar />
            <div className="App">
              <Switch>
                <PrivateRoute exact path="/" component={Home}/>
                <Route  path="/signup" component={Signup}/>
                <Route  path="/login" component={Login}/>
              </Switch>
            </div>
          </ContextProvider>
        </BrowserRouter>
    </div>
  );
}

export default App;
