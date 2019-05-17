const sass = require('node-sass');
const packageImporter = require('node-sass-package-importer');
//import { transform } from "@babel/core";
//import * as babel from "@babel/core";

const relPath = "./";

let sass_render = (options)=>{
    return (new Promise((resolve, reject)=>{
        sass.render(options, (err, result)=>{
            if (err) reject(err); else resolve(result); 
        });
    }));
};

let include = async (filename = relPath, parameters = {}, production = true)=>{
    let result = await sass_render({
        file: filename,
        sourceMapEmbed: true,
        sourceMapContents: true,
        importer: packageImporter(),
        includePaths: ["node_modules", "../node_modules"]
    });
    return result.css.toString("utf-8");
};

exports.include = include;
