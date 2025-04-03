"use client"

import { useState, useEffect } from "react"
import { BarChartIcon, Calendar, ChevronDown, Download, LineChart, PieChart, Users } from "lucide-react"

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState("30d")
  const [isLoading, setIsLoading] = useState(true)

  // Simulate loading data
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Analytics</h1>
          <p className="text-zinc-400 mt-1">Track website performance and user engagement</p>
        </div>

        <div className="flex gap-4">
          {/* Time Range Selector */}
          <div className="relative">
            <button
              className="px-4 py-2 bg-zinc-900 border border-zinc-700 rounded-md flex items-center gap-2"
              onClick={() => document.getElementById("timeRangeDropdown")?.classList.toggle("hidden")}
            >
              <Calendar size={18} />
              {timeRange === "7d" && "Last 7 days"}
              {timeRange === "30d" && "Last 30 days"}
              {timeRange === "90d" && "Last 90 days"}
              {timeRange === "12m" && "Last 12 months"}
              <ChevronDown size={16} />
            </button>

            <div
              id="timeRangeDropdown"
              className="absolute right-0 mt-2 w-48 bg-zinc-900 border border-zinc-700 rounded-md shadow-lg z-10 hidden"
            >
              <div className="py-1">
                <button
                  className={`block w-full text-left px-4 py-2 text-sm ${
                    timeRange === "7d" ? "bg-zinc-800 text-white" : "text-zinc-300 hover:bg-zinc-800"
                  }`}
                  onClick={() => {
                    setTimeRange("7d")
                    document.getElementById("timeRangeDropdown")?.classList.add("hidden")
                  }}
                >
                  Last 7 days
                </button>
                <button
                  className={`block w-full text-left px-4 py-2 text-sm ${
                    timeRange === "30d" ? "bg-zinc-800 text-white" : "text-zinc-300 hover:bg-zinc-800"
                  }`}
                  onClick={() => {
                    setTimeRange("30d")
                    document.getElementById("timeRangeDropdown")?.classList.add("hidden")
                  }}
                >
                  Last 30 days
                </button>
                <button
                  className={`block w-full text-left px-4 py-2 text-sm ${
                    timeRange === "90d" ? "bg-zinc-800 text-white" : "text-zinc-300 hover:bg-zinc-800"
                  }`}
                  onClick={() => {
                    setTimeRange("90d")
                    document.getElementById("timeRangeDropdown")?.classList.add("hidden")
                  }}
                >
                  Last 90 days
                </button>
                <button
                  className={`block w-full text-left px-4 py-2 text-sm ${
                    timeRange === "12m" ? "bg-zinc-800 text-white" : "text-zinc-300 hover:bg-zinc-800"
                  }`}
                  onClick={() => {
                    setTimeRange("12m")
                    document.getElementById("timeRangeDropdown")?.classList.add("hidden")
                  }}
                >
                  Last 12 months
                </button>
              </div>
            </div>
          </div>

          {/* Export Button */}
          <button className="px-4 py-2 bg-zinc-900 border border-zinc-700 rounded-md flex items-center gap-2">
            <Download size={18} />
            Export
          </button>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Page Views */}
        <div className="bg-zinc-900 rounded-lg p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Page Views</h2>
            <div className="p-2 rounded-full bg-blue-900/20">
              <BarChartIcon size={20} className="text-blue-400" />
            </div>
          </div>

          {isLoading ? (
            <div className="h-8 w-24 bg-zinc-800 animate-pulse rounded"></div>
          ) : (
            <>
              <p className="text-3xl font-bold">24,892</p>
              <div className="flex items-center mt-2">
                <span className="text-green-400 text-sm">+12.5%</span>
                <span className="text-zinc-500 text-sm ml-2">vs previous period</span>
              </div>
            </>
          )}
        </div>

        {/* Unique Visitors */}
        <div className="bg-zinc-900 rounded-lg p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Unique Visitors</h2>
            <div className="p-2 rounded-full bg-purple-900/20">
              <Users size={20} className="text-purple-400" />
            </div>
          </div>

          {isLoading ? (
            <div className="h-8 w-24 bg-zinc-800 animate-pulse rounded"></div>
          ) : (
            <>
              <p className="text-3xl font-bold">8,642</p>
              <div className="flex items-center mt-2">
                <span className="text-green-400 text-sm">+8.3%</span>
                <span className="text-zinc-500 text-sm ml-2">vs previous period</span>
              </div>
            </>
          )}
        </div>

        {/* Avg. Session Duration */}
        <div className="bg-zinc-900 rounded-lg p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Avg. Session</h2>
            <div className="p-2 rounded-full bg-amber-900/20">
              <LineChart size={20} className="text-amber-400" />
            </div>
          </div>

          {isLoading ? (
            <div className="h-8 w-24 bg-zinc-800 animate-pulse rounded"></div>
          ) : (
            <>
              <p className="text-3xl font-bold">3:24</p>
              <div className="flex items-center mt-2">
                <span className="text-green-400 text-sm">+5.7%</span>
                <span className="text-zinc-500 text-sm ml-2">vs previous period</span>
              </div>
            </>
          )}
        </div>

        {/* Bounce Rate */}
        <div className="bg-zinc-900 rounded-lg p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Bounce Rate</h2>
            <div className="p-2 rounded-full bg-red-900/20">
              <PieChart size={20} className="text-red-400" />
            </div>
          </div>

          {isLoading ? (
            <div className="h-8 w-24 bg-zinc-800 animate-pulse rounded"></div>
          ) : (
            <>
              <p className="text-3xl font-bold">32.8%</p>
              <div className="flex items-center mt-2">
                <span className="text-red-400 text-sm">+2.1%</span>
                <span className="text-zinc-500 text-sm ml-2">vs previous period</span>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Traffic Overview Chart */}
      <div className="bg-zinc-900 rounded-lg p-6 mb-8">
        <h2 className="text-xl font-semibold mb-6">Traffic Overview</h2>

        {isLoading ? (
          <div className="h-80 bg-zinc-800 animate-pulse rounded"></div>
        ) : (
          <div className="h-80 relative">
            {/* This would be a real chart in a production app */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <LineChart size={48} className="mx-auto mb-4 text-zinc-700" />
                <p className="text-zinc-500">In a real application, this would be an interactive traffic chart.</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Top Pages and Referrers */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Top Pages */}
        <div className="bg-zinc-900 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-6">Top Pages</h2>

          {isLoading ? (
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-12 bg-zinc-800 animate-pulse rounded"></div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-zinc-800 rounded-md">
                <div>
                  <p className="font-medium">/</p>
                  <p className="text-sm text-zinc-400">Homepage</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">5,842</p>
                  <p className="text-sm text-zinc-400">views</p>
                </div>
              </div>

              <div className="flex justify-between items-center p-3 bg-zinc-800 rounded-md">
                <div>
                  <p className="font-medium">/services</p>
                  <p className="text-sm text-zinc-400">Services Page</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">3,267</p>
                  <p className="text-sm text-zinc-400">views</p>
                </div>
              </div>

              <div className="flex justify-between items-center p-3 bg-zinc-800 rounded-md">
                <div>
                  <p className="font-medium">/trainers</p>
                  <p className="text-sm text-zinc-400">Trainers Page</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">2,845</p>
                  <p className="text-sm text-zinc-400">views</p>
                </div>
              </div>

              <div className="flex justify-between items-center p-3 bg-zinc-800 rounded-md">
                <div>
                  <p className="font-medium">/locations</p>
                  <p className="text-sm text-zinc-400">Locations Page</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">2,156</p>
                  <p className="text-sm text-zinc-400">views</p>
                </div>
              </div>

              <div className="flex justify-between items-center p-3 bg-zinc-800 rounded-md">
                <div>
                  <p className="font-medium">/knowledge-hub</p>
                  <p className="text-sm text-zinc-400">Knowledge Hub</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">1,932</p>
                  <p className="text-sm text-zinc-400">views</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Top Referrers */}
        <div className="bg-zinc-900 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-6">Top Referrers</h2>

          {isLoading ? (
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-12 bg-zinc-800 animate-pulse rounded"></div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-zinc-800 rounded-md">
                <div>
                  <p className="font-medium">Google</p>
                  <p className="text-sm text-zinc-400">Search Engine</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">3,842</p>
                  <p className="text-sm text-zinc-400">referrals</p>
                </div>
              </div>

              <div className="flex justify-between items-center p-3 bg-zinc-800 rounded-md">
                <div>
                  <p className="font-medium">Instagram</p>
                  <p className="text-sm text-zinc-400">Social Media</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">1,567</p>
                  <p className="text-sm text-zinc-400">referrals</p>
                </div>
              </div>

              <div className="flex justify-between items-center p-3 bg-zinc-800 rounded-md">
                <div>
                  <p className="font-medium">Direct</p>
                  <p className="text-sm text-zinc-400">Direct Traffic</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">1,245</p>
                  <p className="text-sm text-zinc-400">referrals</p>
                </div>
              </div>

              <div className="flex justify-between items-center p-3 bg-zinc-800 rounded-md">
                <div>
                  <p className="font-medium">Facebook</p>
                  <p className="text-sm text-zinc-400">Social Media</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">856</p>
                  <p className="text-sm text-zinc-400">referrals</p>
                </div>
              </div>

              <div className="flex justify-between items-center p-3 bg-zinc-800 rounded-md">
                <div>
                  <p className="font-medium">Bing</p>
                  <p className="text-sm text-zinc-400">Search Engine</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">432</p>
                  <p className="text-sm text-zinc-400">referrals</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Device & Browser Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Device Stats */}
        <div className="bg-zinc-900 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-6">Device Breakdown</h2>

          {isLoading ? (
            <div className="h-64 bg-zinc-800 animate-pulse rounded"></div>
          ) : (
            <div className="h-64 relative">
              {/* This would be a real chart in a production app */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <PieChart size={48} className="mx-auto mb-4 text-zinc-700" />
                  <p className="text-zinc-500">
                    In a real application, this would be an interactive device breakdown chart.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Browser Stats */}
        <div className="bg-zinc-900 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-6">Browser Usage</h2>

          {isLoading ? (
            <div className="h-64 bg-zinc-800 animate-pulse rounded"></div>
          ) : (
            <div className="h-64 relative">
              {/* This would be a real chart in a production app */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <BarChartIcon size={48} className="mx-auto mb-4 text-zinc-700" />
                  <p className="text-zinc-500">
                    In a real application, this would be an interactive browser usage chart.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

