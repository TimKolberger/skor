import {
  chakra,
  Icon,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react"
import * as React from "react"
import { FaGithub } from "react-icons/fa"
import {
  FiActivity,
  FiInfo,
  FiMoreVertical,
  FiSettings,
  FiTrendingDown,
  FiTrendingUp,
  FiUserPlus,
  FiUsers,
} from "react-icons/fi"
import { Link } from "react-router-dom"

import { Header } from "../../layouts/Header"
import { linker } from "../navigation/linker"

export type Sort = "asc" | "desc"

export interface GameScoresHeaderProps {
  sort: Sort
  onSort: (sort: Sort) => void
  onDeleteAllPlayers: () => void
}

export const GameScoresHeader = ({
  onSort,
  sort,
  onDeleteAllPlayers,
}: GameScoresHeaderProps) => (
  <Header
    actionButtons={
      <>
        <chakra.li>
          <IconButton
            variant="ghost"
            fontSize="2xl"
            icon={<Icon as={sort === "asc" ? FiTrendingUp : FiTrendingDown} />}
            aria-label="Sort"
            onClick={() => onSort(sort === "asc" ? "desc" : "asc")}
          />
        </chakra.li>
        <chakra.li>
          <IconButton
            as={Link}
            to={linker.addPlayer()}
            variant="ghost"
            fontSize="2xl"
            icon={<Icon as={FiUserPlus} />}
            aria-label="AddPlayerPage User"
          />
        </chakra.li>
        <chakra.li>
          <Menu>
            <MenuButton
              as={IconButton}
              variant="ghost"
              fontSize="2xl"
              icon={<Icon as={FiMoreVertical} />}
              aria-label="Menu"
            />
            <MenuList>
              <MenuItem
                icon={<Icon as={FiActivity} fontSize="lg" display="block" />}
                as={Link}
                to={linker.setScores()}
              >
                Set all Scores
              </MenuItem>
              <MenuItem
                icon={<Icon as={FiUsers} fontSize="lg" display="block" />}
                onClick={onDeleteAllPlayers}
              >
                Delete all Players
              </MenuItem>
              <MenuItem
                icon={<Icon as={FaGithub} fontSize="lg" display="block" />}
                as="a"
                href={linker.githubRepo()}
                target="_blank"
                rel="noopener"
              >
                Open Source on GitHub
              </MenuItem>
              <MenuItem
                icon={<Icon as={FiInfo} fontSize="lg" display="block" />}
                as={Link}
                to={linker.legalNotice()}
              >
                Legal Notice
              </MenuItem>
              <MenuItem
                icon={<Icon as={FiSettings} fontSize="lg" display="block" />}
                as={Link}
                to={linker.settings()}
              >
                Settings
              </MenuItem>
            </MenuList>
          </Menu>
        </chakra.li>
      </>
    }
  ></Header>
)
