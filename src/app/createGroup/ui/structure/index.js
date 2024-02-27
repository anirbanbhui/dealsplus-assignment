'use client'

import styles from './styles.module.css';
import { useCallback, useState } from 'react';

import SearchInput from '@/app/components/search';
import Dropdown from '@/app/components/dropdown';

export default function CreateGroupName (props) {

    const [selectAll, updateSelectAll] = useState(false)
    const [selectedStructure, updateSelectedStructure] = useState({})

    const handleSelectAll = useCallback(() => {

        const updatedValue = !selectAll
        updateSelectAll(updatedValue)
        updateSelectedStructure({})
        props.updateStore({
            ...props.store,
            selectAllStructure: updatedValue
        })

    }, [
        updateSelectAll,
        updateSelectedStructure,
        selectAll,
        props
    ]);

    const handleStructureSelect = useCallback((name) => {

        const selectedStructureObj = {
            ...selectedStructure,
            [name]: !selectedStructure[name]
        }
        updateSelectedStructure(selectedStructureObj)
        if(
            Object.values(selectedStructureObj).length === props.data?.length
            && Object.values(selectedStructureObj).every(Boolean)
        ) {
            updateSelectAll(true)
        } else {
            updateSelectAll(false)
        }
        props.updateStore({
            ...props.store,
            selectedStructure: selectedStructureObj
        })

    }, [
        updateSelectedStructure,
        updateSelectAll,
        selectedStructure,
        props
    ]);

    return(
        <div className={styles.container}>
            <div className={styles.helpertext}>
                Which structures would you like to grant access to?
            </div>
            <div className={styles.subHelpertext}>
                Access is required to at least one structure
            </div>
            <div className={styles.searchSection}>
                <SearchInput text={`${props.data.length} structures`} />
            </div>
            <div className={styles.selectAll}>
                <div className={styles.selectTextGroup}>
                    <input 
                        checked={selectAll} 
                        className={styles.checkbox} 
                        type="checkbox" 
                        onClick={handleSelectAll}
                    />
                    <div>Structure</div>
                </div>
                <div>Role</div>
            </div>
            <div className={styles.line}/>
            <div className={styles.list}>
                {
                    props.data?.map((item, index) => {
                        return(
                            <>
                                <div key={item + index} className={styles.structureList}>  
                                    <div className={styles.select}>
                                        <input
                                            className={styles.checkbox} 
                                            type="checkbox" 
                                            checked={selectAll || !!selectedStructure[item]}
                                            onClick={() => handleStructureSelect(item)}
                                        />
                                        <div className={styles.structureName}>{item}</div>
                                    </div>
                                    <Dropdown
                                        store={props.store}
                                        updateStore={props.updateStore}
                                        name={item} type={'structure'} 
                                    />
                                </div>
                                {
                                    (props.data.length - 1 !== index) ? <div className={styles.line}/> : ''
                                }
                            </>
                        )
                    })
                }
            </div> 
        </div>
    )
}