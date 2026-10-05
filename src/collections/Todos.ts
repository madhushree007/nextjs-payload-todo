import type { CollectionConfig } from 'payload'

export const Todos: CollectionConfig = {
  // The slug becomes the DB table name and the API path: /api/todos
  slug: 'todos',
  admin: {
    // Which field to show as the row title in the admin panel list
    useAsTitle: 'title',
    defaultColumns: ['title', 'completed', 'createdAt', 'priority'],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'completed',
      type: 'checkbox',
      defaultValue: false,
    },
    {
      name: 'priority',
      type: 'select',
      options: [{label: 'Low', value: 'low'}, {label: 'Medium', value: 'medium'}, {label: 'High', value: 'high'}],
      defaultValue: 'medium',
      required: true,
    }
  ],
  // Payload adds `id`, `createdAt` and `updatedAt` automatically.
  // No `access` block here means the defaults apply: only logged-in
  // admin users can read/write through the REST & GraphQL APIs.
}
