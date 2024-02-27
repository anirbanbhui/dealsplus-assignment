import styles from './styles.module.css';
import { useCallback, useState, useRef, useEffect } from 'react';
import Image from 'next/image';

export default function Dropdown(props) {

    const targetDivRef = useRef(null);
    const [showOptions, updateShowoptions] = useState(false)
    const [givenAccess, updateGivenAccess] = useState('No Access')

    const handleClickOutside = (event) => {
        if (targetDivRef.current && !targetDivRef.current.contains(event.target)) {
            updateShowoptions(false)
        }
    };
    
    useEffect(() => {
        // Attach the click event listener to the document
        document.addEventListener('click', handleClickOutside);
    
        // Cleanup: Remove the event listener when the component unmounts
        return () => {
          document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    const handleAccessSelect = useCallback((value) => {
        updateGivenAccess(value)
        props.updateStore(
            {
                ...props.store,
                [props.type]: {
                    ...props.store[props.type],
                    [props.name]: value
                }
            }
        )
        updateShowoptions(false)
    }, [updateGivenAccess, givenAccess, props.store, props.updateStore]);
    

    return(
        <div ref={targetDivRef} className={styles.container}>
            <div className={styles.dropdown} onClick={() => updateShowoptions(!showOptions)}>
                <span>{givenAccess}</span>
                <Image
                    width={20}
                    height={20}
                    alt="arrow down"
                    src="/arrow-drop-down.svg"
                />
            </div>
            <ul className={`${styles.dropdownMenu} ${!showOptions ? styles.hidden : ''}`}>
                <li onClick={() => handleAccessSelect('No Access')} className={styles.li}>No Access</li>
                {props.type !== 'entity' && <li onClick={() => handleAccessSelect('Basic access')} className={styles.li}>Basic access</li>}
                <li onClick={() => handleAccessSelect('Full access')} className={styles.li}>Full access</li>
            </ul>
        </div>
    )
}