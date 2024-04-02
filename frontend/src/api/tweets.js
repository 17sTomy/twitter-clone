import { authAxios } from "./useAxios";

export const getTweets = async ({ pageParam = 1 }) => {
    const response = await authAxios.get(`/tweets/?page=${pageParam}&pages=10`)
};