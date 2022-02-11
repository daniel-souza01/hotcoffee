import { Search } from '../Search'

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
          <a href="#" className="link" data-hover="Home">
            Home
          </a>
          <a href="#">Articles</a>
        </nav>
      </div>
    </header>
  )
}
