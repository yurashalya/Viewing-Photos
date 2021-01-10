import getToken from "./authToken";
import getLocalToken from "./localStorage/getLocalToken";

export default async function getPhotoDetails(id) {
  const response = await fetch(
    `http://interview.agileengine.com/images/${id}`,
    {
      method: "GET",
      mode: "cors",
      headers: {
        Authorization: `Bearer ${getLocalToken("token")}`,
      },
    }
  );

  let photoDetails = {};
  try {
    photoDetails = await response.json();
    if (photoDetails.status === "Unauthorized") {
      throw new Error("Unauthorized");
    }
  } catch (e) {
    if (e === "Unauthorized") {
      await getToken();
    }
  }

  return photoDetails;
}
