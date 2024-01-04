import { render, screen } from '../../../test/utils.tsx'
import { ShareRoom } from './share-room.tsx'
import { expect } from 'vitest'

describe('ShareRoom', () => {
  beforeEach(() => {
    Object.assign(window, { origin: 'https://example.com' })
  })

  const room = {
    id: '1',
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-01-01T00:00:00.000Z',
    name: 'Room 1',
  }

  it('should share a room', async () => {
    const { user } = render(
      <ShareRoom room={room}>
        <button type="button">open</button>
      </ShareRoom>,
    )
    await user.click(screen.getByText('open'))
  })

  it('should show OS share button if available', async () => {
    navigator.share = vi.fn()
    const { user } = render(
      <ShareRoom room={room}>
        <button type="button">open</button>
      </ShareRoom>,
    )
    await user.click(screen.getByText('open'))
    expect(screen.getByText('More share options')).toBeInTheDocument()
  })
})
