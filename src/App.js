import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Register from "./pages/Register";
import Error from "./pages/Error";
import AddJob from "./pages/dashboard/AddJob";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  return (
    <Router>
      <Switch>
        <Route path="/register" exact>
          <Register />
        </Route>
        <Route path="/addjob" exact>
          <AddJob />
        </Route>
        <Route path="/*" exact>
          <Error />
        </Route>
      </Switch>
      <ToastContainer position="top-center" />
    </Router>
  );
}

export default App;
