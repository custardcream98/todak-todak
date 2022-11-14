// const BaseURL = "http://127.0.0.1:5001/todak-todak/us-central1/app";
const BaseURL = "https://todak-todak.web.app";
const getAuthHeader = (token) => ({
  Authorization: `Bearer ${token}`,
});

export const fetchGet = async (token, url) => {
  try {
    const response = await fetch(`${BaseURL}${url}`, {
      method: "GET",
      headers: getAuthHeader(token),
    });

    if (!response.ok) {
      throw Error(`GET ${url} API 서버 오류`);
    }

    return await response.json();
  } catch (e) {
    console.error(e);
  }
};
