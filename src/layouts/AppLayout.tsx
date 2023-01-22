import { BaseLayout, BaseLayoutProps } from "./BaseLayout"

export interface AppLayoutProps extends BaseLayoutProps {}

export const AppLayout = ({ children }: AppLayoutProps) => (
  <BaseLayout>{children}</BaseLayout>
)
