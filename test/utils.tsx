import { render, type RenderOptions } from '@testing-library/react'
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
        <MemoryRouter initialEntries={options?.initialEntries}>
          {children}
        </MemoryRouter>
      </Suspense>
    )
  }

  return render(ui, { wrapper: AllTheProviders, ...options })
}

// eslint-disable-next-line react-refresh/only-export-components
export * from '@testing-library/react'
export { customRender as render }
