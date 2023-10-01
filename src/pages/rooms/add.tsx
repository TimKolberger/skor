import { IconButtonLink } from '../../components/button.tsx'
import { RoomSchema, useRoomStore } from '../../features/rooms/use-rooms.ts'
import {
  AppLayout,
  AppLayoutContent,
  AppLayoutHeader,
} from '../../layout/layout.tsx'
import { type ReactNode, useEffect } from 'react'
import { FiChevronLeft } from 'react-icons/fi'
import {
  type ActionFunction,
  Form,
  useActionData,
  useNavigate,
  useNavigation,
} from 'react-router-dom'
import { safeParseAsync } from 'valibot'

export const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <AppLayout>
      <AppLayoutHeader title="Add Room">
        <IconButtonLink to="/rooms">
          <FiChevronLeft />
        </IconButtonLink>
      </AppLayoutHeader>
      <AppLayoutContent variant="max-width">{children}</AppLayoutContent>
    </AppLayout>
  )
}
export const action = (async ({ request }) => {
  const addRoom = useRoomStore.getState().addRoom
  const formData = await request.formData()
  const name = formData.get('name') as string
  const parseResult = await safeParseAsync(RoomSchema, { name })

  if (parseResult.success) {
    addRoom(parseResult.output)
  }

  return parseResult
}) satisfies ActionFunction

export default function AddRoomPage() {
  const navigation = useNavigation()
  const navigate = useNavigate()
  const actionData = useActionData() as Awaited<
    ReturnType<typeof action> | undefined
  >
  const loading = navigation.state === 'submitting'

  useEffect(() => {
    if (actionData?.success) {
      navigate(`/rooms/${actionData.output.id}`)
    }
  }, [actionData, navigate])

  return (
    <Form method="POST">
      <label htmlFor="name">
        Name
        <input type="text" name="name" placeholder="Name" />
      </label>
      <button type="submit">Add room</button>
      {loading && <div>loading...</div>}
      {actionData ? <pre>{JSON.stringify(actionData, null, 2)}</pre> : null}
    </Form>
  )
}
