import { render } from '../../test/utils'
import { AppLayout, AppLayoutContent, AppLayoutHeader } from './layout'
import { screen, within } from '@testing-library/react'

describe('Layout', () => {
  it('should render', () => {
    render(
      <AppLayout>
        <AppLayoutHeader>
          <span>in header</span>
        </AppLayoutHeader>
        <AppLayoutContent>
          <span>in content</span>
        </AppLayoutContent>
      </AppLayout>,
    )

    screen.getByText('in header')
    within(screen.getByRole('main')).getByText('in content')
  })

  it('should render with a backlink', () => {
    render(
      <AppLayout>
        <AppLayoutHeader backLink="/">
          <span>in header</span>
        </AppLayoutHeader>
      </AppLayout>,
    )

    screen.getByRole('link', { name: 'Back' })
  })
})
