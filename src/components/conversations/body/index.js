import styles from './conv-body.module.css'

export function ConversationBody({ messages, conversation, connectedUser }) {
    
    return (
        <div className={styles.container}>
            <div id="chat" className="flex flex-col mt-2 flex-col-reverse space-y-3 pb-2  ">
                {
                    messages.map(mess => (
                        <div
                            key={mess._id}
                            className={connectedUser && mess.expeditor === connectedUser._id ?
                                "w-max ml-auto break-all mt-2 mb-1 p-2 rounded-br-none bg-blue-500 rounded-2xl text-white text-left mr-5"
                                : 'other break-all mt-2  ml-5 rounded-bl-none float-none bg-gray-300 mr-auto rounded-2xl p-2'}>
                            {mess.value}
                        </div>
                    ))
                }
            </div>
        </div>
    )
}