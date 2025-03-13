import type { CollectionConfig } from 'payload'

export const BusinessDetails: CollectionConfig = {
  slug: 'business-details',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'code', 'status', 'phoneNumber', 'website'],
  },
  access: {
    read: () => true,
  },
  fields: [
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
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'code',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'address',
      type: 'group',
      fields: [
        {
          name: 'line1',
          type: 'text',
          label: 'Address Line 1',
        },
        {
          name: 'line2',
          type: 'text',
          label: 'Address Line 2',
        },
        {
          name: 'city',
          type: 'text',
        },
        {
          name: 'state',
          type: 'text',
        },
        {
          name: 'zip',
          type: 'text',
          label: 'Postal Code',
        },
        {
          name: 'country',
          type: 'text',
        },
      ],
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
      name: 'headOfficeAddress',
      type: 'textarea',
    },
    {
      name: 'contactPhone',
      type: 'text',
    },
    {
      name: 'contactEmail',
      type: 'email',
    },
  ],
}
