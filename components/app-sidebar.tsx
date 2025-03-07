'use client'

import * as React from "react"
import {
  AudioWaveform,
  // BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  // Map,
  PieChart,
  // Settings2,
  SquareTerminal,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"

// This is sample data.
const data = {
  teams: [
    {
      name: "Governance",
      logo: GalleryVerticalEnd,
      plan: "Performance Monitoring",
    },
    {
      name: "Privatisation",
      logo: AudioWaveform,
      plan: "Restructuring",
    },
    {
      name: "Outsourcing",
      logo: Command,
      plan: "Commercialization",
    },
  ],
  navMain: [
    {
      title: "Performance Monitoring",
      url: "/dashboard/monitoring",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "Key Performance Indicators",
          url: "/dashboard/monitoring/kpis",
        },
        {
          title: "Compare Entities-(KPI)",
          url: "/dashboard/monitoring/kpis-compare",
        },
        {
          title: "Income Statements",
          url: "/dashboard/monitoring/income-statements",
        },
      ],
    },
    {
      title: "SOE",
      url: "/board",
      icon: Bot,
      items: [
        {
          title: "Vacancies",
          url: "/dashboard/board/vacancies",
        },
        {
          title: "My Applications",
          url: "/dashboard/board/my-applications",
        },
        {
          title: "Applications",
          url: "/dashboard/board/applications",
        },
        {
          title: "State Owned Entities",
          url: "/dashboard/board/soe",
        },
      ],
    },
    // {
    //   title: "Data Inventory",
    //   url: "/data",
    //   icon: Bot,
    //   items: [
    //     {
    //       title: "Create",
    //       url: "/data/create",
    //     },
    //     {
    //       title: "Inventory",
    //       url: "/data/inventory",
    //     },
    //     {
    //       title: "Categories",
    //       url: "#",
    //     },
    //   ],
    // },
    {
      title: "User Management",
      url: "/dashboard/user-management",
      icon: Bot,
      items: [
        {
          title: "People",
          url: "/dashboard/user-management/people",
        },
        {
          title: "Roles",
          url: "/dashboard/user-management/roles",
        },
      ],
    },
    // {
    //   title: "Knowledge Articles",
    //   url: "#",
    //   icon: BookOpen,
    //   items: [
    //     {
    //       title: "Create",
    //       url: "#",
    //     },
    //     {
    //       title: "Articles",
    //       url: "#",
    //     },
    //     {
    //       title: "Categories",
    //       url: "#",
    //     },
    //   ],
    // },
    // {
    //   title: "Settings",
    //   url: "#",
    //   icon: Settings2,
    //   items: [
    //     {
    //       title: "General",
    //       url: "#",
    //     },
    //     {
    //       title: "Team",
    //       url: "#",
    //     },
    //   ],
    // },
  ],
  projects: [
    {
      name: "Privatization",
      url: "/dashboard/projects/privatization",
      icon: Frame,
    },
    {
      name: "Outsourcing",
      url: "/dashboard/projects/outsourcing",
      icon: PieChart,
    },
    // {
    //   name: "Corporate Governance",
    //   url: "#",
    //   icon: Map,
    // },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}