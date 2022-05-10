const parseRoute = (config) => {
  return (
    Object.keys(config)
      // sort longest path first
      .sort(function (a, b) {
        return b.length - a.length;
      })
      // convert into more usable format
      .map(function (path) {
        return {
          // create regex
          path: new RegExp("^" + path.replace(/:[^\s/]+/g, "([\\w-]+)") + "$"),
          module: config[path],
        };
      })
  );
};

const routeMatcher = (path = "", config) => {
  config = parseRoute(config);
  const result = {};

  for (var i = 0, l = config.length; i < l; i++) {
    // parse if possible
    var found = path.match(config[i].path);
    if (found) {
      // parsed successfully
      // module to load
      result["module"] = config[i].module;
      // arguments for module
      result["args"] = found.slice(1);

      break; // ignore the rest of the paths
    }
  }

  return result;
};

module.exports = {
  routeMatcher,
  parseRoute,
};
