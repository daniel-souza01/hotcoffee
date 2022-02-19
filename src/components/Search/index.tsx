import styles from './styles.module.scss'

export function Search() {
  return (
    <label className={styles.searchContent}>
      <img src="/icon-search.svg" alt="ícone lupa" />
      <input type="text" name="search" placeholder="Search..." />
    </label>
  )
}
