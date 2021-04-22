import React from "react";
import "./Main.scss";

function Main() {
  return (
    <div id="main">
      <h2 className="home_title">Erstelle einen Goethe-Universität-Kurzlink</h2>

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
            Optional kannst du statt des Zufallkürzels ein eigenes vergeben:
          </strong>

          <div className="flex-row">
            <label id="current_page_url">{window.location.href}</label>
            <input type="text" name="keyword" placeholder="Optionales Kürzel" />
          </div>
        </div>
      </form>
    </div>
  );
}

export default Main;
