import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'dsf-website',

  projectId: 'smjngdxm',
  dataset: 'db-dsf-website-9xf65r',

  plugins: [structureTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },
})
