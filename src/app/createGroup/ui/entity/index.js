'use client'

import styles from './styles.module.css';
import { useCallback, useState, useEffect } from 'react';

import SearchInput from '@/app/components/search';
import Dropdown from '@/app/components/dropdown';

import { EntityValue } from '../../constant';

export default function Entity (props) {

    const [structureList, updateStructureList] = useState([]);
    const [selectAll, updateSelectAll] = useState(false);
    const [expandAll, updateExpandAll] = useState(false);
    const [selectedEntity, updateselectedEntity] = useState({});
    const [showListOfEntities, updateShowListOfEntities] = useState({});

    useEffect(() => {

        if(props.store.selectAllStructure) {
            updateStructureList(props.data)
        } else {
            const arr = []
            props.store.selectedStructure && Object.keys(props.store.selectedStructure)?.forEach(item => {
                if(props.store.selectedStructure[item]) {
                    arr.push(item)
                }
            })
            updateStructureList(arr)
        }

    }, [props])

    const handleSelectAll = useCallback(() => {

        const updatedValue = !selectAll
        updateSelectAll(updatedValue)
        updateselectedEntity({})
        props.updateStore({
            ...props.store,
            selectAllEntity: updatedValue
        })

    }, [
        updateSelectAll,
        updateselectedEntity,
        selectAll, 
        props
    ]);

    const handleEntitySelect = useCallback((name) => {

        const selectedEntityObj = {
            ...selectedEntity,
            [name]: !selectedEntity[name]
        }
        updateselectedEntity(selectedEntityObj)
        if(
            Object.values(selectedEntityObj).length === props.data?.length
            && Object.values(selectedEntityObj).every(Boolean)
        ) {
            updateSelectAll(true)
        } else {
            updateSelectAll(false)
        }
        props.updateStore({
            ...props.store,
            selectedEntity: selectedEntityObj
        })

    }, [
        updateselectedEntity,
        updateSelectAll,
        selectedEntity,
        props
    ]);

    const handleShowListofEnitties = useCallback((name) => {

        const showListOfEntitiesObj = {
            ...showListOfEntities,
            [name]: !showListOfEntities[name]
        }
        updateShowListOfEntities(showListOfEntitiesObj)

    }, [updateShowListOfEntities, showListOfEntities])

    const handleExpandAll = useCallback(() => {
        updateExpandAll(!expandAll)
    }, [updateExpandAll, expandAll]);

    const handleCollapseAll = useCallback(() => {
        updateShowListOfEntities({});
    }, [updateShowListOfEntities]);

    function renderList(entityObj) {
        return Object.keys(entityObj)?.map((item, index) => {
            return(
                <>
                    <div className={styles.structureList}>  
                        <div className={styles.select}>
                            <input
                                className={styles.checkbox} 
                                type="checkbox" 
                                checked={selectAll || !!selectedEntity[item]}
                                onClick={() => handleEntitySelect(item)}
                            />
                            <div className={styles.entityName}>{`${item} Entities (${entityObj[item].length})`}</div>
                        </div>
                        <Dropdown
                            store={props.store} 
                            updateStore={props.updateStore} 
                            name={item} type={'entity'} 
                        />
                    </div>
                    {
                        (props.data.length - 1 !== index) ? <div className={styles.line}/> : ''
                    }
                </>
            )
        })
    }

    return(
        <div className={styles.container}>
            <div className={styles.helpertext}>
                Which entities would you like to grant access to?
            </div>
            <div className={styles.subHelpertext}>
                Entity roles have been inherited from structure roles
            </div>
            <div className={styles.searchSection}>
                <SearchInput text={'24 entities'} />
            </div>
            <div className={styles.selectAll}>
                <div className={styles.selectTextGroup}>
                    <input 
                        checked={selectAll} 
                        className={styles.checkbox} 
                        type="checkbox" 
                        onClick={handleSelectAll}
                    />
                    <div>Entity</div>
                    <div 
                        className={styles.expandCollapse}
                        onClick={handleExpandAll}
                    >
                        Expand all
                    </div>
                    <span>&nbsp;|&nbsp;</span>
                    <div 
                        className={styles.expandCollapse}
                        onClick={handleCollapseAll}
                    >
                        Collapse all
                    </div>
                </div>
                <div>Role</div>
            </div>
            <div className={styles.line}/>
            <div className={styles.list}>
                {
                    structureList.map((item, index) => {
                        return(
                            <>
                                <div key={index + item} className={styles.structureList}>  
                                    <div className={styles.select}>
                                        <input
                                            className={styles.checkbox} 
                                            type="checkbox" 
                                            checked={selectAll || !!selectedEntity[item]}
                                            onClick={() => handleEntitySelect(item)}
                                        />
                                        <div
                                            className={styles.structureName}
                                            onClick={() => handleShowListofEnitties(item)}
                                        >{item}</div>
                                        <div className={styles.accessType}>
                                            {props.store.structure?.[item] || 'No Access'}
                                        </div>
                                    </div>
                                </div>
                                {(props.data.length - 1 !== index) ? <div className={styles.line}/> : ''}
                                <div className={styles.childList}>
                                    {
                                        (showListOfEntities[item] || expandAll) && renderList(EntityValue[item])
                                    }
                                </div>
                            </>
                        )
                    })
                }
            </div>
        </div>
    )
}