import { render, screen } from '../../../test/utils'
import { RoomForm } from './room-form'
import { RoomIdInput } from './room-id-input'

describe('RoomForm', () => {
  it('should create a room', async () => {
    const onSubmit = vi.fn()
    const { user } = render(
      <RoomForm onSubmit={onSubmit}>
        <button type="submit">submit</button>
      </RoomForm>,
    )
    await user.click(screen.getByText('submit'))
    expect(onSubmit).toHaveBeenCalledWith({
      id: expect.any(String),
      createdAt: expect.any(String),
      updatedAt: expect.any(String),
      name: expect.any(String),
    })
  })

  it('should update a room', async () => {
    const onSubmit = vi.fn()
    const initialValues = {
      id: '1',
      createdAt: '2024-01-01T00:00:00.000Z',
      updatedAt: '2024-01-01T00:00:00.000Z',
      name: 'Room 1',
    }
    const { user } = render(
      <RoomForm onSubmit={onSubmit} initialValues={initialValues}>
        <button type="submit">submit</button>
      </RoomForm>,
    )
    await user.click(screen.getByText('submit'))
    expect(onSubmit).toHaveBeenCalledWith(initialValues)
  })

  it('should allow edit the name', async () => {
    const onSubmit = vi.fn()
    const initialValues = {
      id: '1',
      createdAt: '2024-01-01T00:00:00.000Z',
      updatedAt: '2024-01-01T00:00:00.000Z',
      name: 'Room 1',
    }
    const { user } = render(
      <RoomForm onSubmit={onSubmit} initialValues={initialValues}>
        <button type="submit">submit</button>
      </RoomForm>,
    )
    await user.type(
      screen.getByLabelText('Room name', { selector: 'input' }),
      'Updated room name',
    )
    await user.click(screen.getByText('submit'))
    expect(onSubmit).toHaveBeenCalledWith({
      ...initialValues,
      name: 'Updated room name',
    })
  })

  it('should allow submit RoomIdInput', async () => {
    const onSubmit = vi.fn()
    const { user } = render(
      <RoomForm onSubmit={onSubmit}>
        <RoomIdInput />
        <button type="submit">submit</button>
      </RoomForm>,
    )
    await user.type(
      screen.getByLabelText(/Room Id/, { selector: 'input' }),
      'new-room-id',
    )
    await user.click(screen.getByText('submit'))
    expect(onSubmit).toHaveBeenCalledWith({
      id: 'new-room-id',
      createdAt: expect.any(String),
      updatedAt: expect.any(String),
      name: expect.any(String),
    })
  })
})
