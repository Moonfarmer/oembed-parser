/**
 * Starting app
 * @ndaidong
**/

import 'babel-polyfill';
import * as main from './main';
import packageJSON from '../package.json';

main.version = packageJSON.version;

export default main;
