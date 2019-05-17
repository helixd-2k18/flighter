let babel = require("@babel/core");
let browserify = require("browserify");
//import { transform } from "@babel/core";
//import * as babel from "@babel/core";

const relPath = "./";
let include = async (filename = relPath, parameters = {}, production = true)=>{
    //let result = babel.transformFileSync(filename, {
    //    sourceMaps: "inline",
    //    plugins: ["transform-es2015-modules-commonjs", "@babel/plugin-proposal-object-rest-spread"],
    //});
    let promised = new Promise((resolve, reject)=>{
        browserify(filename, {debug: true}).transform("babelify", {
            presets: ["@babel/preset-env"],
            plugins: ["@babel/plugin-transform-runtime", "@babel/plugin-transform-modules-commonjs", "@babel/plugin-proposal-object-rest-spread"],
            sourceMaps: "inline",
        }).transform("sourceify").bundle(function(err, buf) {
            if (err) reject(err); else resolve( buf.toString());
        });
    });

    return promised;
};

exports.include = include;
