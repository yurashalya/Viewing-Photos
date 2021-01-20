import getToken from "./authToken";
import getLocalToken from "./localStorage/getLocalToken";

export default async function getPhotoDetails(id) {
  const UNAUTHORIZED = "Unauthorized";

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
    if (photoDetails.status === UNAUTHORIZED) {
      throw new Error(UNAUTHORIZED);
    }
  } catch (e) {
    if (e === UNAUTHORIZED) {
      await getToken();
    }
  }

  return photoDetails;
}
