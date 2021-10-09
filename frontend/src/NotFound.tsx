import "./styles/NotFound.scss";
import cuteDog from "./assets/cute_dog.png";

function NotFound() {
  return (
    <div id="notfound">
      <h1>
        Sorry, but we haven't found, what your are looking for! But instead, we
        found this!
      </h1>
      <img src={cuteDog} alt="cute Dog" />
    </div>
  );
}

export default NotFound;
