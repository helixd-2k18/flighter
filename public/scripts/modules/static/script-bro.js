//import untar from "js-untar";

function getFileDirectory(filePath) {
  if (filePath.indexOf("/") == -1) 
  { return filePath.substring(0, filePath.lastIndexOf('\\')); } else 
  { return filePath.substring(0, filePath.lastIndexOf('/')); }
}

class ScriptBro {
    constructor(){
        this.modules = {};
        this.last = "";
    }
    async init(options = {}){
        this.fs = await fs.init({type: window.TEMPORARY, bytes: 5 * 1024 * 1024});
        return this;
    }
    fetch(url, outp = url){
        this.modules[this.last = outp] = (async (resolve, reject)=>{
            if (await fs.exists(outp)) { // if alread exist
                return fs.readFile(outp, {type: "Blob"});
            } else {
                let response = await fetch(url), blob = response.blob();
                let existd = await fs.mkdir(getFileDirectory(outp));
                let existf = await fs.writeFile(outp, await blob);
                return blob; //blob;
            }
        })();
        return this;
    }
    async get(name){
        name = name || this.last;
        if (this.modules[name]) {
            return import(URL.createObjectURL(await this.modules[name])); // use blob hack for load module
        };
        return {};
    }
}

export async function init(options = {}) {
    return new ScriptBro().init(options);
}
