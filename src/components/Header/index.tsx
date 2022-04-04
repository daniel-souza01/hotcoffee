import { Profile } from '../Profile'
import { ActiveLink } from '../ActiveLink/ActiveLink'
import Link from 'next/link'

import styles from './styles.module.scss'

export function Header() {
  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <Link href="/" passHref>
          <a>HotCoffee</a>
        </Link>

        <div className={styles.rightItems}>
          <nav>
            <ActiveLink activeClassName={styles.active} href="/" passHref>
              <a>Home</a>
            </ActiveLink>

            <ActiveLink
              activeClassName={styles.active}
              href="/articles"
              passHref
            >
              <a>Articles</a>
            </ActiveLink>
          </nav>
          <Profile />
        </div>
      </div>
    </header>
  )
}
