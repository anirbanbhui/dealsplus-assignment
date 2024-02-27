import { useCallback } from 'react';
import styles from './styles.module.css';

export default function CreateGroupName (props) {

    const handleSearch = useCallback((e) => {
        props.updateStore({
            ...props.store,
            groupName: e.target.value
        })
    }, [props.store, props.updateStore]);

    return(
        <div className={styles.container}>
            <div className={styles.name}>Name your permissions group</div>
            <div className={styles.nameHelper}>Permissions group name *</div>
            <input
                className={styles.input}
                placeholder="Group name"
                onChange={handleSearch}
            />
            <div className={styles.desNameHelper}>
                A descriptive name will help identify it in the future
            </div>
        </div>
    )
}