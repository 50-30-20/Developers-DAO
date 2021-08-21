import React from 'react'

import ButtonGroup from '../../button-group'

import styles from './post-list.module.css'

const PostList = ({ postType, setPostType, children }) => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.lastQ}>Last Questions</h2>
        <ButtonGroup
          buttons={['Questions']}
          selected={postType}
          setSelected={setPostType}
        />
      </div>
      {children}
    </div>
  )
}

export default PostList