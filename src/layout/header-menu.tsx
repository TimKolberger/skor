import {
  Menu,
  MenuButton,
  MenuContent,
  MenuItem,
  MenuSeparator,
} from '../components/menu.tsx'
import { useWakeLockContext } from '../features/wake-lock/use-wake-lock-context.tsx'
import type { ReactNode } from 'react'
import {
  FiGithub,
  FiInfo,
  FiMoreVertical,
  FiSunrise,
  FiSunset,
} from 'react-icons/fi'
import { Link } from 'react-router-dom'

type HeaderMenuProps = {
  children?: ReactNode
}
export const HeaderMenu = (props: HeaderMenuProps) => {
  const { children } = props
  const wakeLock = useWakeLockContext()

  return (
    <Menu>
      <MenuButton variant="ghost" padding="slim">
        <span className="sr-only">Open menu</span>
        <FiMoreVertical />
      </MenuButton>
      <MenuContent align="end">
        {children}
        {children ? <MenuSeparator /> : null}
        {wakeLock.isSupported ? (
          <MenuItem
            onClick={async () => {
              if (wakeLock.type === 'screen') {
                await wakeLock.release()
              } else {
                await wakeLock.request()
              }
            }}
          >
            {wakeLock.type === 'screen' ? (
              <>
                <FiSunset />
                Allow screen to turn off
              </>
            ) : (
              <>
                <FiSunrise />
                Keep screen on
              </>
            )}
          </MenuItem>
        ) : null}
        <MenuItem asChild>
          <a
            href="https://github.com/TimKolberger/skor"
            target="_blank"
            rel="noreferrer"
          >
            <FiGithub />
            Open Source on GitHub
          </a>
        </MenuItem>
        <MenuItem asChild>
          <Link to="/legal-notice">
            <FiInfo />
            Legal notice
          </Link>
        </MenuItem>
      </MenuContent>
    </Menu>
  )
}
