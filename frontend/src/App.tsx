import React from "react";
import "./App.scss";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import Impressum from "./Impressum";
import Datapolicy from "./Datapolicy";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <body>
          <header>
            <a href="/">{/* backgroundimage appears */}</a>
            <div className="title">Kurzlink-Service</div>
          </header>
          <div id="main"></div>
          <footer>
            <section>
              <a href="http://www.uni-frankfurt.de/">
                Die Goethe-Universität Frankfurt am Main
              </a>
              <div className="pull-right">
                <a href="/datenschutz">Datenschutzerklärung</a>|
                <a href="/impressum">Impressum</a>|<a href="/AGB">AGB</a>
              </div>
            </section>
          </footer>
        </body>
      </div>
      <Switch>
        <Route path="/impressum" exact component={Impressum} />
        <Route path="/datenschutz" exact component={Datapolicy} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
