import { create } from 'zustand';
import { removeJWT, setJWT, getJWT, getMe } from '../api/api-utils';
import { endpoints } from "@/app/api/config"

export const useStore = create((set) => ({
    isAuth: false,
    user: null,
    token: null,
    login: (user, token) => {
        set({ isAuth: true, user, token });
        setJWT(token);
    },
    logout: () => {
        set({ isAuth: false, user: null, token: null });
        removeJWT();
    },
    checkAuth: async () => {
        const jwt = getJWT();
        if (jwt) {
            const user = await getMe(endpoints.me, jwt);
            if (user) {
                /* —охран¤ем полученные данные и токен */
                set({ isAuth: true, user: { ...user, id: user._id }, token: jwt });
                setJWT(jwt);
            } else {
                /* ¬озвращаем изначальные состо¤ни¤ и удал¤ем токен */
                set({ isAuth: false, user: null, token: null });
                removeJWT();
            }
        } else {
            set({ isAuth: false, user: null, token: null });
        }
    },
}));