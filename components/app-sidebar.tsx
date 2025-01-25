"use client"

import * as React from "react"
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
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
  user: {
    name: "bopaki",
    email: "bopaki@peepa.com",
    avatar: "/avatars/shadcn.jpg",
  },
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
      title: "Board",
      url: "/board",
      icon: Bot,
      items: [
        {
          title: "Create",
          url: "/board/create",
        },
        {
          title: "Audit Committee",
          url: "/board/committee",
        },
        {
          title: "Social & Ethics Committee",
          url: "/board/committee",
        },
        {
          title: "Risk Committee",
          url: "/board/committee",
        },
        {
          title: "Renumeration Committee",
          url: "/board/committee",
        },
        {
          title: "Nomination Committee",
          url: "/board/committee",
        },
        {
          title: "Gorvernance Committee",
          url: "/board/committee",
        },
        {
          title: "IT Steering Committee",
          url: "/board/committee",
        },
      ],
    },
    {
      title: "Data Inventory",
      url: "/data",
      icon: Bot,
      items: [
        {
          title: "Create",
          url: "/data/create",
        },
        {
          title: "Inventory",
          url: "/data/inventory",
        },
        {
          title: "Categories",
          url: "#",
        },
      ],
    },
    {
      title: "Models",
      url: "#",
      icon: Bot,
      items: [
        {
          title: "Genesis",
          url: "#",
        },
        {
          title: "Explorer",
          url: "#",
        },
        {
          title: "Quantum",
          url: "#",
        },
      ],
    },
    {
      title: "Knowledge Articles",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: "Create",
          url: "#",
        },
        {
          title: "Articles",
          url: "#",
        },
        {
          title: "Categories",
          url: "#",
        },
      ],
    },
    // {
    //   title: "Documentation",
    //   url: "#",
    //   icon: BookOpen,
    //   items: [
    //     {
    //       title: "Introduction",
    //       url: "#",
    //     },
    //     {
    //       title: "Get Started",
    //       url: "#",
    //     },
    //     {
    //       title: "Tutorials",
    //       url: "#",
    //     },
    //     {
    //       title: "Changelog",
    //       url: "#",
    //     },
    //   ],
    // },
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "General",
          url: "#",
        },
        {
          title: "Team",
          url: "#",
        },
      ],
    },
  ],
  projects: [
    {
      name: "Privatization",
      url: "#",
      icon: Frame,
    },
    {
      name: "Outsourcing",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Corporate Governance",
      url: "#",
      icon: Map,
    },
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
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
