import { isChakraTheme } from "@chakra-ui/react"

import { theme } from "./theme"

describe("Theme", () => {
  it("should be a chakra ui theme", () => {
    expect(isChakraTheme(theme)).toBe(true)
  })
})
