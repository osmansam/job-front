import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Register from "./pages/Register";
import Error from "./pages/Error";
import AddJob from "./pages/dashboard/AddJob";
import SingleJob from "./pages/dashboard/SingleJob";
import AllJobs from "./pages/dashboard/AllJobs";
import Profile from "./pages/dashboard/Profile";
import AppliedJobs from "./pages/dashboard/AppliedJobs";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/Navbar";
function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path="/register" exact>
          <Register />
        </Route>
        <Route path="/allJobs" exact>
          <AllJobs />
        </Route>
        <Route path="/appliedJobs" exact>
          <AppliedJobs />
        </Route>
        <Route path="/addjob" exact>
          <AddJob />
        </Route>
        <Route path="/profile" exact>
          <Profile />
        </Route>
        <Route path="/singleJob/:id" exact>
          <SingleJob />
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
