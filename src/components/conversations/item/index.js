import styles from './conversation-item.module.css'
import classNames from 'classnames'

export function ConversationItem({name, onClick, isActive})
{
    return (
        <article className={classNames(styles.item, isActive ? styles.activeItem : null)} onClick={onClick}>
            <div className={styles.portrait}>
                {name && name[0]}
            </div>
            <div>
                <h4>{name}</h4>
                <p className={styles.lastMessage}>Last message</p>
            </div>
        </article>
    )
}