import apiClient from "./client";

const loginUser = (body) => apiClient.post('/v1/user/login', body)

const registerUser = (body) => apiClient.post('/v1/user/register', body)

const setFavoutires = (body) => apiClient.put('/v1/user/favourites', body)

export default {
    loginUser,
    registerUser,
    setFavoutires
}