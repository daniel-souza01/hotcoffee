import { Search } from '../Search'
import { Profile } from '../Profile'

import styles from './styles.module.scss'

export function Header() {
  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <a href="/">
          <h1>HotCoffee</h1>
        </a>

        <nav>
          <a href="/">Home</a>
          <a href="/articles">Articles</a>
        </nav>

        <div className={styles.profileAndSearch}>
          <Search />
          <Profile />
        </div>
      </div>
    </header>
  )
}
