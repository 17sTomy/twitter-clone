import { api } from "./useAxios";
import { jwtDecode } from "jwt-decode";

export const login = async (data) => {
    const res = await api.post('/users/login/', data);
    const { access, refresh } = res.data;

    localStorage.setItem('access', access);
    localStorage.setItem('refresh', refresh);

    const user = jwtDecode(localStorage.getItem('access'));
    localStorage.setItem('username', user.username);
    localStorage.setItem('id', user.id);
    localStorage.setItem('avatar', user.avatar);
};