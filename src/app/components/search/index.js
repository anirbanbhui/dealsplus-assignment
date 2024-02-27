import { useCallback } from 'react'
import styles from './styles.module.css'
// import Image from 'next/image'

export default function SearchInput(props) {

    const handleSearch = useCallback((e) => {
        
    }, [])

    return(
        <div className={styles.container}>
            <input 
                className={styles.search}
                placeholder="Search"
                onChange={handleSearch}
            />
            <span className={styles.searchHelper}>{props.text}</span>
        </div>
    )
}