import { chakra, Tab, TabList, Tabs } from "@chakra-ui/react"
import * as React from "react"

const tabs = [
  {
    type: "add",
    tab: (
      <Tab textTransform="uppercase" color="gray.50">
        Add
      </Tab>
    ),
  },
  {
    type: "sub",
    tab: (
      <Tab textTransform="uppercase" color="gray.50">
        Subtract
      </Tab>
    ),
  },
  {
    type: "set",
    tab: (
      <Tab textTransform="uppercase" color="gray.50">
        Set
      </Tab>
    ),
  },
] as const

export type ScoreOperator = typeof tabs[number]["type"]

export interface ScoreOperatorFormFieldProps {
  value: ScoreOperator
  onChange: (value: ScoreOperator) => void
}

export const ScoreOperatorFormField = ({
  value,
  onChange,
}: ScoreOperatorFormFieldProps) => (
  <Tabs
    isFitted
    variant="soft-rounded"
    colorScheme="gray"
    transitionDuration="0"
    defaultIndex={tabs.findIndex((tab) => tab.type === value)}
    onChange={(index) => {
      const type = tabs[index].type
      onChange?.(type)
    }}
  >
    <chakra.div display="flex" gap="6" flexDirection="column">
      <TabList>
        {tabs.map(({ tab, type }) => (
          <React.Fragment key={type}>{tab}</React.Fragment>
        ))}
      </TabList>
    </chakra.div>
  </Tabs>
)
