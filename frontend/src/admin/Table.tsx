import React, { useState } from "react";
import moment from "moment-timezone";

export default function Table() {
  const [search, setSearch] = useState<string>("");
  const [objects, setObjects] = useState<
    Array<{ keyword: string; url: string; timestamp: string }>
  >([]);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    fetch(
      "/api/admin?" +
        new URLSearchParams({
          search: search,
        }),
      {
        method: "GET",
      }
    )
      .then((response) => response.json())
      .then(setObjects);
  }


  const sorted_objects = objects;

  return (
    <React.Fragment>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Suchbegriff..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <input type="submit" value="suchen" />
      </form>
      <table>
        <tbody>
          <tr>
            <th>Actions</th>
            <th>Short Link</th>
            <th>Long Ling</th>
            <th>Created/Changed At</th>
          </tr>
          {sorted_objects.map((elem) => (
            <tr key={elem.keyword}>
              <td>{elem.keyword}</td>
              <td>{elem.url}</td>
              <td>
                {moment
                  .tz(elem.timestamp, "Etc/UTC")
                  .tz("Europe/Berlin")
                  .format("HH:mm:ss")}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </React.Fragment>
  );
}
