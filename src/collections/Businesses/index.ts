import { admin } from '@/access/admin'
import slugify from 'slugify'
import type { CollectionConfig } from 'payload'

export const Businesses: CollectionConfig<'businesses'> = {
  slug: 'businesses',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['code', 'name', 'phone', 'email', 'representative'],
    pagination: {
      defaultLimit: 10,
      limits: [10, 25, 50, 100],
    },
  },
  access: {
    read: () => true,
    create: admin,
    update: admin,
    delete: admin,
  },
  fields: [
    {
      name: 'slug',
      type: 'text',
      admin: {
        readOnly: true,
        position: 'sidebar',
      },
      hooks: {
        beforeValidate: [
          async ({ value, originalDoc, data }) => {
            if (originalDoc && originalDoc.slug && data && !data.taxCode && !data.name) {
              return originalDoc.slug
            }
            return value
          },
        ],
      },
    },
    {
      name: 'profilePicture',
      type: 'upload',
      relationTo: 'media',
      required: false,
      admin: {
        description: 'Business profile picture or logo',
      },
    },
    {
      name: 'address',
      type: 'group',
      fields: [
        {
          name: 'city',
          type: 'text',
        },
        {
          name: 'state',
          type: 'text',
        },
        {
          name: 'street',
          type: 'text',
        },
      ],
    },
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'website',
      type: 'text',
    },
    {
      name: 'phoneNumber',
      type: 'text',
    },
    {
      name: 'email',
      type: 'email',
    },
    {
      name: 'taxCode',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'about',
      type: 'text',
    },
    {
      name: 'achievements',
      type: 'text',
    },
    {
      name: 'history',
      type: 'text',
    },
    {
      name: 'representative',
      type: 'group',
      fields: [
        {
          name: 'name',
          type: 'text',
          label: 'Name',
        },
        {
          name: 'title',
          type: 'text',
          label: 'Title',
        },
        {
          name: 'phoneNumber',
          type: 'text',
        },
        {
          name: 'email',
          type: 'email',
        },
      ],
    },
    {
      name: 'branches',
      type: 'array',
      fields: [
        {
          name: 'address',
          type: 'group',
          fields: [
            {
              name: 'city',
              type: 'text',
            },
            {
              name: 'state',
              type: 'text',
            },
            {
              name: 'street',
              type: 'text',
            },
          ],
        },
        {
          name: 'phoneNumber',
          type: 'text',
        },
        {
          name: 'email',
          type: 'email',
        },
      ],
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
          name: 'name',
          type: 'text',
        },
        {
          name: 'code',
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
  hooks: {
    beforeChange: [
      async ({ data }) => {
        if (data.taxCode && data.name) {
          const slugifiedName = slugify(data.name, {
            lower: true,
            strict: true,
          })

          data.slug = `${data.taxCode}-${slugifiedName}`
        }
        return data
      },
    ],
  },
}
