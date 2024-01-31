import React from 'react'
import PrivateBlock from '../privateBlock/PrivateBlock'
import styles from './style.module.css'

export default function Layout() {
  return (
    <div className={styles.privateBlock}>
        <PrivateBlock/>
    </div>
  )
}
