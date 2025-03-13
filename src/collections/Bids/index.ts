import { CollectionConfig } from 'payload'

export const Bids: CollectionConfig = {
  slug: 'bids',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['bidder', 'package', 'status', 'createdAt'],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      admin: {
        description: 'A descriptive title for this bid',
      },
    },
    {
      name: 'bidder',
      type: 'relationship',
      relationTo: 'businesses',
      required: true,
      admin: {
        description: 'Business submitting this bid',
      },
    },
    {
      name: 'package',
      type: 'relationship',
      relationTo: 'packages',
      required: true,
      admin: {
        description: 'Package this bid is for',
      },
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
          label: 'Under Review',
        },
        {
          value: 'WIN',
          label: 'Won',
        },
        {
          value: 'FAIL',
          label: 'Failed',
        },
      ],
      defaultValue: 'REVIEW',
      required: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'legalDocuments',
      type: 'array',
      label: 'Legal Documents',
      admin: {
        description: 'Upload legal documents related to this bid',
      },
      fields: [
        {
          name: 'document',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'description',
          type: 'text',
        },
      ],
    },
    {
      name: 'capacityProfiles',
      type: 'array',
      label: 'Capacity Profiles',
      admin: {
        description: 'Upload capacity profile documents',
      },
      fields: [
        {
          name: 'document',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'description',
          type: 'text',
        },
      ],
    },
    {
      name: 'technicalDocuments',
      type: 'array',
      label: 'Technical Documents',
      admin: {
        description: 'Upload technical documentation',
      },
      fields: [
        {
          name: 'document',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'description',
          type: 'text',
        },
      ],
    },
    {
      name: 'financialDocuments',
      type: 'array',
      label: 'Financial Documents',
      admin: {
        description: 'Upload financial documents',
      },
      fields: [
        {
          name: 'document',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'description',
          type: 'text',
        },
      ],
    },
    {
      name: 'notes',
      type: 'richText',
      admin: {
        description: 'Additional notes about this bid',
      },
    },
    {
      name: 'createdAt',
      type: 'date',
      admin: {
        position: 'sidebar',
        readOnly: true,
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
      defaultValue: () => new Date(),
    },
  ],
}
