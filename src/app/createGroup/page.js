"use client"

import styles from './styles/base.module.css'
import Image from 'next/image'
import { useCallback, useState } from "react"; 

import CreateGroupName from './ui/name';
import SelectMember from './ui/member';
import Structure from './ui/structure';
import Entity from './ui/entity';
import Steps from '../components/steps';

import { Pages, structureData, userData } from './constant'

export default function Home() {
  const [selectedPageIndex, updateSelectedPage] = useState(0)
  const [store, updateStore] = useState({})

  function renderContent() {
    switch (selectedPageIndex) {
      case 0:
        return <CreateGroupName store={store} updateStore={updateStore}/>
        break;
      case 1:
        return <Structure store={store} updateStore={updateStore} data={structureData} />
        break;
      case 2: 
        return <Entity store={store} updateStore={updateStore} data={structureData}/>
        break;
      case 3:
        return <SelectMember store={store} updateStore={updateStore} data={userData} />
      default:
        break;
    }
  }

  const goToNextPage =  useCallback((next) => {

    let nextIndex = selectedPageIndex;
    if(next) {
      if(selectedPageIndex < 3 ) {
        if(selectedPageIndex === 0 && !store.groupName) {
          return;
        } else if(
          selectedPageIndex === 1 
          && !(store.selectedStructure || store.selectAllStructure )
        ) {
          return;
        } else if(
          selectedPageIndex === 2 
          && !(store.selectAllEntity || store.selectedEntity)
        ) {
          return
        }
        nextIndex +=1
      }
    } else {
      nextIndex -=1
    }
    updateSelectedPage(nextIndex)

  }, [updateSelectedPage, selectedPageIndex, store]);
  
  return (
    <div className={styles.view}>
      <div className={styles.container}>
        <div className={styles.helper}>
          <div className={styles.userIcon}>
            <Image
              width={24}
              height={24}
              src="/users-plus.svg"
              alt="user icon"
            />
          </div>
          <span className={styles.helperText}>Create a new permessions group</span>
        </div>
        <div className={styles.line} />
        <Steps currentIndex={selectedPageIndex} pages={Pages} />
        <div className={styles.line} />
        <div className={styles.contentHolder}>
          {
            renderContent()
          }
        </div>
        <div className={styles.line} />
        <div className={styles.ctaGroup}>
          {
            selectedPageIndex > 0 ? <div onClick={() => goToNextPage(false)} className={`${styles.btn} ${styles.goBack}`}>Go Back</div> : ''
          }
          <div onClick={() => goToNextPage(true)} className={`${styles.btn} ${styles.next}`}>Next</div>
        </div>
      </div>
    </div>
  );
}
  