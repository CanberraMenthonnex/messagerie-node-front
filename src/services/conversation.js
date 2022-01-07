import axios from "axios";
import { API_URL } from "../config";

function formateConversation(conversation, user) {
    console.log({user});
    const users = conversation.users.filter(u => u._id !== user._id)
    console.log({users});
    conversation.name = conversation.name || (users.length > 0 && users[0].username)
    return conversation
}

export function getConversations(token, user) {
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    return axios.get(API_URL + "/conversations", config)
        .then(res => {
            const conversations = res.data.conversations
            conversations.map(conv => formateConversation(conv, user))

            return conversations
        })
}

export function createConversation(token, user, connectedUser) {
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    return axios.post(API_URL + "/conversations", { users: [user._id] }, config)
        .then(res => formateConversation(res.data.conversation, connectedUser))
}

export function deleteConversation(token, conv)
{
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    return axios.delete(API_URL + "/conversations/" + conv._id, config)
        .then(res => res.data)
}