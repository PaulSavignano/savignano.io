import renderSelectField from '../../components/fields/renderSelectField'
import renderTextField from '../fields/renderTextField'
import renderWysiwgyField from '../fields/renderWysiwgyField'

import { fetchUpdate as articleUpdate, fetchDelete as articleDelete } from '../../actions/articles'
import { fetchUpdate as cardUpdate, fetchDelete as cardDelete } from '../../actions/cards'
import { fetchUpdate as heroUpdate, fetchDelete as heroDelete } from '../../actions/heros'
import { fetchUpdate as productUpdate, fetchDelete as productDelete } from '../../actions/products'
import { fetchUpdate as sectionUpdate, fetchDelete as sectionDelete } from '../../actions/sections'
import { fetchUpdate as viewUpdate, fetchDelete as viewDelete } from '../../actions/views'

const adminItemForms = [{
  name: 'ARTICLE',
  update: articleUpdate,
  delete: articleDelete,
  fields: [
    { name: 'button1Text', type: 'text' },
    { name: 'button1Link', type: 'text' },
    { name: 'button2Text', type: 'text' },
    { name: 'button2Link', type: 'text' },
    { name: 'flex', type: 'text' },
    { name: 'flexFlow', type: 'text' },
    { name: 'h1Text', type: 'text', },
    { name: 'h2Text', type: 'text', },
    { name: 'h3Text', type: 'text', },
    { name: 'iframe', type: 'text', },
    { name: 'mediaAlign', type: 'select', options: [ 'right', 'left' ] },
    { name: 'mediaBorder', type: 'text' },
    { name: 'mediaFlex', type: 'text' },
    { name: 'pText', type: 'wysiwgy' },
  ]
}, {
  name: 'CARD',
  update: cardUpdate,
  delete: cardDelete,
  fields: [
    { name: 'button1Text', type: 'text' },
    { name: 'button1Link', type: 'text' },
    { name: 'button2Text', type: 'text' },
    { name: 'button2Link', type: 'text' },
    { name: 'flex', type: 'text' },
    { name: 'h1Text', type: 'text', },
    { name: 'h2Text', type: 'text', },
    { name: 'h3Text', type: 'text', },
    { name: 'iframe', type: 'text', },
    { name: 'link', type: 'text', },
    { name: 'pText', type: 'wysiwgy' },
  ]
}, {
  name: 'HERO',
  update: heroUpdate,
  delete: heroDelete,
  fields: [
    { name: 'button1Text', type: 'text' },
    { name: 'button1Link', type: 'text' },
    { name: 'button2Text', type: 'text' },
    { name: 'button2Link', type: 'text' },
    { name: 'flex', type: 'text' },
    { name: 'h1Text', type: 'text', },
    { name: 'h2Text', type: 'text', },
    { name: 'h3Text', type: 'text', },
    { name: 'iframe', type: 'text', },
    { name: 'link', type: 'text', },
    { name: 'pText', type: 'wysiwgy' },
  ]
}, {
  name: 'PRODUCT',
  update: productUpdate,
  delete: productDelete,
  fields: [
    { name: 'description', type: 'text' },
    { name: 'detail', type: 'text' },
    { name: 'name', type: 'text' },
    { name: 'price', type: 'number' },
  ]
}, {
  name: 'VIEW',
  update: viewUpdate,
  delete: viewDelete,
  fields: [
    { name: 'button1Text', type: 'text' },
    { name: 'button1Link', type: 'text' },
    { name: 'button2Text', type: 'text' },
    { name: 'button2Link', type: 'text' },
    { name: 'flex', type: 'text' },
    { name: 'h1Text', type: 'text', },
    { name: 'h2Text', type: 'text', },
    { name: 'h3Text', type: 'text', },
    { name: 'iframe', type: 'text', },
    { name: 'pText', type: 'wysiwgy' },
  ]
}, {
  name: 'SECTION',
  update: sectionUpdate,
  delete: sectionDelete,
  fields: [
    { name: 'kind', type: 'select', options: [ 'Flex', 'Swipeable' ] },
    { name: 'backgroundColor', type: 'text' },
    { name: 'flexFlow', type: 'text' },
    { name: 'justifyContent', type: 'text' },
    { name: 'maxWidth', type: 'text' },
    { name: 'pageLink', type: 'text' }
  ]
}]

export default adminItemForms
