'use strict';Object.defineProperty(exports,'__esModule',{value:!0}),exports.fetchEmbed=void 0;var _nodeFetch=require('node-fetch'),_nodeFetch2=_interopRequireDefault(_nodeFetch);function _interopRequireDefault(a){return a&&a.__esModule?a:{default:a}}var fetchEmbed=exports.fetchEmbed=function(a,b,c){return new Promise(function(d,e){var f=b.provider_name,g=b.provider_url,h=b.url,i=h.match('{format}')?h.replace('{format}','json')+'?url='+encodeURIComponent(a):h+'?format=json&url='+encodeURIComponent(a),j=c?''+c+encodeURIComponent(i):i;return(0,_nodeFetch2.default)(j).then(function(a){return a.json()}).then(function(a){return a.provider_name=f,a.provider_url=g,d(a)}).catch(function(a){return e(a)})})};