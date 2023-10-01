import { render, type RenderOptions } from '@testing-library/react'
import * as React from 'react'
import { MemoryRouter, type MemoryRouterProps } from 'react-router-dom'

const customRender = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, 'wrapper'> & {
    initialEntries?: MemoryRouterProps['initialEntries']
  },
) => {
  const AllTheProviders: React.FC<{
    children: React.ReactNode
  }> = ({ children }) => {
    return (
      <React.Suspense>
        <MemoryRouter initialEntries={options?.initialEntries}>
          {children}
        </MemoryRouter>
      </React.Suspense>
    )
  }

  return render(ui, { wrapper: AllTheProviders, ...options })
}

// eslint-disable-next-line react-refresh/only-export-components
export * from '@testing-library/react'
export { customRender as render }
