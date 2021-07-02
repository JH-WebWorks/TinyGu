import React from "react";
import "./styles/Main.scss";

function Main() {
  const [Link, setLink] = React.useState("");
  const [Keyword, setKeyword] = React.useState("");
  const [Success, setSuccess] = React.useState(false);
  const [succeededKeyword, setSucceededKeyword] = React.useState("");

  async function createLink() {
    await fetch("/api/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        url: Link,
        keyword: Keyword,
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        if (!response.error) {
          setSuccess(true);
          setSucceededKeyword(response.keyword);
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

  function showshortlink(Success: boolean, succeededKeyword: string) {
    if (Success === true) {
      return (
        <div className="shortlink">
          {window.location.href}
          {succeededKeyword}
        </div>
      );
    }
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

      {showshortlink(Success, succeededKeyword)}
    </div>
  );
}

export default Main;
