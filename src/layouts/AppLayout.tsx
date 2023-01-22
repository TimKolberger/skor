import { BaseLayout, BaseLayoutProps } from "./BaseLayout"

export type AppLayoutProps = BaseLayoutProps

export const AppLayout = ({ children }: AppLayoutProps) => (
  <BaseLayout>{children}</BaseLayout>
)
