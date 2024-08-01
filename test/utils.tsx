import { WakeLockProvider } from '../src/features/wake-lock/wake-lock-provider'
import { render, type RenderOptions } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { type FC, type ReactElement, type ReactNode, Suspense } from 'react'
import { MemoryRouter, type MemoryRouterProps } from 'react-router-dom'

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'> & {
    initialEntries?: MemoryRouterProps['initialEntries']
  },
) => {
  const AllTheProviders: FC<{
    children: ReactNode
  }> = ({ children }) => {
    return (
      <Suspense>
        <WakeLockProvider>
          <MemoryRouter initialEntries={options?.initialEntries}>
            {children}
          </MemoryRouter>
        </WakeLockProvider>
      </Suspense>
    )
  }
  const user = userEvent.setup()
  return {
    ...render(ui, { wrapper: AllTheProviders, ...options }),
    user,
  }
}

// eslint-disable-next-line react-refresh/only-export-components
export * from '@testing-library/react'
export { customRender as render }
