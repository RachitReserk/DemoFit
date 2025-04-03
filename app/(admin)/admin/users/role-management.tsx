"use client"

import { useState } from "react"
import { Plus, Save, Trash, X } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

// Mock roles data
const initialRoles = [
  {
    id: "1",
    name: "Admin",
    description: "Full access to all features",
    permissions: {
      users: { view: true, create: true, edit: true, delete: true },
      content: { view: true, create: true, edit: true, delete: true },
      settings: { view: true, edit: true },
      analytics: { view: true },
    },
    isDefault: true,
  },
  {
    id: "2",
    name: "Editor",
    description: "Can manage content but not users or settings",
    permissions: {
      users: { view: true, create: false, edit: false, delete: false },
      content: { view: true, create: true, edit: true, delete: true },
      settings: { view: true, edit: false },
      analytics: { view: true },
    },
    isDefault: true,
  },
  {
    id: "3",
    name: "Viewer",
    description: "Read-only access to content",
    permissions: {
      users: { view: false, create: false, edit: false, delete: false },
      content: { view: true, create: false, edit: false, delete: false },
      settings: { view: false, edit: false },
      analytics: { view: true },
    },
    isDefault: true,
  },
]

export default function RoleManagement() {
  const [roles, setRoles] = useState(initialRoles)
  const [isAddRoleModalOpen, setIsAddRoleModalOpen] = useState(false)
  const [isEditRoleModalOpen, setIsEditRoleModalOpen] = useState(false)
  const [selectedRole, setSelectedRole] = useState<any>(null)
  const [newRole, setNewRole] = useState({
    name: "",
    description: "",
    permissions: {
      users: { view: false, create: false, edit: false, delete: false },
      content: { view: false, create: false, edit: false, delete: false },
      settings: { view: false, edit: false },
      analytics: { view: false },
    },
  })

  const handleAddRole = () => {
    const roleId = (roles.length + 1).toString()
    const roleToAdd = {
      id: roleId,
      name: newRole.name,
      description: newRole.description,
      permissions: newRole.permissions,
      isDefault: false,
    }

    setRoles([...roles, roleToAdd])
    setIsAddRoleModalOpen(false)
    setNewRole({
      name: "",
      description: "",
      permissions: {
        users: { view: false, create: false, edit: false, delete: false },
        content: { view: false, create: false, edit: false, delete: false },
        settings: { view: false, edit: false },
        analytics: { view: false },
      },
    })
  }

  const handleEditRole = (role: any) => {
    setSelectedRole(role)
    setIsEditRoleModalOpen(true)
  }

  const handleSaveRole = (editedRole: any) => {
    const updatedRoles = roles.map((role) => (role.id === editedRole.id ? editedRole : role))
    setRoles(updatedRoles)
    setIsEditRoleModalOpen(false)
    setSelectedRole(null)
  }

  const handleDeleteRole = (roleId: string) => {
    const updatedRoles = roles.filter((role) => role.id !== roleId)
    setRoles(updatedRoles)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Roles & Permissions</h2>
          <p className="text-zinc-400">Manage user roles and their permissions</p>
        </div>
        <button
          onClick={() => setIsAddRoleModalOpen(true)}
          className="px-4 py-2 bg-[hsl(var(--gold))] text-black rounded-md hover:bg-[hsl(var(--gold-light))] transition-colors flex items-center"
        >
          <Plus size={18} className="mr-2" />
          Add Role
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {roles.map((role) => (
          <Card key={role.id} className="bg-zinc-900 border-zinc-800">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>{role.name}</CardTitle>
                  <CardDescription className="mt-1">{role.description}</CardDescription>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEditRole(role)}
                    className="p-1 hover:text-[hsl(var(--gold))] transition-colors"
                    aria-label={`Edit ${role.name} role`}
                  >
                    <Save size={18} />
                  </button>
                  {!role.isDefault && (
                    <button
                      onClick={() => handleDeleteRole(role.id)}
                      className="p-1 hover:text-red-500 transition-colors"
                      aria-label={`Delete ${role.name} role`}
                    >
                      <Trash size={18} />
                    </button>
                  )}
                </div>
              </div>
              {role.isDefault && <span className="text-xs text-zinc-500 mt-1">Default role (cannot be deleted)</span>}
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">User Management</h4>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor={`${role.id}-users-view`} className="text-sm">
                        View Users
                      </Label>
                      <Switch
                        id={`${role.id}-users-view`}
                        checked={role.permissions.users.view}
                        disabled={role.isDefault}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor={`${role.id}-users-create`} className="text-sm">
                        Create Users
                      </Label>
                      <Switch
                        id={`${role.id}-users-create`}
                        checked={role.permissions.users.create}
                        disabled={role.isDefault}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor={`${role.id}-users-edit`} className="text-sm">
                        Edit Users
                      </Label>
                      <Switch
                        id={`${role.id}-users-edit`}
                        checked={role.permissions.users.edit}
                        disabled={role.isDefault}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor={`${role.id}-users-delete`} className="text-sm">
                        Delete Users
                      </Label>
                      <Switch
                        id={`${role.id}-users-delete`}
                        checked={role.permissions.users.delete}
                        disabled={role.isDefault}
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Content Management</h4>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor={`${role.id}-content-view`} className="text-sm">
                        View Content
                      </Label>
                      <Switch
                        id={`${role.id}-content-view`}
                        checked={role.permissions.content.view}
                        disabled={role.isDefault}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor={`${role.id}-content-create`} className="text-sm">
                        Create Content
                      </Label>
                      <Switch
                        id={`${role.id}-content-create`}
                        checked={role.permissions.content.create}
                        disabled={role.isDefault}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor={`${role.id}-content-edit`} className="text-sm">
                        Edit Content
                      </Label>
                      <Switch
                        id={`${role.id}-content-edit`}
                        checked={role.permissions.content.edit}
                        disabled={role.isDefault}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor={`${role.id}-content-delete`} className="text-sm">
                        Delete Content
                      </Label>
                      <Switch
                        id={`${role.id}-content-delete`}
                        checked={role.permissions.content.delete}
                        disabled={role.isDefault}
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Settings & Analytics</h4>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor={`${role.id}-settings-view`} className="text-sm">
                        View Settings
                      </Label>
                      <Switch
                        id={`${role.id}-settings-view`}
                        checked={role.permissions.settings.view}
                        disabled={role.isDefault}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor={`${role.id}-settings-edit`} className="text-sm">
                        Edit Settings
                      </Label>
                      <Switch
                        id={`${role.id}-settings-edit`}
                        checked={role.permissions.settings.edit}
                        disabled={role.isDefault}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor={`${role.id}-analytics-view`} className="text-sm">
                        View Analytics
                      </Label>
                      <Switch
                        id={`${role.id}-analytics-view`}
                        checked={role.permissions.analytics.view}
                        disabled={role.isDefault}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Add Role Modal */}
      {isAddRoleModalOpen && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-zinc-900 rounded-lg max-w-md w-full">
            <div className="flex justify-between items-center p-6 border-b border-zinc-800">
              <h3 className="text-xl font-bold">Add New Role</h3>
              <button
                onClick={() => setIsAddRoleModalOpen(false)}
                className="text-zinc-400 hover:text-white transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <div className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Role Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={newRole.name}
                    onChange={(e) => setNewRole({ ...newRole, name: e.target.value })}
                    className="w-full px-3 py-2 bg-black border border-zinc-700 rounded-md focus:outline-none focus:border-[hsl(var(--gold))]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Description</label>
                  <textarea
                    value={newRole.description}
                    onChange={(e) => setNewRole({ ...newRole, description: e.target.value })}
                    className="w-full px-3 py-2 bg-black border border-zinc-700 rounded-md focus:outline-none focus:border-[hsl(var(--gold))]"
                    rows={3}
                  />
                </div>

                <div>
                  <h4 className="font-medium mb-2">Permissions</h4>

                  <div className="space-y-4">
                    <div>
                      <h5 className="text-sm font-medium mb-2">User Management</h5>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="new-users-view" className="text-sm">
                            View Users
                          </Label>
                          <Switch
                            id="new-users-view"
                            checked={newRole.permissions.users.view}
                            onCheckedChange={(checked) =>
                              setNewRole({
                                ...newRole,
                                permissions: {
                                  ...newRole.permissions,
                                  users: { ...newRole.permissions.users, view: checked },
                                },
                              })
                            }
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label htmlFor="new-users-create" className="text-sm">
                            Create Users
                          </Label>
                          <Switch
                            id="new-users-create"
                            checked={newRole.permissions.users.create}
                            onCheckedChange={(checked) =>
                              setNewRole({
                                ...newRole,
                                permissions: {
                                  ...newRole.permissions,
                                  users: { ...newRole.permissions.users, create: checked },
                                },
                              })
                            }
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label htmlFor="new-users-edit" className="text-sm">
                            Edit Users
                          </Label>
                          <Switch
                            id="new-users-edit"
                            checked={newRole.permissions.users.edit}
                            onCheckedChange={(checked) =>
                              setNewRole({
                                ...newRole,
                                permissions: {
                                  ...newRole.permissions,
                                  users: { ...newRole.permissions.users, edit: checked },
                                },
                              })
                            }
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label htmlFor="new-users-delete" className="text-sm">
                            Delete Users
                          </Label>
                          <Switch
                            id="new-users-delete"
                            checked={newRole.permissions.users.delete}
                            onCheckedChange={(checked) =>
                              setNewRole({
                                ...newRole,
                                permissions: {
                                  ...newRole.permissions,
                                  users: { ...newRole.permissions.users, delete: checked },
                                },
                              })
                            }
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <h5 className="text-sm font-medium mb-2">Content Management</h5>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="new-content-view" className="text-sm">
                            View Content
                          </Label>
                          <Switch
                            id="new-content-view"
                            checked={newRole.permissions.content.view}
                            onCheckedChange={(checked) =>
                              setNewRole({
                                ...newRole,
                                permissions: {
                                  ...newRole.permissions,
                                  content: { ...newRole.permissions.content, view: checked },
                                },
                              })
                            }
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label htmlFor="new-content-create" className="text-sm">
                            Create Content
                          </Label>
                          <Switch
                            id="new-content-create"
                            checked={newRole.permissions.content.create}
                            onCheckedChange={(checked) =>
                              setNewRole({
                                ...newRole,
                                permissions: {
                                  ...newRole.permissions,
                                  content: { ...newRole.permissions.content, create: checked },
                                },
                              })
                            }
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label htmlFor="new-content-edit" className="text-sm">
                            Edit Content
                          </Label>
                          <Switch
                            id="new-content-edit"
                            checked={newRole.permissions.content.edit}
                            onCheckedChange={(checked) =>
                              setNewRole({
                                ...newRole,
                                permissions: {
                                  ...newRole.permissions,
                                  content: { ...newRole.permissions.content, edit: checked },
                                },
                              })
                            }
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label htmlFor="new-content-delete" className="text-sm">
                            Delete Content
                          </Label>
                          <Switch
                            id="new-content-delete"
                            checked={newRole.permissions.content.delete}
                            onCheckedChange={(checked) =>
                              setNewRole({
                                ...newRole,
                                permissions: {
                                  ...newRole.permissions,
                                  content: { ...newRole.permissions.content, delete: checked },
                                },
                              })
                            }
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <h5 className="text-sm font-medium mb-2">Settings & Analytics</h5>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="new-settings-view" className="text-sm">
                            View Settings
                          </Label>
                          <Switch
                            id="new-settings-view"
                            checked={newRole.permissions.settings.view}
                            onCheckedChange={(checked) =>
                              setNewRole({
                                ...newRole,
                                permissions: {
                                  ...newRole.permissions,
                                  settings: { ...newRole.permissions.settings, view: checked },
                                },
                              })
                            }
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label htmlFor="new-settings-edit" className="text-sm">
                            Edit Settings
                          </Label>
                          <Switch
                            id="new-settings-edit"
                            checked={newRole.permissions.settings.edit}
                            onCheckedChange={(checked) =>
                              setNewRole({
                                ...newRole,
                                permissions: {
                                  ...newRole.permissions,
                                  settings: { ...newRole.permissions.settings, edit: checked },
                                },
                              })
                            }
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label htmlFor="new-analytics-view" className="text-sm">
                            View Analytics
                          </Label>
                          <Switch
                            id="new-analytics-view"
                            checked={newRole.permissions.analytics.view}
                            onCheckedChange={(checked) =>
                              setNewRole({
                                ...newRole,
                                permissions: {
                                  ...newRole.permissions,
                                  analytics: { ...newRole.permissions.analytics, view: checked },
                                },
                              })
                            }
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-4 mt-6">
                <button
                  onClick={() => setIsAddRoleModalOpen(false)}
                  className="px-4 py-2 border border-zinc-700 rounded-md hover:border-zinc-500 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddRole}
                  disabled={!newRole.name.trim()}
                  className="px-4 py-2 bg-[hsl(var(--gold))] text-black rounded-md hover:bg-[hsl(var(--gold-light))] transition-colors disabled:opacity-50"
                >
                  Add Role
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

