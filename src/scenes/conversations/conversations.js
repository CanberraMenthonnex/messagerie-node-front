import React, { useRef } from "react";
import { useEffect, useState } from "react/cjs/react.development";
import { DangerAlert } from "../../components/alerts/danger";
import { ConversationBody } from "../../components/conversations/body";
import { ConversationItem } from "../../components/conversations/item";
import { NewConversationModal } from "../../components/conversations/new";
import { useTempError } from "../../hooks/useTempError";
import { createConversation, deleteConversation, getConversations } from "../../services/conversation";
import { getUsers } from "../../services/user";
import { useAuth } from "../../stores/auth";
import styles from "./conversations.module.css";
import io  from "socket.io-client";
import { API_URL } from "../../config";
import { getMessages } from "../../services/messages";


export default function Conversations() {

    const { token, user } = useAuth(state => ({ token: state.token, user: state.user }))
    const [conversations, setConversations] = useState([])
    const [messages, setMessages] = useState([])

    const [newFormIsActive, setNewFormIsActive] = useState(false)
    const [username, setUsername] = useState("")

    const [currentConversation, setCurrentConversation] = useState(null)
    const [currentMessage, setCurrentMessage] = useState("")

    const [users, setUsers] = useState([])

    const [error, setError] = useTempError()

    const socketRef = useRef()

    const initConversations = () => {
        getConversations(token, user)
            .then(conversations => setConversations(conversations))
    }

    useEffect(() => {
        if (!token || !user) return

        initConversations()

        const socket = io(API_URL, {
            autoConnect: false
        })
  
        socket.on("connect", () => {
            console.log("User connected at " + socket.id);
        })

        socket.on("disconnect", () => {
            console.log("User disconnected from " + socket.id);
        })

        socket.on("message", ({message}) => {
            console.log({ message });
            setMessages(messages => [message,...messages])
        })

        socketRef.current = socket

    }, [token, user])

    useEffect(() => {
        if(!currentConversation) return 

        if(socketRef.current) {
            socketRef.current.disconnect()
        }

        socketRef.current.connect()

        socketRef.current.emit("join-room", {conversation: currentConversation._id, token  })

        if(token)
        {
           getMessages(token, currentConversation._id) 
           .then(messages => {
               setMessages(messages || [])
           })
        }

        
    }, [currentConversation])

    useEffect(() => {
        if (!newFormIsActive) return
        getUsers(username, token)
            .then(users => setUsers(users))
    }, [newFormIsActive, username])


    const onClickUser = (recipient) => {
        createConversation(token, recipient, user)
            .then(conversation => {
                setConversations(conversations => [...conversations, conversation])
                setNewFormIsActive(false)
                setUsername("")
                setError(null)
            })
            .catch(e => {
                const message = e.response.data.error
                setError(message)
            })
    }

    const onDeleteConversation = (conv) => {
        const res = window.confirm("Are you sure you want delete the conversation ?")

        if (res) {
            deleteConversation(token, conv)
                .then(initConversations)
        }
    }

    const sendMessage = (e) => {
        e.preventDefault()
        socketRef.current.emit('message', {conversation: currentConversation._id, message: currentMessage, token})
        setCurrentMessage("")
    }

    console.log({messages});

    return (
        <div className={styles.container}>
            <section className={styles.conversationWrapper}>
                <div className={styles.searchInput}>
                    <input placeholder="Search" />
                    <button className={styles.chatButton} onClick={() => setNewFormIsActive(true)}>New</button>
                </div>
                <div>
                    {conversations.map(conv => (
                        <ConversationItem
                            isActive={currentConversation && currentConversation._id === conv._id}
                            onClick={() => setCurrentConversation(conv)}
                            onDelete={() => onDeleteConversation(conv)}
                            name={conv.name}
                            key={conv._id} />
                    ))}
                </div>
            </section>
            <section className={styles.chatPart}>
                <header className={styles.chatHeader}>
                    {
                        currentConversation && (
                            <h3 className={styles.chatHeaderTitle}>{currentConversation.name}</h3>
                        )
                    }
                </header>
                <div className={styles.chatBody}>
                    {
                        currentConversation && (
                            <ConversationBody messages={messages} conversation={currentConversation} connectedUser={user} />
                        )
                    }
                </div>
                {
                    currentConversation && (
                        <form className={styles.chatForm} onSubmit={sendMessage}>
                            <input value={currentMessage} onInput={e => setCurrentMessage(e.target.value)} placeholder="Write your message here" />
                            <button className={styles.chatButton}>Send</button>
                        </form>
                    )
                }
            </section>
            {
                newFormIsActive && (
                    <NewConversationModal
                        onClose={() => setNewFormIsActive(false)}
                        username={username}
                        setUsername={setUsername}
                        users={users}
                        onClickUser={onClickUser} />
                )
            }
            {
                error && (
                    <DangerAlert message={error} />
                )
            }
        </div>
    )
}