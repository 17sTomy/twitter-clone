import { api, authAxios } from "./useAxios";
import { jwtDecode } from "jwt-decode";

export const recoUsers = async () => {
    const res = await authAxios.get('users/reco/');
    return res.data;
};

export const searchUser = async (query) => {
    const res = await authAxios.get(`/users/u/search/?query=${query}`);
    return res.data;
};

export const updateProfile = async (data) => {
    await authAxios.put(`/users/${localStorage.getItem('username')}/`, data);
};

export const userProfile = async (username) => {
    const res = await authAxios.get(`/users/${username}/`);
    return res.data;
};

export const loginReq = async (data) => {
    const res = await api.post('/users/login/', data);
    const { access, refresh } = res.data;

    localStorage.setItem('access', access);
    localStorage.setItem('refresh', refresh);

    const user = jwtDecode(localStorage.getItem('access'));
    localStorage.setItem('username', user.username);
    localStorage.setItem('user_id', user.id);
    localStorage.setItem('avatar', user.avatar);
};

export const registerReq = async (data) => {
    await api.post('/users/register/', data);
};

export const logoutReq = () => {
    localStorage.clear();
    window.location.href = "http://localhost:5173/login";

};