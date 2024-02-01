import React from 'react'
import PrivateBlock from '../privateBlock/PrivateBlock'
import styles from './style.module.css'

export default function Layout() {
  return (
    <div className={styles.layout}>
      {/* <header>
        <h5>hello tehila</h5>
      </header> */}
      <body>
          <PrivateBlock/>
      </body>
    </div>
  )
}
