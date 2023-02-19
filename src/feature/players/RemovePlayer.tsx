import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  Icon,
  IconButton,
  useDisclosure,
} from "@chakra-ui/react"
import * as React from "react"
import { FiUserX } from "react-icons/fi"
import { Player, usePlayers } from "./usePlayers"

export interface RemovePlayerProps {
  onRemove?: () => void | Promise<void>
  player: Pick<Player, "id" | "name">
}

export const RemovePlayer = ({ onRemove, player }: RemovePlayerProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = React.useRef<HTMLButtonElement>(null)
  const players = usePlayers()

  const handleRemove = async () => {
    const index = players.state.findIndex((p) => p.id === player.id)
    players.delete(index, 1)
    await onRemove?.()
    onClose()
  }

  return (
    <>
      <IconButton
        colorScheme="red"
        onClick={onOpen}
        variant="ghost"
        fontSize="2xl"
        icon={<Icon as={FiUserX} fontSize="2xl" />}
        aria-label="Remove player"
      />

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete player <i>{player.name}</i>
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter
              display="flex"
              flexDirection="row-reverse"
              justifyContent="flex-start"
              gap="3"
            >
              <Button colorScheme="red" onClick={handleRemove}>
                Remove
              </Button>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  )
}
