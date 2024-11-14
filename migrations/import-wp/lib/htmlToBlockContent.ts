import {htmlToBlocks} from '@sanity/block-tools'
import {Schema} from '@sanity/schema'
import {uuid} from '@sanity/uuid'
import {JSDOM} from 'jsdom'
import pLimit from 'p-limit'
import type {FieldDefinition, SanityClient} from 'sanity'

import type {Archive} from '../../../sanity.types'
import {schemaTypes} from '../../../schemaTypes'
import {BASE_URL, TOKEN} from '../constants'
import {sanityIdToImageReference} from './sanityIdToImageReference'
import {sanityUploadFromUrl} from './sanityUploadFromUrl'
import {wpImageFetch} from './wpImageFetch'
import axios from 'axios'

const defaultSchema = Schema.compile({types: schemaTypes})
const blockContentSchema = defaultSchema
  .get('archive')
  .fields.find((field: FieldDefinition) => field.name === 'content').type

// https://github.com/sanity-io/sanity/blob/next/packages/%40sanity/block-tools/README.md
export async function htmlToBlockContent(
  html: string,
  client: SanityClient,
  imageCache: Record<number, string>,
): Promise<Archive['content']> {
  // Convert HTML to Sanity's Portable Text
  let blocks = htmlToBlocks(html, blockContentSchema, {
    parseHtml: (html) => new JSDOM(html).window.document,
    rules: [
      {
        deserialize(node, next, block) {
          const el = node as HTMLElement

          if (node.nodeName.toLowerCase() === 'img') {
            const url = (node as HTMLImageElement).getAttribute('src')

            if (!url) {
              return undefined
            }

            return block({
              // these attributes may be overwritten by the image upload below
              _type: 'externalImage',
              url,
            })
          }

          return undefined
        },
      },
    ],
  })

  // Note: Multiple documents may be running this same function concurrently
  const limit = pLimit(2)

  const blocksWithUploads = blocks.map((block) =>
    limit(async () => {
      if (block._type !== 'externalImage' || !('url' in block)) {
        return block
      }

      // The filename is usually stored as the "slug" in WordPress media documents
      // Filename may be appended with dimensions like "-1024x683", remove with regex
      const dimensions = /-\d+x\d+$/
      let slug = (block.url as string)
        .split('/')
        .pop()
        ?.split('.')
        ?.shift()
        ?.replace(dimensions, '')
        .toLocaleLowerCase()

      // const imageId = await fetch(`${BASE_URL}/media?slug=${slug}`)
      //   .then((res) => (res.ok ? res.json() : null))
      //   .then((data) => (Array.isArray(data) && data.length ? data[0].id : null))

      const imageId = await axios.get(`${BASE_URL}/media?search=${slug}`, {
        // params: { slug }, // Using params to append query parameters
        headers: {
          'Authorization': `Bearer ${TOKEN}`, // Add the Bearer token to the headers
        },
      })
      .then((response) => {
        // Check if the response data is an array and has a length, then return the id
        return Array.isArray(response.data) && response.data.length ? response.data[0].id : null;
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        return null; // Return null or handle error as needed
      });

      // console.log('imageId', imageId)

      if (typeof imageId !== 'number' || !imageId) {
        return block
      }

      if (imageCache[imageId]) {
        return {
          _key: block._key,
          ...sanityIdToImageReference(imageCache[imageId]),
        } as Extract<Archive['content'], {_type: 'image'}>
      }

      const imageMetadata = await wpImageFetch(imageId)
      if (imageMetadata?.source?.url) {
        const imageDocument = await sanityUploadFromUrl(
          imageMetadata.source.url,
          client,
          imageMetadata,
        )
        if (imageDocument) {
          // Add to in-memory cache if re-used in other documents
          imageCache[imageId] = imageDocument._id

          return {
            _key: block._key,
            ...sanityIdToImageReference(imageCache[imageId]),
          } as Extract<Archive['content'], {_type: 'image'}>
        } else {
          return block
        }
      }

      return block
    }),
  )

  blocks = await Promise.all(blocksWithUploads)

  // Eliminate empty blocks
  blocks = blocks.filter((block) => {
    if (!block) {
      return false
    } else if (!('children' in block)) {
      return true
    }

    return block.children.map((c) => (c.text as string).trim()).join('').length > 0
  })

  blocks = blocks.map((block) => (block._key ? block : {...block, _key: uuid()}))

  // TS complains there's no _key in these blocks, but this is corrected in the map above
  // @ts-expect-error
  return blocks
}