import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Button,
  VStack,
} from "@chakra-ui/react"
import type { ReactNode } from "react"
import { ErrorBoundary, type FallbackProps } from "react-error-boundary"

const ErrorFallback = ({ error, resetErrorBoundary }: FallbackProps) => (
  <Alert
    status="error"
    data-theme="light"
    variant="solid"
    flexDirection="column"
    alignItems="center"
    justifyContent="center"
    textAlign="center"
    gap="3"
    py="8"
  >
    <VStack gap="2">
      <AlertIcon boxSize="10" mr={0} />
      <AlertTitle mt={4} mb={1} fontSize="lg">
        Oopsi doopsi - something went wrong
      </AlertTitle>
    </VStack>
    <AlertDescription as="pre" maxWidth="sm">
      {error.message}
    </AlertDescription>
    <Button onClick={resetErrorBoundary}>Try again</Button>
  </Alert>
)

export interface AppErrorBoundaryProps {
  children?: ReactNode
}

export const AppErrorBoundary = ({ children }: AppErrorBoundaryProps) => (
  <ErrorBoundary
    FallbackComponent={ErrorFallback}
    onReset={() => {
      // force page reload and bypass cache
      window.location.assign(window.location.href)
    }}
  >
    {children}
  </ErrorBoundary>
)
