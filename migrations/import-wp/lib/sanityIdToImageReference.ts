import type {Archive} from '../../../sanity.types'

export function sanityIdToImageReference(id: string): Archive['featuredMedia'] {
  return {
    _type: 'image',
    asset: {_type: 'reference', _ref: id},
  }
}