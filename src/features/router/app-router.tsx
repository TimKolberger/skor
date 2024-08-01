import { ErrorBoundary } from './ErrorBoundary'
import type { FC } from 'react'
import { Fragment } from 'react'
import {
  createBrowserRouter,
  type RouteObject,
  RouterProvider,
} from 'react-router-dom'

const pages = import.meta.glob<{
  /**
   * Page Component
   */
  default: FC
  /**
   * Layout to wrap the page in
   * @default Fragment
   */
  Layout?: FC
  /**
   * ErrorBoundary to catch errors in the page
   */
  ErrorBoundary?: RouteObject['ErrorBoundary']
  action?: RouteObject['action']
  loader?: RouteObject['loader']
}>('../../pages/**/*', {
  eager: true,
})

const routes = Object.keys(pages).reduce<RouteObject[]>((allRoutes, path) => {
  const fileName = path.match(/\/pages\/(.*)\.tsx$/)?.[1]
  if (!fileName) {
    return allRoutes
  }

  const normalizedPathName = fileName
    .replace(/\$/g, ':')
    .replace(/\/index/g, '')

  const Element = pages[path].default
  const RouteErrorBoundary = pages[path].ErrorBoundary ?? ErrorBoundary
  const Layout = pages[path].Layout ?? Fragment

  allRoutes.push({
    path: normalizedPathName === 'index' ? '/' : `/${normalizedPathName}`,
    element: (
      <Layout>
        <Element />
      </Layout>
    ),
    loader: pages[path]?.loader,
    action: pages[path]?.action,
    errorElement: RouteErrorBoundary ? <RouteErrorBoundary /> : undefined,
  })
  return allRoutes
}, [])

const router = createBrowserRouter(routes)

export const AppRouter = () => {
  return <RouterProvider router={router} />
}
