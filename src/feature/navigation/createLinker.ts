function entries<T extends {}>(obj: T) {
  type Entries<T> = {
    [K in keyof T]: [K, T[K]]
  }[keyof T][]
  return Object.entries(obj) as Entries<T>
}

export type RouteConfigRecord<RouteName extends string, Path extends string> = {
  readonly [Key in RouteName]: Path
}

type PathSegments<Path extends string> =
  Path extends `${infer SegmentA}/${infer SegmentB}`
    ? ParamOnly<SegmentA> | PathSegments<SegmentB>
    : ParamOnly<Path>
type ParamOnly<Segment extends string> = Segment extends `:${infer Param}`
  ? Param
  : never
type RouteParams<Path extends string> = {
  [Key in PathSegments<Path>]: string | number
}

interface CreateUrlFunctionWithParams<Path extends string> {
  (params: RouteParams<Path>): string

  definition: Path
}

interface CreateUrlFunctionWithoutParams<Path extends string> {
  (): string

  definition: Path
}

type UrlFactory<
  Routes extends RouteConfigRecord<string, Path>,
  Path extends string,
  Key extends keyof Routes
> = keyof RouteParams<Routes[Key]> extends ""
  ? CreateUrlFunctionWithoutParams<Routes[Key]>
  : CreateUrlFunctionWithParams<Routes[Key]>

export function createLinker<
  Routes extends RouteConfigRecord<RouteName, Path>,
  RouteName extends string,
  Path extends string
>(routes: Routes) {
  return entries(routes).reduce(
    (previousValue, [name, route]) => {
      const createUrl = ((params) => {
        const parts = route.split("/")
        return parts
          .map((part) => {
            if (part.startsWith(":")) {
              const fieldName = part.slice(1)
              return (params as any)[fieldName]
            }
            return part
          })
          .join("/")
      }) as UrlFactory<Routes, Path, typeof name>

      createUrl.definition = route
      previousValue[name] = createUrl
      return previousValue
    },
    {} as {
      [Key in keyof Routes]: UrlFactory<Routes, Path, Key>
    }
  )
}
