import React from "react";
import "./styles/Main.scss";
//import useState from "react";

function Main() {
  const [Link, setLink] = React.useState("");
  const [Keyword, setKeyword] = React.useState("");
  const [Success, setSucces] = React.useState(false);

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
        if (!response.error) {
          setSucces(true);
          setKeyword(response.keyword);
        } else if (response.error === "the url is not valid") {
          alert("Die URL ist nicht gültig");
        } else if (response.error === "keyword already exists") {
          alert("Das Kürzel ist bereits vergeben");
        } else if (response.error === "the keyword is not valid") {
          alert(
            "Ungültiges Kürzel. Das Kürzel darf nur A-Z, a-z, 0-9 und - enthalten"
          );
        }
      });
  }

  return (
    <div id="main">
      <h2 className="home_title">Erstelle einen Goethe-Universität-Kurzlink</h2>
      <div className="home_form">
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
      {Success ? (
        <div className="shortlink">
          {window.location.href}
          {Keyword}
        </div>
      ) : null}
    </div>
  );
}

export default Main;
