import React from "react";
import "./App.scss";

function App() {
  return (
    <div className="App">
      <html>
        <body>
          <header>
            <a href="/">
              <img
                src="/assets/uni_head_official-colorinverted.svg"
                alt="Goethe-Universität Frankfurt am Main"
              />
            </a>
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
      </html>
    </div>
  );
}

export default App;
