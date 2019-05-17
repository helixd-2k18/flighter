//import untar from "js-untar/build/dev/untar.js";
//import scbro from "modules/static/script-bro.js"

(async ()=>{
    await domReady;

    // import static module dynamicly
    let scbro = await import("./modules/static/script-bro.js");

    let scr = await scbro.init(); // init filesystem
    
    // TODO: load tarball into filesystem
    //await scbro.tar("tar/components.tar");

    // fetch modules/taskbar.js into "modules/modules/taskbar.js" in filesystem
    let modulepath = "modules/taskbar.js";
    let taskbar = await scr.fetch("public/scripts/modules/dynamic/taskbar.js", "system/modules/taskbar.js").get();
    console.log(taskbar);
    
    // set module names by local filesystem
    //scr.set({ "taskbar": modulepath });

})();
