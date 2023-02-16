import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Register from "./pages/Register";
import Error from "./pages/Error";
function App() {
  return (
    <Router>
      <Switch>
        <Route path="/register" exact>
          <Register />
        </Route>
        <Route path="/*" exact>
          <Error />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
