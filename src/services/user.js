import axios from "axios";
import { API_URL } from "../config";

export function getAccessToken(mail, password)
{
    return axios.post(API_URL + "/auth/login", {mail, password})
    .then(res => res.data)
}

export function getUserProfile(token)
{
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    return axios.get(API_URL + "/users/profile", config)
    .then(res => res.data)
}

export function register(username, mail, password)
{
    return axios.post(API_URL + "/auth/register", {username, mail, password})
    .then(res => res.data)
}

export function getUsers(username, token)
{
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    return axios.get(API_URL + "/users?username=" + username, config)
    .then(res => res.data.users)
}