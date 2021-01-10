export default function getLocalToken(name) {
  if (localStorage.getItem(name)) {
    return localStorage.getItem(name);
  } else {
    return null;
  }
}
