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

        <Search />

        <nav>
          <a href="#">Home</a>
          <a href="#">Articles</a>
        </nav>

        <Profile />
      </div>
    </header>
  )
}
