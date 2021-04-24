import React from "react";
import "./styles/Main.scss";
//import useState from "react";

function Main() {
  const [Link, setLink] = React.useState("");
  const [Keyword, setKeyword] = React.useState("");

  async function createLink() {
    console.log("triggered");
    await fetch("/api/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        url: Link,
        key: Keyword,
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.ok) {
          console.log("worked");
        } else {
          console.log("did not work");
        }
      });
    //console.log(Link);
  }
  /* function test() {
    console.log("success"); */
  async function ConnectionTest() {
    await fetch("/api/post", {
      method: "POST",
    });
  }

  return (
    <div id="main">
      <h2 className="home_title">Erstelle einen Goethe-Universität-Kurzlink</h2>

      <div
        className="home_form"
        /*  onSubmit={() => {
          createLink();
        }} */
      >
        <div className="home_url flex-row">
          <input
            type="text"
            name="url"
            placeholder="http://etwas.uni-frankfurt.de/..."
            required
            value={Link}
            onChange={(e) => setLink(e.target.value)}
          />
          <input value="Kürzen" onClick={createLink} type="submit" />
        </div>
        <div className="home_optional_keyword flex-column">
          <strong>
            Optional kannst du statt des Zufallkürzels ein eigenes vergeben:
          </strong>

          <div className="flex-row">
            <label id="current_page_url">{window.location.href}</label>
            <input
              type="text"
              name="keyword"
              placeholder="Optionales Kürzel"
              value={Keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
          </div>
        </div>
      </div>
      <form
        /* action="../../api/post" method="post" */
        className="form"
      >
        <button onClick={ConnectionTest} type="submit">
          Connected?
        </button>
      </form>
    </div>
  );
}

export default Main;
