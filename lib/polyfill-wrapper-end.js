
  
  if (!System.paths['@traceur'])
    System.paths['@traceur'] = __$curScript && __$curScript.getAttribute('data-traceur-src')
      || (__$curScript && __$curScript.src 
        ? __$curScript.src.substr(0, __$curScript.src.lastIndexOf('/') + 1) 
        : System.baseURL + (System.baseURL.lastIndexOf('/') == System.baseURL.length - 1 ? '' : '/')
        ) + 'traceur.js';

  return System;
};

function __eval(__source, __global, __address, __sourceMap, __useScript) {
  try {
    if(__useScript && typeof document !== "undefined") {
    	    var script = document.createElement("script");
    	    script.text = __source
    	      + '\n//# sourceURL=' + __address;
    	    (document.head || document.body || document.documentElement).appendChild(script); 
    } else {
          __source = __source
            + '\n//# sourceURL=' + __address
            + (__sourceMap ? '\n//# sourceMappingURL=' + __sourceMap : '');
          eval.call(__global, __source);
    }
    
    
  }
  catch(e) {
    if (e.name == 'SyntaxError')
      e.message = 'Evaluating ' + __address + '\n\t' + e.message;
    if (System.trace && System.execute == false)
      e = 'Execution error for ' + __address + ': ' + e.stack || e;
    throw e;
  }
}

var __$curScript;

(function(global) {
  global.upgradeSystemLoader = function() {
    global.upgradeSystemLoader = undefined;
    var originalSystem = global.System;
    global.System = __upgradeSystemLoader(global.System);
    global.System.clone = function() {
      return __upgradeSystemLoader(originalSystem);
    };
  };

  if (typeof window != 'undefined') {
    var scripts = document.getElementsByTagName('script');
    __$curScript = scripts[scripts.length - 1];

    if (!global.System || !global.LoaderPolyfill) {
      // determine the current script path as the base path
      var curPath = __$curScript.src;
      var basePath = curPath.substr(0, curPath.lastIndexOf('/') + 1);
      document.write(
        '<' + 'script type="text/javascript" src="' + basePath + 'es6-module-loader.js" data-init="upgradeSystemLoader">' + '<' + '/script>'
      );
    }
    else {
      global.upgradeSystemLoader();
    }
  }
  else {
    var es6ModuleLoader = require('es6-module-loader');
    global.System = es6ModuleLoader.System;
    global.Loader = es6ModuleLoader.Loader;
    global.upgradeSystemLoader();
    module.exports = global.System;
  }
})(__$global);

})(typeof window != 'undefined' ? window : global);
