#! /usr/bin/env node

var fs         = require("fs");
var path       = require("path");
var program    = require("commander");
var changeCase = require("change-case");

function run(name, options) {

  var dir       = path.resolve(name);
  var stylesExt = options.styles || "css";
  var styles    = path.resolve(dir, name + "." + stylesExt)
  var jsx       = path.resolve(dir, name + ".jsx");
  var js        = path.resolve(dir, name + ".js");
  var index     = path.resolve(dir, "index.js");

var jsContent = `import React    from "react";
import template from "./${name}.jsx";

class ${name} extends React.Component {
  render() {
    return template.call(this);
  }
}

export default ${name};
`;

var jsxContent = `import "./${name}.${stylesExt}";
import React from "react";

function template() {
  return (
    <div className="${changeCase.paramCase(name)}">
      <h1>${name}</h1>
    </div>
  );
};

export default template;
`;

var indexContent = `import ${name} from "./${name}";
export default ${name};
`;

  fs.mkdirSync("./"+name);
  fs.openSync(styles, "w");
  fs.writeSync(fs.openSync(js, "w"), jsContent);
  fs.writeSync(fs.openSync(jsx, "w"), jsxContent);
  fs.writeSync(fs.openSync(index, "w"), indexContent);
  console.log("Finished");

}

program
  .version('0.0.1')
  .option('-s, --styles [extension]', 'styles extension [default: css]')
  .arguments('<name>')
  .action(run)
  .parse(process.argv);
