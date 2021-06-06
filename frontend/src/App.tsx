import "./styles/App.scss";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import Impressum from "./Impressum";
import Datapolicy from "./Datapolicy";
import Admin from "./admin/Admin";
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
            </a>
            <div className="pull-right">
              <a href="/datenschutz">Datenschutzerklärung</a>|
              <a href="/impressum">Impressum</a>|<a href="/AGB">AGB</a>|
              <a href="/admin">Admin</a>
            </div>
          </section>
        </footer>

        <div className="Content">
          <Switch>
            <Route path="/" exact component={Main} />
            <Route path="/impressum" exact component={Impressum} />
            <Route path="/datenschutz" exact component={Datapolicy} />
            <Route path="/admin" exact component={Admin} />
            <Route path="/agb" exact component={AGB} />
          </Switch>{" "}
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
