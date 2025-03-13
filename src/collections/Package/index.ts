import { CollectionConfig } from 'payload'

export const Packages: CollectionConfig = {
  slug: 'packages',
  admin: {
    useAsTitle: 'packageName',
    defaultColumns: ['packageCode', 'packageName', 'owner', 'status', 'deadline'],
  },
  fields: [
    {
      name: 'packageCode',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        description: 'Unique identifier for the package',
      },
    },
    {
      name: 'packageName',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'richText',
    },
    {
      name: 'owner',
      type: 'relationship',
      relationTo: 'businesses',
      required: true,
      admin: {
        description: 'Business that owns this package',
      },
    },
    {
      name: 'createdDate',
      type: 'date',
      defaultValue: () => new Date(),
      admin: {
        readOnly: true,
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
    },
    {
      name: 'deadline',
      type: 'date',
      required: true,
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
    },
    {
      name: 'price',
      type: 'number',
      required: true,
      min: 0,
      admin: {
        description: 'Package price',
      },
    },
    {
      name: 'documents',
      type: 'array',
      label: 'Documents',
      admin: {
        description: 'Upload related documents',
      },
      fields: [
        {
          name: 'document',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
      ],
    },
    {
      name: 'bids',
      type: 'join',
      collection: 'bids',
      on: 'package',
    },
    {
      name: 'status',
      type: 'select',
      options: [
        {
          value: 'OPEN',
          label: 'Open',
        },
        {
          value: 'REVIEW',
          label: 'Review',
        },
        {
          value: 'CLOSE',
          label: 'Close',
        },
      ],
      defaultValue: 'OPEN',
      required: true,
      admin: {
        position: 'sidebar',
      },
    },
  ],
}
