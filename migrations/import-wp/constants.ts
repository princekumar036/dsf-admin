// Replace this with your WordPress site's WP-JSON REST API URL
export const BASE_URL = `https://public-api.wordpress.com/wp/v2/sites/dsfjnu.wordpress.com`
export const PER_PAGE = 100
export const TOKEN = ``

import type {SanitySchemaType, WordPressDataType} from './types'

export const WP_TYPE_TO_SANITY_SCHEMA_TYPE: Record<WordPressDataType, SanitySchemaType> = {
    categories: 'category',
    posts: 'archive',
    pages: 'page',
    tags: 'tag',
    users: 'author',
  }