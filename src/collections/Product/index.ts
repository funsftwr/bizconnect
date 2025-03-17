import { adminOrBusinessUser } from '@/access/adminOrBusinessUser'
import type { CollectionConfig } from 'payload'

export const Products: CollectionConfig = {
  slug: 'products',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['code', 'name', 'category', 'price', 'status'],
    pagination: {
      defaultLimit: 10,
    },
  },
  access: {
    read: () => true,
    create: adminOrBusinessUser,
    update: adminOrBusinessUser,
    delete: adminOrBusinessUser,
  },
  fields: [
    {
      name: 'code',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'business',
      type: 'relationship',
      relationTo: 'businesses',
      required: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'categories',
      required: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'shortDescription',
      type: 'richText',
    },
    {
      name: 'description',
      type: 'richText',
    },
    {
      name: 'unitPrice',
      type: 'number',
      required: true,
      min: 0,
    },
    {
      name: 'unit',
      type: 'text',
      required: true,
      admin: {
        description: 'E.g., each, kg, liter, hour, etc.',
      },
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
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'pictures',
      type: 'array',
      label: 'Product Pictures',
      fields: [
        {
          name: 'picture',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'isPrimary',
          type: 'checkbox',
          label: 'Use as primary product image',
        },
        {
          name: 'caption',
          type: 'text',
        },
      ],
      admin: {
        description: 'Upload multiple pictures of the product',
      },
    },
    {
      name: 'specifications',
      type: 'group',
      label: 'Specifications / Service Process',
      fields: [
        {
          name: 'type',
          type: 'radio',
          options: [
            {
              label: 'Product Specifications',
              value: 'product',
            },
            {
              label: 'Service Process',
              value: 'service',
            },
          ],
          defaultValue: 'product',
          admin: {
            layout: 'horizontal',
          },
        },
        {
          name: 'productSpecs',
          type: 'array',
          label: 'Product Specifications',
          admin: {
            condition: (data, siblingData) => siblingData?.type === 'product',
          },
          fields: [
            {
              name: 'name',
              type: 'text',
              required: true,
              label: 'Specification Name',
            },
            {
              name: 'value',
              type: 'text',
              required: true,
              label: 'Specification Value',
            },
          ],
        },
        {
          name: 'serviceProcess',
          type: 'richText',
          label: 'Service Process',
          admin: {
            condition: (data, siblingData) => siblingData?.type === 'service',
          },
        },
      ],
    },
  ],
  hooks: {
    beforeChange: [
      ({ data }) => {
        if (data.pictures && data.pictures.length > 0) {
          const hasPrimary = data.pictures.some((pic) => pic.isPrimary)
          if (!hasPrimary) {
            data.pictures[0].isPrimary = true
          }
        }

        return data
      },
    ],
  },
}
