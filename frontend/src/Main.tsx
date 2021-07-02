import React from "react";
import "./styles/Main.scss";
//import useState from "react";

function Main() {
  const [Link, setLink] = React.useState("");
  const [keyword, setKeyword] = React.useState("");
  const [success, setSuccess] = React.useState(false);
  const [successKeyword, setSuccessKeyword] = React.useState("");

  async function createLink() {
    await fetch("/api/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        url: Link,
        keyword: keyword,
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        if (!response.error) {
          setSuccess(true);
          setSuccessKeyword(response.keyword);
          setKeyword(response.keyword);
        } else if (response.error === "the url is not valid") {
          alert("Die URL ist nicht gültig");
        } else if (response.error === "keyword already exists") {
          alert(
            "Das Kürzel ist bereits vergeben. Bitte wählen Sie ein anderes."
          );
        } else if (response.error === "the keyword is not valid") {
          alert(
            "Ungültiges Kürzel. Das Kürzel muss mindestens 3 Zeichen haben und darf nur A-Z, a-z, 0-9 und - enthalten."
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
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
          </div>
        </div>
      </div>
      {success ? (
        <div className="shortlink">
          {window.location.href}
          {successKeyword}
        </div>
      ) : null}
    </div>
  );
}

export default Main;
