import { render, screen } from '../../../test/utils.tsx'
import { playerColors } from './player-colors.ts'
import { PlayerForm } from './player-form.tsx'

describe('PlayerForm', () => {
  it('should create a player', async () => {
    const onSubmit = vi.fn()
    const { user } = render(
      <PlayerForm onSubmit={onSubmit}>
        <button type="submit">submit</button>
      </PlayerForm>,
    )
    await user.click(screen.getByText('submit'))
    expect(onSubmit).toHaveBeenCalledWith({
      id: expect.any(String),
      color: expect.any(String),
      name: expect.any(String),
    })
  })

  it('should update a player', async () => {
    const onSubmit = vi.fn()
    const initialValues = {
      id: '1',
      color: playerColors[0],
      name: 'Player 1',
    }
    const { user } = render(
      <PlayerForm onSubmit={onSubmit} initialValues={initialValues}>
        <button type="submit">submit</button>
      </PlayerForm>,
    )

    await user.type(
      screen.getByLabelText('Player name', { selector: 'input' }),
      'Updated player name',
    )

    await user.click(screen.getByLabelText('Select player color pink'))

    await user.click(screen.getByText('submit'))
    expect(onSubmit).toHaveBeenCalledWith({
      id: expect.any(String),
      color: expect.stringMatching(/pink/),
      name: 'Updated player name',
    })
  })
})
