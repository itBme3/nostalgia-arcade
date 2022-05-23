const { init } = require('../serverless.js');

exports.handler = init({
	appDir: "_app",
	assets: new Set(["favicon.png","svg/cat.svg","svg/peach.svg"]),
	mimeTypes: {".png":"image/png",".svg":"image/svg+xml"},
	_: {
		entry: {"file":"start-54d451f2.js","js":["start-54d451f2.js","chunks/index-15812f07.js","chunks/index-8d5bcaa2.js"],"css":[]},
		nodes: [
			() => Promise.resolve().then(() => require('../server/nodes/0.js')),
			() => Promise.resolve().then(() => require('../server/nodes/1.js')),
			() => Promise.resolve().then(() => require('../server/nodes/3.js')),
			() => Promise.resolve().then(() => require('../server/nodes/2.js')),
			() => Promise.resolve().then(() => require('../server/nodes/4.js')),
			() => Promise.resolve().then(() => require('../server/nodes/5.js'))
		],
		routes: [
			{
				type: 'page',
				id: "",
				pattern: /^\/$/,
				names: [],
				types: [],
				path: "/",
				shadow: null,
				a: [0,2],
				b: [1]
			},
			{
				type: 'page',
				id: "boxes-dots",
				pattern: /^\/boxes-dots\/?$/,
				names: [],
				types: [],
				path: "/boxes-dots",
				shadow: null,
				a: [0,3],
				b: [1]
			},
			{
				type: 'page',
				id: "snake",
				pattern: /^\/snake\/?$/,
				names: [],
				types: [],
				path: "/snake",
				shadow: null,
				a: [0,4],
				b: [1]
			},
			{
				type: 'page',
				id: "tic-tac-toe",
				pattern: /^\/tic-tac-toe\/?$/,
				names: [],
				types: [],
				path: "/tic-tac-toe",
				shadow: null,
				a: [0,5],
				b: [1]
			}
		],
		matchers: async () => {
			
			return {  };
		}
	}
});
