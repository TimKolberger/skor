import { extendTheme } from "@chakra-ui/react"
import "@fontsource/source-code-pro/300.css"
import "@fontsource/source-code-pro/400.css"
import "@fontsource/source-code-pro/900.css"

import { colors } from "./colors"

export const theme = extendTheme({
  fonts: {
    heading: `'Source Code Pro', sans-serif`,
    body: `'Source Code Pro', sans-serif`,
  },
  config: {
    initialColorMode: "dark",
  },
  colors,
  semanticTokens: {
    colors: {
      "chakra-body-text": "gray.50",
      "chakra-body-bg": "cyan.500",
    },
  },
  styles: {
    global: {
      "*": {
        WebkitTapHighlightColor: "rgba(0, 0, 0, 0)",
      },
      "html, body, #root": {
        display: "flex",
        flexDirection: "column",
        flex: "1",
        minHeight: "full",
      },
    },
  },
  components: {
    Button: {
      baseStyle: {
        textTransform: "uppercase",
      },
    },
    Input: {
      variants: {
        filled: {
          field: {
            _placeholder: {
              color: "whiteAlpha.700",
            },
            _focusVisible: {
              outline: "0",
              borderColor: "whiteAlpha.700",
            },
          },
        },
      },
    },
    NumberInput: {
      variants: {
        filled: {
          field: {
            _placeholder: {
              color: "whiteAlpha.700",
            },
            _focusVisible: {
              outline: "0",
              borderColor: "whiteAlpha.700",
            },
          },
        },
      },
    },
  },
})
