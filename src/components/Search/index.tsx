import { Tooltip } from 'react-tippy'
import { RiSearchLine } from 'react-icons/ri'

import 'react-tippy/dist/tippy.css'
import styles from './styles.module.scss'

export function Search() {
  return (
    <Tooltip
      position="bottom-end"
      trigger="click"
      interactive
      theme="dark"
      html={
        <div className={styles.searchContent}>
          <input placeholder="Search..." type="search" name="Search" />
          <p>results: asddsass</p>
        </div>
      }
    >
      <RiSearchLine className={styles.RiSearchLine} />
    </Tooltip>
  )
}
