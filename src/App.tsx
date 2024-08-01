import { AppRouter } from './features/router/app-router'
import { WakeLockProvider } from './features/wake-lock/wake-lock-provider'

function App() {
  return (
    <WakeLockProvider>
      <AppRouter />
    </WakeLockProvider>
  )
}

export default App
