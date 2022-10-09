import { createLinker } from "./createLinker"

describe("createLinker", () => {
  it("should create a static link", () => {
    const linker = createLinker({ home: "/home" })
    const link = linker.home()
    expect(link).toBe("/home")
  })

  it("should create a link with a route param", () => {
    const linker = createLinker({ thingDetail: "/thing/:id" })
    const link = linker.thingDetail({ id: 1 })
    expect(link).toBe("/thing/1")
  })

  it("should get the link definition", () => {
    const linker = createLinker({ thingDetail: "/thing/:id" })
    const definition = linker.thingDetail.definition
    expect(definition).toBe("/thing/:id")
  })
})
