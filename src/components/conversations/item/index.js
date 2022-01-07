import styles from './conversation-item.module.css'
import classNames from 'classnames'

export function ConversationItem({ name, onClick, isActive, onDelete }) {
    return (
        <article className={classNames(styles.item, isActive ? styles.activeItem : null)} onClick={onClick}>
            <div className={styles.portrait}>
                {name && name[0]}
            </div>
            <div>
                <h4>{name}</h4>
                <p className={styles.lastMessage}>Last message</p>
            </div>
            <div className={styles.trashWrapper}>
                <svg onClick={onDelete} xmlns="http://www.w3.org/2000/svg"  className="w-16 h-16 flex items-center text-red-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
            </div>
        </article>
    )
}