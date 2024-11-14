import type {UploadClientConfig} from '@sanity/client'
import {decode} from 'html-entities'

import axios from 'axios'

import {BASE_URL, TOKEN} from '../constants'

// Get WordPress' asset metadata about an image by its ID
export async function wpImageFetch(id: number): Promise<UploadClientConfig | null> {
  // const wpApiUrl = new URL(`${BASE_URL}/media/${id}`).toString()
  // const imageData = await fetch(wpApiUrl).then((res) => res.json())

  const imageData = await axios.get(`${BASE_URL}/media/${id}`, {
    headers: {
      'Authorization': `Bearer ${TOKEN}`, // Add Bearer token in the headers
    }
  })
  .then((response) => response.data) // Get the response data
  .catch((error) => {
    console.error('Error fetching image data:', error);
    return null; // Handle error (return null or appropriate value)
  });

  if (!imageData || !imageData.source_url) {
    return null
  }

  let metadata: UploadClientConfig = {
    filename: imageData.source_url.split('/').pop(),
    source: {
      id: imageData.id,
      name: 'WordPress',
      url: imageData.source_url,
    },
    // Not technically part of the Sanity imageAsset schema, but used by the popular Media Plugin
    // @ts-expect-error
    altText: imageData.alt_text,
  }

  if (imageData?.title?.rendered) {
    metadata.title = decode(imageData.title.rendered)
  }

  if (imageData?.image_meta?.caption) {
    metadata.description = imageData.image_meta.caption
  }

  if (imageData?.image_meta?.credit) {
    metadata.creditLine = imageData.image_meta.credit
  }

  return metadata
}