"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { BarChart3, BookOpen, Calendar, FileText, Image, MessageSquare, Users } from "lucide-react"

export default function AdminDashboardClient() {
  const [isLoading, setIsLoading] = useState(true)
  const [stats, setStats] = useState({
    totalBookings: 0,
    activeUsers: 0,
    totalArticles: 0,
    mediaItems: 0,
  })

  // Simulate loading data
  useEffect(() => {
    const timer = setTimeout(() => {
      setStats({
        totalBookings: 128,
        activeUsers: 45,
        totalArticles: 24,
        mediaItems: 156,
      })
      setIsLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  // Quick action links
  const quickActions = [
    {
      title: "Manage Bookings",
      description: "View and manage upcoming appointments",
      icon: Calendar,
      href: "/admin/bookings",
      color: "bg-blue-900/20",
      iconColor: "text-blue-400",
    },
    {
      title: "Manage Articles",
      description: "Create and edit knowledge hub content",
      icon: FileText,
      href: "/admin/knowledge-hub/articles",
      color: "bg-amber-900/20",
      iconColor: "text-amber-400",
    },
    {
      title: "Media Library",
      description: "Upload and organize media assets",
      icon: Image,
      href: "/admin/media",
      color: "bg-purple-900/20",
      iconColor: "text-purple-400",
    },
    {
      title: "User Management",
      description: "Manage user accounts and permissions",
      icon: Users,
      href: "/admin/users",
      color: "bg-green-900/20",
      iconColor: "text-green-400",
    },
  ]

  // Stat cards
  const statCards = [
    {
      title: "Total Bookings",
      value: stats.totalBookings,
      icon: Calendar,
      color: "bg-blue-900/20",
      iconColor: "text-blue-400",
    },
    {
      title: "Active Users",
      value: stats.activeUsers,
      icon: Users,
      color: "bg-green-900/20",
      iconColor: "text-green-400",
    },
    {
      title: "Knowledge Hub Articles",
      value: stats.totalArticles,
      icon: BookOpen,
      color: "bg-amber-900/20",
      iconColor: "text-amber-400",
    },
    {
      title: "Media Items",
      value: stats.mediaItems,
      icon: Image,
      color: "bg-purple-900/20",
      iconColor: "text-purple-400",
    },
  ]

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-zinc-400 mt-1">Welcome to your admin dashboard</p>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((stat, index) => (
          <div key={index} className="bg-zinc-900 rounded-lg p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">{stat.title}</h2>
              <div className={`p-2 rounded-full ${stat.color}`}>
                <stat.icon size={20} className={stat.iconColor} />
              </div>
            </div>

            {isLoading ? (
              <div className="h-8 w-24 bg-zinc-800 animate-pulse rounded"></div>
            ) : (
              <p className="text-3xl font-bold">{stat.value.toLocaleString()}</p>
            )}
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {quickActions.map((action, index) => (
          <Link
            key={index}
            href={action.href}
            className="bg-zinc-900 rounded-lg p-6 shadow-sm hover:bg-zinc-800 transition-colors"
          >
            <div className="flex items-center mb-4">
              <div className={`p-2 rounded-full ${action.color} mr-3`}>
                <action.icon size={20} className={action.iconColor} />
              </div>
              <h3 className="font-semibold">{action.title}</h3>
            </div>
            <p className="text-zinc-400 text-sm">{action.description}</p>
          </Link>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="bg-zinc-900 rounded-lg p-6 mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold">Recent Activity</h2>
          <Link href="/admin/analytics" className="text-[hsl(var(--gold))] hover:underline text-sm flex items-center">
            <span>View Analytics</span>
            <BarChart3 size={16} className="ml-1" />
          </Link>
        </div>

        {isLoading ? (
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-12 bg-zinc-800 animate-pulse rounded"></div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center p-3 bg-zinc-800 rounded-md">
              <div className="p-2 rounded-full bg-blue-900/20 mr-3">
                <Calendar size={16} className="text-blue-400" />
              </div>
              <div>
                <p className="font-medium">New booking created</p>
                <p className="text-sm text-zinc-400">John Smith booked a Personal Training session</p>
              </div>
              <span className="ml-auto text-xs text-zinc-500">2 hours ago</span>
            </div>

            <div className="flex items-center p-3 bg-zinc-800 rounded-md">
              <div className="p-2 rounded-full bg-green-900/20 mr-3">
                <Users size={16} className="text-green-400" />
              </div>
              <div>
                <p className="font-medium">New user registered</p>
                <p className="text-sm text-zinc-400">Emma Johnson created an account</p>
              </div>
              <span className="ml-auto text-xs text-zinc-500">5 hours ago</span>
            </div>

            <div className="flex items-center p-3 bg-zinc-800 rounded-md">
              <div className="p-2 rounded-full bg-amber-900/20 mr-3">
                <MessageSquare size={16} className="text-amber-400" />
              </div>
              <div>
                <p className="font-medium">New article published</p>
                <p className="text-sm text-zinc-400">"10 Tips for Better Recovery" is now live</p>
              </div>
              <span className="ml-auto text-xs text-zinc-500">Yesterday</span>
            </div>

            <div className="flex items-center p-3 bg-zinc-800 rounded-md">
              <div className="p-2 rounded-full bg-purple-900/20 mr-3">
                <Image size={16} className="text-purple-400" />
              </div>
              <div>
                <p className="font-medium">Media uploaded</p>
                <p className="text-sm text-zinc-400">12 new images added to the media library</p>
              </div>
              <span className="ml-auto text-xs text-zinc-500">Yesterday</span>
            </div>

            <div className="flex items-center p-3 bg-zinc-800 rounded-md">
              <div className="p-2 rounded-full bg-blue-900/20 mr-3">
                <Calendar size={16} className="text-blue-400" />
              </div>
              <div>
                <p className="font-medium">Booking updated</p>
                <p className="text-sm text-zinc-400">Michael Brown rescheduled his appointment</p>
              </div>
              <span className="ml-auto text-xs text-zinc-500">2 days ago</span>
            </div>
          </div>
        )}
      </div>

      {/* System Status */}
      <div className="bg-zinc-900 rounded-lg p-6">
        <h2 className="text-xl font-bold mb-6">System Status</h2>

        {isLoading ? (
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-12 bg-zinc-800 animate-pulse rounded"></div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-zinc-800 rounded-md">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                <span>Booking System</span>
              </div>
              <span className="text-green-400 text-sm">Operational</span>
            </div>

            <div className="flex items-center justify-between p-3 bg-zinc-800 rounded-md">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                <span>User Authentication</span>
              </div>
              <span className="text-green-400 text-sm">Operational</span>
            </div>

            <div className="flex items-center justify-between p-3 bg-zinc-800 rounded-md">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                <span>Media Storage</span>
              </div>
              <span className="text-green-400 text-sm">Operational</span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

