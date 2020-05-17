/* eslint-disable import/no-unresolved, import/extensions */
import createSchema from 'part:@sanity/base/schema-creator';
import schemaTypes from 'all:part:@sanity/base/schema-type';

import siteSettings from './docTypes/siteSettings';
import blockContent from './modules/blockContent';
import simpleContent from './modules/simpleContent';
import minimalContent from './modules/minimalContent';

import portfolioItem from './docTypes/portfolioItem';
import post from './docTypes/post';
import category from './docTypes/category';
import page from './docTypes/page';
import meta from './modules/meta';
import menu from './docTypes/menu';

import link from './modules/link';
import imageWText from './modules/imageWText';
import menuItem from './modules/menuItem';
import headingContent from './modules/headingContent';
import socialItem from './modules/socialItem';
import field from './modules/field';
import textarea from './modules/textarea';
import fields from './modules/fields';
import feature from './modules/feature';
import slide from './modules/slide';
import iconSelector from './modules/iconSelector';
import colorList from './modules/colorList';
import tile from './modules/tile';

export default createSchema({
  name: 'default',
  types: schemaTypes.concat([
    // Settings
    siteSettings,
    meta,

    // Post Types
    post,
    page,
    menu,
    portfolioItem,

    // Taxonomies
    category,

    // Flexible Content
    blockContent,
    simpleContent,
    minimalContent,

    // Reusable Objects
    link,
    imageWText,
    menuItem,
    headingContent,
    socialItem,
    field,
    textarea,
    fields,
    feature,
    slide,
    iconSelector,
    colorList,
    tile,
  ]),
});
