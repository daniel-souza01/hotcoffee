import { Search } from '../Search'
import { Profile } from '../Profile'
import { ActiveLink } from '../ActiveLink/ActiveLink'

import styles from './styles.module.scss'

export function Header() {
  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <a href="/">
          <h1>HotCoffee</h1>
        </a>

        <nav>
          <ActiveLink activeClassName={styles.active} href="/" passHref>
            <a>Home</a>
          </ActiveLink>

          <ActiveLink activeClassName={styles.active} href="/articles" passHref>
            <a>Articles</a>
          </ActiveLink>
        </nav>

        <div className={styles.profileAndSearch}>
          <Search />
          <Profile />
        </div>
      </div>
    </header>
  )
}
