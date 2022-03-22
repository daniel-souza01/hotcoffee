import { useSession, signIn, signOut } from 'next-auth/react'

import { Tooltip } from 'react-tippy'
import { BsXCircle } from 'react-icons/bs'

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
      html={
        <div className={styles.tooltipUserLoged}>
          <div className={styles.userInfo}>
            <img
              src={session.user.image ? session.user.image : '/avatar.svg'}
              alt="User Avatar"
            />
            <div>
              <strong>{session.user.name}</strong>
              <p>{session.user.email}</p>
            </div>
          </div>

          <button onClick={() => signOut()}>
            <BsXCircle
              style={{
                marginRight: '12px',
                width: '44px'
              }}
              size={16}
            />
            Sign Out
          </button>
        </div>
      }
    >
      <img
        src={session.user.image ? session.user.image : '/avatar.svg'}
        alt="User Avatar"
        className={styles.userAvatar}
      />
    </Tooltip>
  ) : (
    <Tooltip
      position="bottom-end"
      trigger="click"
      interactive
      theme="light"
      arrow
      html={
        <button
          className={styles.buttonSignIn}
          onClick={() => signIn('google')}
        >
          Sign In
        </button>
      }
    >
      <img src="/avatar.svg" alt="Avatar" className={styles.userAvatar} />
    </Tooltip>
  )
}
