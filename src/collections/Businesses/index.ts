import type { CollectionConfig } from 'payload'

export const Businesses: CollectionConfig<'businesses'> = {
  slug: 'businesses',
  admin: {
    useAsTitle: 'businessName',
    defaultColumns: [
      'businessCode',
      'businessName',
      'headOfficeAddress',
      'contactPhone',
      'contactEmail',
      'representative',
    ],
    pagination: {
      defaultLimit: 10,
      limits: [10, 25, 50, 100],
    },
  },
  access: {
    read: () => true,
    update: () => true,
    create: () => true,
    delete: () => true,
  },
  fields: [
    {
      name: 'businessDetails',
      type: 'relationship',
      relationTo: 'business-details',
      required: true,
      unique: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'businessCode',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'businessName',
      type: 'text',
      required: true,
    },
    {
      name: 'representative',
      type: 'text',
      required: true,
    },
    {
      name: 'status',
      type: 'select',
      options: [
        {
          label: 'Active',
          value: 'active',
        },
        {
          label: 'Inactive',
          value: 'inactive',
        },
      ],
      defaultValue: 'active',
      required: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'businessLines',
      type: 'array',
      required: true,
      fields: [
        {
          name: 'line',
          type: 'text',
        },
      ],
    },
    {
      name: 'products',
      type: 'join',
      collection: 'products',
      on: 'business',
    },
    {
      name: 'packages',
      type: 'join',
      collection: 'packages',
      on: 'owner',
    },
    {
      name: 'foundedDate',
      type: 'date',
      admin: {
        date: {
          pickerAppearance: 'dayOnly',
          displayFormat: 'MMM d, yyyy',
        },
        position: 'sidebar',
      },
    },
  ],
}
