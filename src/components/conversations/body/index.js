import styles from './conv-body.module.css'

export function ConversationBody({ messages, conversation, connectedUser }) {
    return (
        <div className={styles.container}>
            <div id="chat" className="flex flex-col mt-2 flex-col-reverse overflow-y-scroll	 space-y-3 mb-20 pb-3 ">

                <div className="w-max ml-auto break-all mt-2 mb-1 p-2 rounded-br-none bg-blue-500 rounded-2xl text-white text-left mr-5">
                    2/10
                </div>
                <div className="w-max ml-auto break-all mt-2 mb-1 p-2 rounded-br-none bg-blue-500 rounded-2xl text-white text-left mr-5">
                    But numbers can
                </div>
                <div className="other break-all mt-2  ml-5 rounded-bl-none float-none bg-gray-300 mr-auto rounded-2xl p-2">
                    Aww thx!!
                </div>
                <div className="w-max ml-auto break-all mt-2 mb-1 p-2 rounded-br-none bg-blue-500 rounded-2xl text-white text-left mr-5">
                    Words can't describe how beautiful you are :)
                </div>
                <div className="other break-all mt-2  ml-5 rounded-bl-none float-none bg-gray-300 mr-auto rounded-2xl p-2">
                    Words can't decsribe how ugly you are ;)
                </div>
            </div>
        </div>
    )
}