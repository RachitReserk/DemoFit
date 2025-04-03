"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { ChevronDown, Edit, Filter, Plus, Search, Trash, X } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import RoleManagement from "./role-management"

// Mock users data
const mockUsers = [
  {
    id: "1",
    name: "Admin User",
    email: "admin@aestheticlab.com",
    role: "admin",
    status: "active",
    lastLogin: "2023-05-10T14:30:00Z",
  },
  {
    id: "2",
    name: "Content Editor",
    email: "editor@aestheticlab.com",
    role: "editor",
    status: "active",
    lastLogin: "2023-05-09T11:15:00Z",
  },
  {
    id: "3",
    name: "Marketing Manager",
    email: "marketing@aestheticlab.com",
    role: "editor",
    status: "active",
    lastLogin: "2023-05-08T09:45:00Z",
  },
  {
    id: "4",
    name: "Trainer View",
    email: "trainer@aestheticlab.com",
    role: "viewer",
    status: "inactive",
    lastLogin: "2023-04-15T16:20:00Z",
  },
  {
    id: "5",
    name: "Location Manager",
    email: "location@aestheticlab.com",
    role: "editor",
    status: "active",
    lastLogin: "2023-05-07T13:10:00Z",
  },
]

export default function UsersPageClient() {
  const [users, setUsers] = useState(mockUsers)
  const [filteredUsers, setFilteredUsers] = useState(mockUsers)
  const [searchTerm, setSearchTerm] = useState("")
  const [filters, setFilters] = useState({
    role: "",
    status: "",
  })
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState<any>(null)
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    role: "viewer",
    password: "",
    confirmPassword: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(10)

  // Apply filters and search
  useEffect(() => {
    let result = users

    // Apply search
    if (searchTerm) {
      const term = searchTerm.toLowerCase()
      result = result.filter(
        (user) => user.name.toLowerCase().includes(term) || user.email.toLowerCase().includes(term),
      )
    }

    // Apply filters
    if (filters.role) {
      result = result.filter((user) => user.role === filters.role)
    }

    if (filters.status) {
      result = result.filter((user) => user.status === filters.status)
    }

    setFilteredUsers(result)
    setCurrentPage(1) // Reset to first page when filters change
  }, [users, searchTerm, filters])

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = filteredUsers.slice(indexOfFirstItem, indexOfLastItem)
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage)

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date)
  }

  // Handle edit user
  const handleEditUser = (user: any) => {
    setSelectedUser(user)
    setIsEditModalOpen(true)
  }

  // Handle delete user
  const handleDeleteUser = (user: any) => {
    setSelectedUser(user)
    setIsDeleteModalOpen(true)
  }

  // Confirm delete user
  const confirmDeleteUser = () => {
    if (!selectedUser) return

    // Remove user from list
    const updatedUsers = users.filter((user) => user.id !== selectedUser.id)
    setUsers(updatedUsers)
    setIsDeleteModalOpen(false)
    setSelectedUser(null)
  }

  // Save edited user
  const saveEditedUser = (editedUser: any) => {
    // Update user
    const updatedUsers = users.map((user) => (user.id === editedUser.id ? editedUser : user))

    setUsers(updatedUsers)
    setIsEditModalOpen(false)
    setSelectedUser(null)
  }

  // Add new user
  const addNewUser = () => {
    // Validate form
    const newErrors: Record<string, string> = {}

    if (!newUser.name.trim()) {
      newErrors.name = "Name is required"
    }

    if (!newUser.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(newUser.email)) {
      newErrors.email = "Email is invalid"
    }

    if (!newUser.password) {
      newErrors.password = "Password is required"
    } else if (newUser.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters"
    }

    if (newUser.password !== newUser.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match"
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    // Add new user
    const newUserObj = {
      id: (users.length + 1).toString(),
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      status: "active",
      lastLogin: new Date().toISOString(),
    }

    setUsers([...users, newUserObj])
    setIsAddModalOpen(false)
    setNewUser({
      name: "",
      email: "",
      role: "viewer",
      password: "",
      confirmPassword: "",
    })
    setErrors({})
  }

  // Reset filters
  const resetFilters = () => {
    setFilters({
      role: "",
      status: "",
    })
    setSearchTerm("")
  }

  return (
    <div className="p-6">
      <Tabs defaultValue="users" className="w-full">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">User Management</h1>
            <p className="text-zinc-400 mt-1">Manage user accounts and permissions</p>
          </div>

          <div className="flex items-center gap-4">
            <TabsList>
              <TabsTrigger value="users">Users</TabsTrigger>
              <TabsTrigger value="roles">Roles & Permissions</TabsTrigger>
            </TabsList>

            <button
              onClick={() => setIsAddModalOpen(true)}
              className="px-4 py-2 bg-[hsl(var(--gold))] text-black rounded-md hover:bg-[hsl(var(--gold-light))] transition-colors flex items-center"
            >
              <Plus size={18} className="mr-2" />
              Add User
            </button>
          </div>
        </div>

        <TabsContent value="users" className="space-y-6">
          {/* Search and Filter Bar */}
          <div className="bg-zinc-900 p-4 rounded-lg">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400" size={18} />
                <input
                  type="text"
                  placeholder="Search by name or email"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-black border border-zinc-700 rounded-md focus:outline-none focus:border-[hsl(var(--gold))]"
                />
              </div>

              <div className="flex gap-2">
                <button
                  className="px-4 py-2 bg-black border border-zinc-700 rounded-md flex items-center gap-2 hover:border-zinc-500 transition-colors"
                  onClick={() => document.getElementById("filterPanel")?.classList.toggle("hidden")}
                >
                  <Filter size={18} />
                  Filters
                  <ChevronDown size={16} />
                </button>

                <button
                  className="px-4 py-2 bg-black border border-zinc-700 rounded-md hover:border-zinc-500 transition-colors"
                  onClick={resetFilters}
                >
                  Reset
                </button>
              </div>
            </div>

            {/* Filter Panel */}
            <div id="filterPanel" className="hidden mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Role Filter */}
              <div>
                <label className="block text-sm font-medium mb-1">Role</label>
                <select
                  value={filters.role}
                  onChange={(e) => setFilters({ ...filters, role: e.target.value })}
                  className="w-full px-3 py-2 bg-black border border-zinc-700 rounded-md focus:outline-none focus:border-[hsl(var(--gold))]"
                >
                  <option value="">All Roles</option>
                  <option value="admin">Admin</option>
                  <option value="editor">Editor</option>
                  <option value="viewer">Viewer</option>
                </select>
              </div>

              {/* Status Filter */}
              <div>
                <label className="block text-sm font-medium mb-1">Status</label>
                <select
                  value={filters.status}
                  onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                  className="w-full px-3 py-2 bg-black border border-zinc-700 rounded-md focus:outline-none focus:border-[hsl(var(--gold))]"
                >
                  <option value="">All Statuses</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>
          </div>

          {/* Users Table */}
          <div className="bg-zinc-900 rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-black">
                  <tr>
                    <th className="px-4 py-3 text-left">Name</th>
                    <th className="px-4 py-3 text-left">Email</th>
                    <th className="px-4 py-3 text-left">Role</th>
                    <th className="px-4 py-3 text-left">Status</th>
                    <th className="px-4 py-3 text-left">Last Login</th>
                    <th className="px-4 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800">
                  {currentItems.length > 0 ? (
                    currentItems.map((user) => (
                      <tr key={user.id} className="hover:bg-zinc-800">
                        <td className="px-4 py-3">
                          <div className="flex items-center">
                            <div className="w-8 h-8 rounded-full bg-[hsl(var(--gold))] flex items-center justify-center mr-3">
                              <span className="text-black font-semibold">{user.name.charAt(0)}</span>
                            </div>
                            <span>{user.name}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3">{user.email}</td>
                        <td className="px-4 py-3">
                          <span
                            className={`px-2 py-1 rounded-full text-xs ${
                              user.role === "admin"
                                ? "bg-purple-900/30 text-purple-300"
                                : user.role === "editor"
                                  ? "bg-blue-900/30 text-blue-300"
                                  : "bg-green-900/30 text-green-300"
                            }`}
                          >
                            {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <span
                            className={`px-2 py-1 rounded-full text-xs ${
                              user.status === "active" ? "bg-green-900/30 text-green-300" : "bg-red-900/30 text-red-300"
                            }`}
                          >
                            {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-zinc-400">{formatDate(user.lastLogin)}</td>
                        <td className="px-4 py-3 text-right">
                          <div className="flex justify-end gap-2">
                            <button
                              onClick={() => handleEditUser(user)}
                              className="p-1 hover:text-[hsl(var(--gold))] transition-colors"
                              aria-label="Edit user"
                            >
                              <Edit size={18} />
                            </button>
                            {user.id !== "1" && ( // Prevent deleting the main admin
                              <button
                                onClick={() => handleDeleteUser(user)}
                                className="p-1 hover:text-red-500 transition-colors"
                                aria-label="Delete user"
                              >
                                <Trash size={18} />
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className="px-4 py-8 text-center text-zinc-400">
                        No users found matching your criteria.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pagination */}
          {filteredUsers.length > 0 && (
            <div className="flex justify-between items-center">
              <div className="text-sm text-zinc-400">
                Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredUsers.length)} of{" "}
                {filteredUsers.length} users
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-1 bg-zinc-800 rounded-md disabled:opacity-50"
                >
                  Previous
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-3 py-1 rounded-md ${
                      currentPage === page ? "bg-[hsl(var(--gold))] text-black" : "bg-zinc-800"
                    }`}
                  >
                    {page}
                  </button>
                ))}
                <button
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="px-3 py-1 bg-zinc-800 rounded-md disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </TabsContent>

        <TabsContent value="roles">
          <RoleManagement />
        </TabsContent>
      </Tabs>

      {/* Add User Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-zinc-900 rounded-lg max-w-md w-full">
            <div className="flex justify-between items-center p-6 border-b border-zinc-800">
              <h3 className="text-xl font-bold">Add New User</h3>
              <button
                onClick={() => {
                  setIsAddModalOpen(false)
                  setErrors({})
                }}
                className="text-zinc-400 hover:text-white transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <div className="p-6">
              <div className="space-y-4">
                {/* Name */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={newUser.name}
                    onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                    className={`w-full px-3 py-2 bg-black border ${
                      errors.name ? "border-red-500" : "border-zinc-700"
                    } rounded-md focus:outline-none focus:border-[hsl(var(--gold))]`}
                  />
                  {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    value={newUser.email}
                    onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                    className={`w-full px-3 py-2 bg-black border ${
                      errors.email ? "border-red-500" : "border-zinc-700"
                    } rounded-md focus:outline-none focus:border-[hsl(var(--gold))]`}
                  />
                  {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
                </div>

                {/* Role */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Role <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={newUser.role}
                    onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                    className="w-full px-3 py-2 bg-black border border-zinc-700 rounded-md focus:outline-none focus:border-[hsl(var(--gold))]"
                  >
                    <option value="admin">Admin</option>
                    <option value="editor">Editor</option>
                    <option value="viewer">Viewer</option>
                  </select>
                </div>

                {/* Password */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Password <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="password"
                    value={newUser.password}
                    onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                    className={`w-full px-3 py-2 bg-black border ${
                      errors.password ? "border-red-500" : "border-zinc-700"
                    } rounded-md focus:outline-none focus:border-[hsl(var(--gold))]`}
                  />
                  {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password}</p>}
                </div>

                {/* Confirm Password */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Confirm Password <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="password"
                    value={newUser.confirmPassword}
                    onChange={(e) => setNewUser({ ...newUser, confirmPassword: e.target.value })}
                    className={`w-full px-3 py-2 bg-black border ${
                      errors.confirmPassword ? "border-red-500" : "border-zinc-700"
                    } rounded-md focus:outline-none focus:border-[hsl(var(--gold))]`}
                  />
                  {errors.confirmPassword && <p className="mt-1 text-sm text-red-500">{errors.confirmPassword}</p>}
                </div>
              </div>

              <div className="flex justify-end gap-4 mt-6">
                <button
                  onClick={() => {
                    setIsAddModalOpen(false)
                    setErrors({})
                  }}
                  className="px-4 py-2 border border-zinc-700 rounded-md hover:border-zinc-500 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={addNewUser}
                  className="px-4 py-2 bg-[hsl(var(--gold))] text-black rounded-md hover:bg-[hsl(var(--gold-light))] transition-colors"
                >
                  Add User
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit User Modal */}
      {isEditModalOpen && selectedUser && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-zinc-900 rounded-lg max-w-md w-full">
            <div className="flex justify-between items-center p-6 border-b border-zinc-800">
              <h3 className="text-xl font-bold">Edit User</h3>
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="text-zinc-400 hover:text-white transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <div className="p-6">
              <EditUserForm user={selectedUser} onSave={saveEditedUser} onCancel={() => setIsEditModalOpen(false)} />
            </div>
          </div>
        </div>
      )}

      {/* Delete User Modal */}
      {isDeleteModalOpen && selectedUser && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-zinc-900 rounded-lg max-w-md w-full">
            <div className="p-6">
              <h3 className="text-xl font-bold mb-4">Delete User</h3>
              <p className="text-zinc-300 mb-6">
                Are you sure you want to delete the user <span className="font-semibold">{selectedUser.name}</span>?
                This action cannot be undone.
              </p>

              <div className="flex justify-end gap-4">
                <button
                  onClick={() => setIsDeleteModalOpen(false)}
                  className="px-4 py-2 border border-zinc-700 rounded-md hover:border-zinc-500 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDeleteUser}
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                >
                  Delete User
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// Edit User Form Component
function EditUserForm({ user, onSave, onCancel }: { user: any; onSave: (user: any) => void; onCancel: () => void }) {
  const [editedUser, setEditedUser] = useState({ ...user })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [changePassword, setChangePassword] = useState(false)
  const [passwords, setPasswords] = useState({
    password: "",
    confirmPassword: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setEditedUser((prev) => ({ ...prev, [name]: value }))

    // Clear error when field is edited
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setPasswords((prev) => ({ ...prev, [name]: value }))

    // Clear error when field is edited
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validate form
    const newErrors: Record<string, string> = {}

    if (!editedUser.name.trim()) {
      newErrors.name = "Name is required"
    }

    if (!editedUser.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(editedUser.email)) {
      newErrors.email = "Email is invalid"
    }

    if (changePassword) {
      if (!passwords.password) {
        newErrors.password = "Password is required"
      } else if (passwords.password.length < 8) {
        newErrors.password = "Password must be at least 8 characters"
      }

      if (passwords.password !== passwords.confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match"
      }
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    // Save changes
    onSave(editedUser)
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-4">
        {/* Name */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="name"
            value={editedUser.name}
            onChange={handleChange}
            className={`w-full px-3 py-2 bg-black border ${
              errors.name ? "border-red-500" : "border-zinc-700"
            } rounded-md focus:outline-none focus:border-[hsl(var(--gold))]`}
          />
          {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            name="email"
            value={editedUser.email}
            onChange={handleChange}
            className={`w-full px-3 py-2 bg-black border ${
              errors.email ? "border-red-500" : "border-zinc-700"
            } rounded-md focus:outline-none focus:border-[hsl(var(--gold))]`}
          />
          {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
        </div>

        {/* Role */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Role <span className="text-red-500">*</span>
          </label>
          <select
            name="role"
            value={editedUser.role}
            onChange={handleChange}
            className="w-full px-3 py-2 bg-black border border-zinc-700 rounded-md focus:outline-none focus:border-[hsl(var(--gold))]"
            disabled={user.id === "1"} // Prevent changing main admin role
          >
            <option value="admin">Admin</option>
            <option value="editor">Editor</option>
            <option value="viewer">Viewer</option>
          </select>
          {user.id === "1" && <p className="mt-1 text-xs text-zinc-500">Main admin role cannot be changed</p>}
        </div>

        {/* Status */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Status <span className="text-red-500">*</span>
          </label>
          <select
            name="status"
            value={editedUser.status}
            onChange={handleChange}
            className="w-full px-3 py-2 bg-black border border-zinc-700 rounded-md focus:outline-none focus:border-[hsl(var(--gold))]"
            disabled={user.id === "1"} // Prevent changing main admin status
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
          {user.id === "1" && <p className="mt-1 text-xs text-zinc-500">Main admin status cannot be changed</p>}
        </div>

        {/* Change Password Toggle */}
        <div className="pt-2">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={changePassword}
              onChange={() => setChangePassword(!changePassword)}
              className="w-4 h-4 bg-black border border-zinc-700 rounded focus:ring-[hsl(var(--gold))] focus:ring-offset-zinc-900"
            />
            <span className="ml-2 text-sm">Change Password</span>
          </label>
        </div>

        {/* Password Fields (conditional) */}
        {changePassword && (
          <>
            <div>
              <label className="block text-sm font-medium mb-2">
                New Password <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                name="password"
                value={passwords.password}
                onChange={handlePasswordChange}
                className={`w-full px-3 py-2 bg-black border ${
                  errors.password ? "border-red-500" : "border-zinc-700"
                } rounded-md focus:outline-none focus:border-[hsl(var(--gold))]`}
              />
              {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Confirm New Password <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={passwords.confirmPassword}
                onChange={handlePasswordChange}
                className={`w-full px-3 py-2 bg-black border ${
                  errors.confirmPassword ? "border-red-500" : "border-zinc-700"
                } rounded-md focus:outline-none focus:border-[hsl(var(--gold))]`}
              />
              {errors.confirmPassword && <p className="mt-1 text-sm text-red-500">{errors.confirmPassword}</p>}
            </div>
          </>
        )}
      </div>

      <div className="flex justify-end gap-4 mt-6">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border border-zinc-700 rounded-md hover:border-zinc-500 transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-[hsl(var(--gold))] text-black rounded-md hover:bg-[hsl(var(--gold-light))] transition-colors"
        >
          Save Changes
        </button>
      </div>
    </form>
  )
}

