import "./styles/App.scss";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import Impressum from "./Impressum";
import Datapolicy from "./Datapolicy";
import AGB from "./Agb";
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
            </a>{" "}
            <div className="pull-right">
              <a href="/datenschutz">Datenschutzerklärung</a>|
              <a href="/impressum">Impressum</a>|<a href="/AGB">AGB</a>
            </div>
          </section>
        </footer>
      </div>

      <Switch>
        <Route path="/" exact component={Main} />
        <Route path="/impressum" exact component={Impressum} />
        <Route path="/datenschutz" exact component={Datapolicy} />
        <Route path="/agb" exact component={AGB} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
