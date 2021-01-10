import getToken from "./authToken";
import getLocalToken from "./localStorage/getLocalToken";

export default async function getImages(countPage = 1) {
  const response = await fetch(
    `http://interview.agileengine.com/images?page=${countPage}`,
    {
      method: "GET",
      mode: "cors",
      headers: {
        Authorization: `Bearer ${getLocalToken("token")}`,
      },
    }
  );

  let images = {};
  try {
    images = await response.json();
    if (images.status === "Unauthorized") {
      throw new Error("Unauthorized");
    }
  } catch (e) {
    if (e === "Unauthorized") {
      await getToken();
    }
  }

  return images;
}
