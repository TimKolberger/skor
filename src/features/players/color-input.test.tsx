import { render, screen } from '../../../test/utils'
import { ColorInput } from './color-input'
import { playerColors } from './player-colors'
import { expect } from 'vitest'

describe('ColorInput', () => {
  it('should allow keyboard navigation', async () => {
    const onChange = vi.fn()
    const { user } = render(
      <ColorInput value={playerColors[0]} onChange={onChange} />,
    )
    await user.click(screen.getByLabelText('Select player color gray'))
    await user.keyboard('{arrowright}')
    expect(onChange).toHaveBeenLastCalledWith(playerColors[1])
    await user.keyboard('{arrowdown}')
    expect(onChange).toHaveBeenLastCalledWith(playerColors[4])
    await user.keyboard('{arrowleft}')
    expect(onChange).toHaveBeenLastCalledWith(playerColors[15])
    await user.keyboard('{arrowup}')
    expect(onChange).toHaveBeenLastCalledWith(playerColors[12])
  })
})
