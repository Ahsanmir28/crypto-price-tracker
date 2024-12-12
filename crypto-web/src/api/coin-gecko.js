import apiClient from "./client";

const ping = () => apiClient.get('/v1/coin-gecko')

const search = (params) => apiClient.get('/v1/coin-gecko/search', params)

export default {
    ping,
    search
}