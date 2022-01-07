import axios from 'axios'
import { API_URL } from '../config';

export function getMessages(token, conversation)
{
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    return axios.get(API_URL + "/conversations/" + conversation + "/messages", config)
        .then(res => {
            return res.data.messages
        })
}
