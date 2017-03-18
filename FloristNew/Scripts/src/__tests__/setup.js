var jsdom = require('jsdom').jsdom;
require('isomorphic-fetch')

global.document = jsdom('<html><head></head><body><div id="component"></div></body></html>');
global.window = document.defaultView;
var scripts = ["Content/jquery-3.1.1.min.js", "semantic/dist/semantic.js"];
for (var i in scripts) {
    var script = document.createElement("script");
    script.type = "text/javascript";
    var fs = require("fs");
    var requireJSFile = fs.readFileSync(scripts[i], "utf8");
    script.innerHTML = requireJSFile;
    var head = window.document.getElementsByTagName('body')[0];
    head.appendChild(script);
}

global.window = document.defaultView;
Object.keys(document.defaultView).forEach((property) => {
    if (typeof global[property] === 'undefined') {
        global[property] = document.defaultView[property];
    }
});

global.navigator = {
    userAgent: 'node.js'
};