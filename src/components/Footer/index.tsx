import { FaGithub } from 'react-icons/fa'

import styles from './styles.module.scss'

export function Footer() {
  return (
    <footer className={styles.footerContainer}>
      <div className={styles.footerContent}>
        <p>
          <span>hotcoffee</span> 2022 copyright all rights reserved
        </p>

        <p>
          Developed by{' '}
          <a href="https://github.com/daniel-souza01">
            Daniel Souza <FaGithub />
          </a>
        </p>
      </div>
    </footer>
  )
}
