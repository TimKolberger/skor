import { render, screen } from '../../../../test/utils'
import { ScoreForm } from './score-form'
import { it } from 'vitest'

describe('ScoreForm', () => {
  it('should have default diff of 1 with operator add', async () => {
    const onSubmit = vi.fn()
    const score = 0
    const { user } = render(<ScoreForm onSubmit={onSubmit} score={score} />)

    expect(screen.getByText('add')).toBeChecked()
    expect(screen.getByText('set')).not.toBeChecked()
    expect(screen.getByText('subtract')).not.toBeChecked()

    await user.click(screen.getByText('Save score'))

    expect(onSubmit).toHaveBeenCalledWith({
      diff: 1,
    })
  })

  it('should allow adding', async () => {
    const onSubmit = vi.fn()
    const score = 1
    const { user } = render(<ScoreForm onSubmit={onSubmit} score={score} />)
    await user.type(
      screen.getByLabelText('Diff', { selector: 'input' }),
      '100',
      { initialSelectionStart: 0, initialSelectionEnd: Infinity },
    )
    await user.click(screen.getByText('Save score'))
    expect(onSubmit).toHaveBeenCalledWith({
      diff: 100,
    })
  })

  it('should allow setting', async () => {
    const onSubmit = vi.fn()
    const score = 1
    const { user } = render(<ScoreForm onSubmit={onSubmit} score={score} />)
    await user.click(screen.getByText('set'))
    await user.type(
      screen.getByLabelText('Diff', { selector: 'input' }),
      '100',
      { initialSelectionStart: 0, initialSelectionEnd: Infinity },
    )
    await user.click(screen.getByText('Save score'))
    expect(onSubmit).toHaveBeenCalledWith({
      diff: 99,
    })
  })

  it('should allow subtracting', async () => {
    const onSubmit = vi.fn()
    const score = 1
    const { user } = render(<ScoreForm onSubmit={onSubmit} score={score} />)
    await user.click(screen.getByText('subtract'))
    await user.type(
      screen.getByLabelText('Diff', { selector: 'input' }),
      '100',
      { initialSelectionStart: 0, initialSelectionEnd: Infinity },
    )
    await user.click(screen.getByText('Save score'))
    expect(onSubmit).toHaveBeenCalledWith({
      diff: -100,
    })
  })
})
