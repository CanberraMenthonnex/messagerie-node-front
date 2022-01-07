import React from "react";
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


export default function Conversations() {

    const { token, user } = useAuth(state => ({ token: state.token, user: state.user }))
    const [conversations, setConversations] = useState([])

    const [newFormIsActive, setNewFormIsActive] = useState(false)
    const [username, setUsername] = useState("")

    const [currentConversation, setCurrentConversation] = useState(null)
    const [currentMessage, setCurrentMessage] = useState("")

    const [users, setUsers] = useState([])

    const [error, setError] = useTempError()

    const initConversations = () => {
        getConversations(token, user)
            .then(conversations => setConversations(conversations))
    }

    useEffect(() => {
        if (!token || !user) return

        initConversations()

    }, [token, user])

    useEffect(() => {
        if(!newFormIsActive) return  
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

        if(res) 
        {
            deleteConversation(token, conv)
            .then(initConversations)
        }
    }

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
                    <ConversationBody messages={[]} />
                </div>
                {
                    currentConversation && (
                        <form className={styles.chatForm}>
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