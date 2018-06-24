/**
 * Starting app
 * @ndaidong
**/

import * as main from './main';
import packageJSON from '../package';

main.version = packageJSON.version;
console.log('main', main);

export default main;
