import type { CollectionConfig } from 'payload'

import { admin } from '@/access/admin'

export const Users: CollectionConfig = {
  auth: true,
  slug: 'users',
  access: {
    create: admin,
    delete: admin,
    read: admin,
    update: admin,
  },
  admin: {
    defaultColumns: ['name', 'email'],
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
    },
    {
      name: 'role',
      type: 'select',
      options: [
        { label: 'Admin', value: 'admin' },
        { label: 'User', value: 'user' },
      ],
      required: true,
      defaultValue: 'user',
    },
    {
      name: 'business',
      type: 'relationship',
      relationTo: 'businesses',
    },
  ],
  timestamps: true,
}
