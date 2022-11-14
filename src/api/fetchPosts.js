import { fetchGet } from "./fetchUtils";

const fetchPosts = async (token) => {
  try {
    const { posts } = await fetchGet(token, "/posts");

    return posts;
  } catch (e) {
    console.error(e);
  }
};

export default fetchPosts;
