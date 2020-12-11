import {BrowserRouter, Route, Switch} from "react-router-dom"
import Home from "./comps/Home"
import Login from "./comps/Login";
import Navbar from "./comps/Navbar";
import Signup from "./comps/Signup";
import {ContextProvider} from "./context/context"
import PrivateRoute from "./comps/PrivateRoute"
function App() {
  // const [value, setValue] = useState({name:"ivan", surname:"batur", age:23})
  return (
    <div>
      
        <BrowserRouter>
          <ContextProvider>
            <Navbar />
              <Switch>
              <div className="App">
                <PrivateRoute exact path="/" component={Home}/>
                <Route  path="/signup" component={Signup}/>
                <Route  path="/login" component={Login}/>
              </div>
              </Switch>
          </ContextProvider>
        </BrowserRouter>
    </div>
  );
}

export default App;
