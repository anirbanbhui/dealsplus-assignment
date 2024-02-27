'use client'

import styles from './styles.module.css';
import { useCallback, useState } from 'react';

import SearchInput from '@/app/components/search';

export default function SelectMember(props) {

    const [selectedUser, updateSelectedUser] = useState({})
    const [selectedUserCount, updateSelectedUserCount] = useState(0)

    const handleSwitchClick = useCallback((name) => {

        console.log(name)
        const selectedUserObj = {
            ...selectedUser, 
            [name]: !selectedUser[name]
        }
        const totalSelectedUser = Object.values(selectedUserObj).filter(
            element => element === true
        ).length;
        updateSelectedUser(selectedUserObj)
        updateSelectedUserCount(totalSelectedUser)

    }, [
        updateSelectedUser,
        updateSelectedUserCount,
        selectedUser,
        selectedUserCount
    ]);

    return(
        <div className={styles.container}>
            <div className={styles.helpertext}>
                Would you like to add anyone to the new group now?
            </div>
            <div className={styles.subHelpertext}>
                You can skip this and add members later if you wish
            </div>
            <SearchInput text={`${selectedUserCount} members`} />
            <div className={styles.usersList}>
                {
                    props.data?.map((item, index) => {
                        return(
                            <>
                                <div key={item + index} className={styles.userItem}>
                                    <div className={styles.userDetails}>
                                        <div className={styles.name}>{item.user}</div>
                                        <div className={styles.emailOrg}>
                                            <span>{item.email}</span>
                                            &nbsp;&nbsp;*&nbsp;&nbsp;
                                            <span>{item.organisation}</span>
                                        </div>
                                    </div>
                                    <label className={styles.switch}>
                                        <input
                                            className={styles.switchInput} 
                                            type="checkbox" 
                                            checked={selectedUser[item.user]}
                                            onClick={() => handleSwitchClick(item.user)}
                                        />
                                        <span className={`${styles.slider} ${styles.round}`}></span>
                                    </label>
                                </div>
                                {
                                    (props.data.length - 1 !== index) ? <div className={styles.line} /> : ''
                                }
                            </>
                        )
                })}
            </div>
        </div>
    )
}