import * as fs from "node:fs"

const tsconfig = JSON.parse(fs.readFileSync("./tsconfig.json").toString())

const config = {
  moduleNameMapper: {
    "\\.(svg|css|mp3)$": "<rootDir>/src/__mocks__/fileMock.js",
  },
  setupFilesAfterEnv: ["<rootDir>/test/jest-setup.ts"],
  testEnvironment: "jest-environment-jsdom",
  transform: {
    "^.+\\.(t|j)sx?$": [
      "@swc/jest",
      {
        jsc: {
          baseUrl: tsconfig.compilerOptions.baseUrl,
          paths: tsconfig.compilerOptions.paths,
          transform: {
            react: {
              runtime: "automatic",
            },
          },
        },
      },
    ],
  },
}

export default config
