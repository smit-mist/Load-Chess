import axios from "axios";

export const getBasicDetails = async (userId) => {
  const url = `https://lichess.org/api/user/${userId}`;
  try {
    const response = await axios.get(url);

    if (response.status === 200) {
      // *Success.
      return response.data;
    }
  } catch (e) {
    console.error("ERROR", e);
    throw Error(e?.response?.data?.error?? "Something went wrong :(");
  }
};
