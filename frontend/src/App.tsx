import React from "react";
import "./App.scss";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import Impressum from "./Impressum";
import Datapolicy from "./Datapolicy";
import AGB from "./Agb";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <body>
          <header>
            <a href="/">{/* backgroundimage appears */}</a>
            <div className="title">Kurzlink-Service</div>
          </header>
          <div id="main">
            <h2 className="home_title">
              Erstelle einen Goethe-Universität-Kurzlink
            </h2>

            <form className="home_form">
              <div className="home_url flex-row">
                <input
                  type="text"
                  name="url"
                  placeholder="http://etwas.uni-frankfurt.de/..."
                  required
                />
                <input type="submit" value="Kürzen" />
              </div>
              <div className="home_optional_keyword flex-column">
                <strong>
                  Optional kannst du statt des Zufallkürzels ein eigenes
                  vergeben:
                </strong>

                <div className="flex-row">
                  <label id="current_page_url">{window.location.href}</label>
                  <input
                    type="text"
                    name="keyword"
                    placeholder="Optionales Kürzel"
                  />
                </div>
              </div>
            </form>
          </div>
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
        <Route path="/agb" exact component={AGB} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
