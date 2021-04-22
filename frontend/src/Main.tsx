import React from "react";
import "./styles/Main.scss";
//import useState from "react";

function Main() {
  //const [Link, setLink] = React.useState({});

  async function createLink() {
    await fetch("/api/test", {
      method: "GET",
    })
      .then((result) => result.text)
      .then((result) => console.log(result));
    //console.log(Link);
  }
  /* function test() {
    console.log("success"); */

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
          <input type="submit" value="Kürzen" onClick={createLink} />
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
      <form action="../../api/post" method="post" className="form">
        <button type="submit">Connected?</button>
      </form>
    </div>
  );
}

export default Main;
