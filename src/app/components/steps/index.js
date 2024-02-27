import styles from './styles.module.css'
import Image from 'next/image'

export default function Steps(props) {
    return(
        <div className={styles.container}>
            <div className={styles.progressContainer}>
                <ul className={styles.progressbar}>
                    {
                        props.pages?.map((item, index) => {
                            return(
                                <li 
                                    key={item + index}
                                    className={
                                        props.currentIndex === index ? styles.active: props.currentIndex > index ? styles.completed : ''  
                                    }
                                >
                                    {item}
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        </div>
    )
}