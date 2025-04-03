"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import {
  BarChart,
  Calendar,
  ImageIcon,
  LayoutDashboard,
  LogOut,
  MessageSquare,
  Menu,
  Settings,
  Users,
  X,
  FileText,
  BookOpen,
  MapPin,
} from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { ThemeToggle } from "@/components/theme-toggle"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const pathname = usePathname()
  const { user, logout } = useAuth()

  // Close sidebar when route changes on mobile
  useEffect(() => {
    setSidebarOpen(false)
  }, [pathname])

  // Navigation items with nested structure
  const navigation = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Bookings", href: "/admin/bookings", icon: Calendar },
    { name: "Categories", href: "/admin/knowledge-hub/categories", icon: FileText },
    { name: "Authors", href: "/admin/knowledge-hub/authors", icon: MessageSquare },
    { name: "Articles", href: "/admin/knowledge-hub/articles", icon: BookOpen },
    { name: "Media Library", href: "/admin/media", icon: ImageIcon },
    { name: "Users", href: "/admin/users", icon: Users },
    { name: "Locations", href: "/admin/locations", icon: MapPin },
    { name: "Analytics", href: "/admin/analytics", icon: BarChart },
    { name: "Settings", href: "/admin/settings", icon: Settings },
  ]

  return (
    <div className="min-h-screen bg-zinc-950 dark:bg-zinc-950 light:bg-white">
      {/* Mobile sidebar toggle */}
      <div className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between p-4 bg-zinc-900 dark:bg-zinc-900 light:bg-zinc-100 lg:hidden">
        <div className="flex items-center">
          <button
            type="button"
            className="p-2 text-white dark:text-white light:text-zinc-900 rounded-md focus:outline-none"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <h1 className="ml-2 text-xl font-bold dark:text-white light:text-zinc-900">AESTHETIC LAB</h1>
        </div>

        {/* User menu (mobile) */}
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <div className="relative">
            <button
              onClick={logout}
              className="flex items-center gap-2 p-2 text-white dark:text-white light:text-zinc-900 rounded-md hover:bg-zinc-800 dark:hover:bg-zinc-800 light:hover:bg-zinc-200"
            >
              <LogOut size={18} />
              <span className="sr-only">Logout</span>
            </button>
          </div>
        </div>
      </div>

      {/* Sidebar for desktop */}
      <div className="fixed inset-y-0 left-0 z-50 hidden w-64 bg-zinc-900 dark:bg-zinc-900 light:bg-zinc-100 lg:block">
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between h-16 px-6 border-b border-zinc-800 dark:border-zinc-800 light:border-zinc-300">
            <h1 className="text-xl font-bold tracking-wider dark:text-white light:text-zinc-900">
              <span className="block">AESTHETIC</span>
              <span className="block">LAB</span>
            </h1>
            <ThemeToggle />
          </div>

          {/* Navigation */}
          <div className="flex-1 px-4 py-6 overflow-y-auto">
            <nav className="space-y-1">
              {navigation.map((item) =>
                !item.children ? (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex items-center px-4 py-3 text-sm rounded-md ${
                      pathname === item.href
                        ? "bg-[hsl(var(--gold))] text-black font-medium"
                        : "text-zinc-300 dark:text-zinc-300 light:text-zinc-700 hover:bg-zinc-800 dark:hover:bg-zinc-800 light:hover:bg-zinc-200"
                    }`}
                  >
                    <item.icon size={18} className="mr-3 flex-shrink-0" />
                    {item.name}
                  </Link>
                ) : (
                  <NavGroup key={item.name} item={item} pathname={pathname} />
                ),
              )}
            </nav>
          </div>

          {/* User section */}
          <div className="p-4 border-t border-zinc-800 dark:border-zinc-800 light:border-zinc-300">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 rounded-full bg-[hsl(var(--gold))] flex items-center justify-center">
                  <span className="text-black font-semibold">{user?.name?.charAt(0) || "A"}</span>
                </div>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium dark:text-white light:text-zinc-900">{user?.name || "Admin User"}</p>
                <p className="text-xs text-zinc-500">{user?.role || "Administrator"}</p>
              </div>
              <button
                onClick={logout}
                className="ml-auto p-1 text-zinc-400 hover:text-white dark:hover:text-white light:hover:text-zinc-900"
              >
                <LogOut size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile sidebar */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="fixed inset-0 bg-black/80" onClick={() => setSidebarOpen(false)}></div>
          <div className="fixed inset-y-0 left-0 z-40 w-64 bg-zinc-900 dark:bg-zinc-900 light:bg-zinc-100">
            <div className="flex flex-col h-full">
              {/* Logo */}
              <div className="flex items-center justify-between h-16 px-6 border-b border-zinc-800 dark:border-zinc-800 light:border-zinc-300">
                <h1 className="text-xl font-bold tracking-wider dark:text-white light:text-zinc-900">
                  <span className="block">AESTHETIC</span>
                  <span className="block">LAB</span>
                </h1>
                <button
                  type="button"
                  className="p-2 text-white dark:text-white light:text-zinc-900 rounded-md focus:outline-none"
                  onClick={() => setSidebarOpen(false)}
                >
                  <X size={20} />
                </button>
              </div>

              {/* Navigation */}
              <div className="flex-1 px-4 py-6 overflow-y-auto">
                <nav className="space-y-1">
                  {navigation.map((item) =>
                    !item.children ? (
                      <Link
                        key={item.name}
                        href={item.href}
                        className={`flex items-center px-4 py-3 text-sm rounded-md ${
                          pathname === item.href
                            ? "bg-[hsl(var(--gold))] text-black font-medium"
                            : "text-zinc-300 dark:text-zinc-300 light:text-zinc-700 hover:bg-zinc-800 dark:hover:bg-zinc-800 light:hover:bg-zinc-200"
                        }`}
                      >
                        <item.icon size={18} className="mr-3 flex-shrink-0" />
                        {item.name}
                      </Link>
                    ) : (
                      <NavGroup key={item.name} item={item} pathname={pathname} />
                    ),
                  )}
                </nav>
              </div>

              {/* Theme toggle in mobile sidebar */}
              <div className="px-4 py-2 border-t border-zinc-800 dark:border-zinc-800 light:border-zinc-300">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium dark:text-white light:text-zinc-900">Theme</span>
                  <ThemeToggle />
                </div>
              </div>

              {/* User section */}
              <div className="p-4 border-t border-zinc-800 dark:border-zinc-800 light:border-zinc-300">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 rounded-full bg-[hsl(var(--gold))] flex items-center justify-center">
                      <span className="text-black font-semibold">{user?.name?.charAt(0) || "A"}</span>
                    </div>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium dark:text-white light:text-zinc-900">
                      {user?.name || "Admin User"}
                    </p>
                    <p className="text-xs text-zinc-500">{user?.role || "Administrator"}</p>
                  </div>
                  <button
                    onClick={logout}
                    className="ml-auto p-1 text-zinc-400 hover:text-white dark:hover:text-white light:hover:text-zinc-900"
                  >
                    <LogOut size={18} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main content */}
      <div className="lg:pl-64">
        <div className="pt-16 lg:pt-0">{children}</div>
      </div>
    </div>
  )
}

// Navigation group component with dropdown
function NavGroup({ item, pathname }: { item: any; pathname: string }) {
  const [isOpen, setIsOpen] = useState(false)

  // Auto-expand if a child route is active
  useEffect(() => {
    if (item.children && item.children.some((child: any) => pathname === child.href)) {
      setIsOpen(true)
    }
  }, [item.children, pathname])

  return (
    <div className="space-y-1">
      <button
        className="flex items-center justify-between w-full px-4 py-3 text-sm text-zinc-300 dark:text-zinc-300 light:text-zinc-700 rounded-md hover:bg-zinc-800 dark:hover:bg-zinc-800 light:hover:bg-zinc-200"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center">
          <item.icon size={18} className="mr-3 flex-shrink-0" />
          {item.name}
        </div>
        <svg
          className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="pl-10 space-y-1">
          {item.children.map((child: any) => (
            <Link
              key={child.name}
              href={child.href}
              className={`flex items-center px-4 py-2 text-sm rounded-md ${
                pathname === child.href
                  ? "bg-[hsl(var(--gold))] text-black font-medium"
                  : "text-zinc-400 dark:text-zinc-400 light:text-zinc-600 hover:bg-zinc-800 dark:hover:bg-zinc-800 light:hover:bg-zinc-200 hover:text-zinc-200 dark:hover:text-zinc-200 light:hover:text-zinc-900"
              }`}
            >
              {child.name}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

