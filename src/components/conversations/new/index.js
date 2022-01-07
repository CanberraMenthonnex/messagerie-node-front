import styles from "./new-conversation.module.css"

export function NewConversationModal({ username, setUsername, users, onClickUser, onClose }) {
    return (
        <div className="flex items-center justify-center fixed left-0 bottom-0 w-full h-full bg-gray-800">
            <div className="bg-white rounded-lg w-1/2">
                <div className="flex flex-col items-start p-4">
                    <div className="flex items-center max-w-md mx-auto bg- rounded-full " x-data="{ search: '' }">
                        <div className="w-full">
                            <input value={username} onInput={e => setUsername(e.target.value)} type="search" className="w-full px-4 py-1 text-gray-900 rounded-full focus:outline-none"
                                placeholder="search" x-model="search" />
                        </div>
                        <div>
                            <button className="flex items-center justify-center w-12 h-12 text-gray-100 rounded-full">
                                <svg className="w-5 h-5" fill="none" stroke="black" viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                                </svg>
                            </button>
                        </div>
                    </div>
                    <ul className={styles.userItemList}>
                            {
                                users.map(user => (
                                    <li key={user._id} className={styles.userItem} onClick={() => onClickUser(user)}>
                                        <div className={styles.portrait}>{user.username[0]}</div>
                                        <h5>{user.username}</h5>
                                    </li>
                                ))
                            }
                        </ul>
                    <hr />
                    <div className="ml-auto">
                        <button onClick={onClose} className="bg-transparent hover:bg-gray-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div >
    )
}