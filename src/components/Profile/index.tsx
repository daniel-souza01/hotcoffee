import { useSession, signIn, signOut } from 'next-auth/react'

import { Tooltip } from 'react-tippy'
import { FaSignOutAlt, FaUser } from 'react-icons/fa'
import Avatar from 'react-avatar'

import 'react-tippy/dist/tippy.css'
import styles from './styles.module.scss'

export function Profile() {
  const { data: session } = useSession()

  return session ? (
    <Tooltip
      position="bottom-end"
      trigger="click"
      interactive
      theme="light"
      arrow
      arrowSize="big"
      html={
        <div className={styles.tooltipUserLoged}>
          <h2>
            <FaUser
              style={{
                marginRight: '5px',
                height: '14px'
              }}
            />
            {session.user.name}
          </h2>

          <button onClick={() => signOut()}>
            <FaSignOutAlt
              style={{
                marginRight: '5px',
                height: '12px'
              }}
            />
            Sign Out
          </button>
        </div>
      }
    >
      <Avatar
        className={styles.userAvatar}
        name={session.user.name}
        src={session.user.image ? session.user.image : ''}
        size="38"
        round={true}
        style={{ cursor: 'pointer' }}
      />
    </Tooltip>
  ) : (
    <button className={styles.signInButton} onClick={() => signIn('google')}>
      Sign In
    </button>
  )
}
