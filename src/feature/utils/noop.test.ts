import { noop } from "./noop"

describe("util", () => {
  describe("noop", () => {
    it("should no literally nothing", () => {
      expect(noop()).toBe(undefined)
    })
  })
})
