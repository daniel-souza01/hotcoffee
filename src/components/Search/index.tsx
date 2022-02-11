import styles from './styles.module.scss'

export function Search() {
  return (
    <div className={styles.searchContent}>
      {/* <img src="" alt="" /> */}
      {/* <input type="search" placeholder="Search..." /> */}

      <input type="text" name="search" placeholder="Search..." />
    </div>
  )
}
