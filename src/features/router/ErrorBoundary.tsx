import { ButtonLink } from '../../components/button.tsx'
import { HeaderMenu } from '../../layout/header-menu.tsx'
import {
  AppLayout,
  AppLayoutContent,
  AppLayoutHeader,
} from '../../layout/layout.tsx'
import { NotFoundError } from './not-found-error.ts'
import { useRouteError } from 'react-router-dom'

export const ErrorBoundary = () => {
  const error = useRouteError()
  const defaultBackLink = '/'

  if (error instanceof NotFoundError) {
    return (
      <AppLayout>
        <AppLayoutHeader backLink={defaultBackLink} title="Page not found">
          <HeaderMenu />
        </AppLayoutHeader>
        <AppLayoutContent variant="center">
          <div className="flex flex-col gap-10">
            <h2 className="text-center text-9xl font-black uppercase">404</h2>
            <p>{error.message}</p>
            <ButtonLink variant="primary" to={defaultBackLink}>
              Start over
            </ButtonLink>
          </div>
        </AppLayoutContent>
      </AppLayout>
    )
  }

  if (error instanceof Error) {
    return (
      <AppLayout>
        <AppLayoutHeader backLink={defaultBackLink} title="Error occurred">
          <HeaderMenu />
        </AppLayoutHeader>
        <AppLayoutContent variant="center">
          <div className="flex flex-col gap-10">
            <h2 className="text-center text-6xl font-black uppercase">
              Unknown error
            </h2>
            <p>{error.message}</p>
            <ButtonLink variant="primary" to={defaultBackLink}>
              Start over
            </ButtonLink>
          </div>
        </AppLayoutContent>
      </AppLayout>
    )
  }
}
