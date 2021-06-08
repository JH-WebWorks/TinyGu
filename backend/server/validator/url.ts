import urlParser from "url";
import { allowedUrls } from "../../config.json";

function getDomain(url: string) {
  const parsedURL = urlParser.parse(url).host;

  if (parsedURL === null) {
    throw Error("host is null");
  }
  const hostArray = parsedURL.split(".");
  return hostArray.slice(Math.max(hostArray.length - 2, 0)).join(".");
}

export default function (url: string): boolean {
  if (url === "" || url === undefined || url === null) {
    return false;
  }
  if (urlParser.parse(url).host === null) {
    return false;
  }
  if (!allowedUrls.includes(getDomain(url))) {
    return false;
  }
  return true;
}
