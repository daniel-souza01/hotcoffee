import { useSession, signIn, signOut } from 'next-auth/react'

import { Tooltip } from 'react-tippy'
import { FcGoogle } from 'react-icons/fc'
import { RiLogoutBoxRLine } from 'react-icons/ri'

import 'react-tippy/dist/tippy.css'
import styles from './styles.module.scss'

export function Profile() {
  const { data: session } = useSession()

  console.log(session)

  return session ? (
    <Tooltip
      position="bottom-end"
      trigger="click"
      interactive
      theme="dark"
      html={
        <div className={styles.tooltipUserLoged}>
          <div>
            <img
              src={session.user.image ? session.user.image : '/avatar.svg'}
              alt="User Avatar"
            />
            <div>
              <strong>{session.user.name}</strong>
              <p>{session.user.email}</p>
            </div>
          </div>

          <div className={styles.divider}></div>

          <button onClick={() => signOut()}>
            <RiLogoutBoxRLine
              style={{
                color: '#fff',
                marginRight: '10px'
              }}
              size={20}
            />
            Sign Out
          </button>
        </div>
      }
    >
      <img
        className={styles.userAvatar}
        src={session.user.image}
        alt="User Avatar"
      />
    </Tooltip>
  ) : (
    <Tooltip
      position="bottom-end"
      trigger="click"
      interactive
      theme="dark"
      html={
        <button
          onClick={() => signIn('google')}
          className={styles.tooltipButtonUserNotLoged}
        >
          <FcGoogle
            style={{
              backgroundColor: '#fff',
              borderRadius: '2px',
              marginRight: '8px',
              padding: '4px',
              width: '28px',
              height: '28px'
            }}
          />
          Sign In with Google
        </button>
      }
    >
      <img className={styles.userAvatar} src="/avatar.svg" alt="Avatar" />
    </Tooltip>
  )
}
