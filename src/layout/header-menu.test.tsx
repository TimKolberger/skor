import { render, screen } from '../../test/utils.tsx'
import { HeaderMenu } from './header-menu.tsx'

describe('Header Menu', () => {
  it('should render', async () => {
    const { user } = render(<HeaderMenu />)
    await user.click(screen.getByRole('button', { name: 'Open menu' }))
    expect(screen.getByRole('menu')).toBeInTheDocument()
  })
})
