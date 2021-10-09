import "./styles/App.scss";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import Admin from "./admin/Admin";
import Main from "./Main";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <header>
          <a href="/">{/* backgroundimage appears */}</a>
          <div className="title">Kurzlink-Service</div>
        </header>
        <footer>
          <section>
            <a href="http://www.uni-frankfurt.de/">
              Die Goethe-Universität Frankfurt am Main
            </a>
            <div className="pull-right">
              <a href="https://www.uni-frankfurt.de/70876599/Datenschutzerkl%C3%A4rung">
                Datenschutzerklärung
              </a>
              |<a href="https://www.uni-frankfurt.de/impressum">Impressum</a>
            </div>
          </section>
        </footer>

        <div className="Content">
          <Switch>
            <Route path="/" exact component={Main} />
            <Route path="/admin" exact component={Admin} />
          </Switch>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
