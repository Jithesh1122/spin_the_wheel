import Page2 from "./Components/Page2";
import Quiz from "./Components/quiz";
import Result from "./Components/result";
import { Switch, Route } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <Switch>
      <Route exact path="/" component={Page2} />
      <Route exact path="/quiz" component={Quiz} />
      <Route exact path="/result" component={Result} />
    </Switch>
  );
}

export default App;
