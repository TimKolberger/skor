import { Alert, AlertTitle } from "@chakra-ui/react"

import { FullModalLayout } from "../../../layouts/FullModalLayout"
import { Main } from "../../../layouts/Main"

export default function NotFoundPage() {
  return (
    <FullModalLayout>
      <Main>
        <Alert>
          <AlertTitle>Page not found</AlertTitle>
        </Alert>
      </Main>
    </FullModalLayout>
  )
}
