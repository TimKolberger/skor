import { AppRouter } from './features/router/app-router.tsx'
import { WakeLockProvider } from './features/wake-lock/wake-lock-provider.tsx'

function App() {
  return (
    <WakeLockProvider>
      <AppRouter />
    </WakeLockProvider>
  )
}

export default App
