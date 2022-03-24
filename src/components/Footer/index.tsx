import { FaGithub } from 'react-icons/fa'

import styles from './styles.module.scss'

export function Footer() {
  return (
    <footer className={styles.footerContainer}>
      <div>
        <p>
          <span>hotcoffee</span> 2022 copyright all rights reserved
        </p>

        <p>
          Developed by{' '}
          <a href="https://github.com/daniel-souza01" target={'_blank'}>
            Daniel Souza <FaGithub />
          </a>
        </p>
      </div>
    </footer>
  )
}
