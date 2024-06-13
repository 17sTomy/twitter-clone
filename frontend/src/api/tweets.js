import { authAxios } from "./useAxios";

export const addComment = async (data) => {
    await authAxios.post(`/tweets/comments/${data.id}/`, data);
};

export const deleteComment = async (id) => {
    await authAxios.delete(`/tweets/comments/delete/${id}/`);
};

export const getComments = async (id) => {
    const response = await authAxios.get(`/tweets/comments/${id}/`);
    return response.data;
};
 
export const getUserLikes = async (username) => {
    const response = await authAxios.get(`/tweets/likes/${username}`);
    return response.data;
};

export const getUserRetweets = async (username) => {
    const response = await authAxios.get(`/tweets/retweets/${username}`);
    return response.data;
};

export const getTweet = async (id) => {
    const response = await authAxios.get(`/tweets/${id}/`);
    return response.data;
};

export const retweetTweet = async (id) => {
    await authAxios.post(`/tweets/retweet/${id}/`);
};

export const likeTweet = async (id) => {
    await authAxios.post(`/tweets/like/${id}/`);
};

export const deleteTweet = async (id) => {
    await authAxios.delete(`/tweets/${id}/`);
};

export const getUserTweets = async (username) => {
    const response = await authAxios.get(`/tweets/my-tweets/${username}/`);
    return response.data;
};

export const addTweet = async (data) => {
    await authAxios.post("/tweets/", data);
};

export const getTweets = async () => {
    const response = await authAxios.get(`/tweets/`);
    return response.data;
};