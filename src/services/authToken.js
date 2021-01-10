import setToken from "./localStorage/setlLocalToken";
const API_KEY = process.env.REACT_APP_API_KEY;

export default async function getToken() {
  const req = await fetch("http://interview.agileengine.com/auth", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ apiKey: `${API_KEY}` }),
  });

  let res = {};

  try {
    res = await req.json();
    if (res.token) {
      setToken("token", res.token);
    } else {
      throw new Error("Token is invalid, please try again later");
    }
  } catch (e) {
    console.error(e);
  }

  return res;
}
