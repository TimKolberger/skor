export type RouteConfigRecord<
  RouteName extends string = string,
  Path extends string = string
> = {
  [Key in RouteName]: Path
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

export function createLinker<Routes extends RouteConfigRecord>(routes: Routes) {
  return Object.entries(routes).reduce(
    (previousValue, [name, route]) => {
      const createUrl: CreateUrlFunctionWithParams<string> = (params) => {
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
      }

      createUrl.definition = route
      ;(previousValue as any)[name] = createUrl
      return previousValue
    },
    {} as {
      [Key in keyof Routes]: keyof RouteParams<Routes[Key]> extends ""
        ? CreateUrlFunctionWithoutParams<Routes[Key]>
        : CreateUrlFunctionWithParams<Routes[Key]>
    }
  )
}
