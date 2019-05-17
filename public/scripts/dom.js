// expose fulfilled state holder to outer scope
let domResolve, domReady = new Promise(function(resolve) {
    domResolve = resolve;
    });
    
    // add event listener and trigger resolve when ready
    document.addEventListener('DOMContentLoaded', domResolve);

class Draggable {
    constructor(element){
        this.rx = 0, this.ry = 0, this.dragging = false, this.hx = 0, this.hy = 0, this.sx = 0, this.sy = 0;
        this.handle = null;
        this.window = null;

        this.window = element;
        this.handle = this.window.querySelector(".window-title");

        this.handle.addEventListener("mousedown", (e)=>{
            this.mouseDown(e);
        });

        document.addEventListener("mouseup", (e)=>{
            this.mouseUp(e);
        });

        document.addEventListener("mousemove", (e)=>{
            this.mouseMove(e);
        });
    }
    mouseDown(e){
        e = e || window.event;
        e.preventDefault();
        this.dragging = true;
        this.hx = e.clientX - this.rx;
        this.hy = e.clientY - this.ry;
    }
    mouseUp(e){
        e = e || window.event;
        this.dragging = false;
    }
    mouseMove(e){
        e = e || window.event;
        if (this.dragging) {
            this.rx = e.clientX - this.hx;
            this.ry = e.clientY - this.hy;
            
            this.window.style.setProperty("--drag-x", `${this.rx}px`);
            this.window.style.setProperty("--drag-y", `${this.ry}px`);
        }
    }
}


class Resizable {
    constructor(element){
        this.rx = 0, this.ry = 0, this.dragging = false, this.hx = 0, this.hy = 0, this.sx = 0, this.sy = 0;
        this.handle = null;
        this.window = null;

        this.window = element;
        this.handle = this.window.querySelector(".resize-handle");

        this.handle.addEventListener("mousedown", (e)=>{
            this.mouseDown(e);
        });

        document.addEventListener("mouseup", (e)=>{
            this.mouseUp(e);
        });

        document.addEventListener("mousemove", (e)=>{
            this.mouseMove(e);
        });
    }
    mouseDown(e){
        e = e || window.event;
        e.preventDefault();
        this.dragging = true;
        this.hx = e.clientX - this.rx;
        this.hy = e.clientY - this.ry;
    }
    mouseUp(e){
        e = e || window.event;
        this.dragging = false;
    }
    mouseMove(e){
        e = e || window.event;
        if (this.dragging) {
            this.rx = Math.max(e.clientX - this.hx, -960);
            this.ry = Math.max(e.clientY - this.hy, -540);
            
            this.window.style.setProperty("--size-x", `${this.rx}px`);
            this.window.style.setProperty("--size-y", `${this.ry}px`);
        }
    }
}



class NavBar {
    constructor(element){
        let navs = element.querySelectorAll(".nav");
        for (let nav of navs) {
            let button = nav.querySelector(".nav-button"), list = nav.querySelector(".nav-list");

            // activate hover trigger 
            button.addEventListener("click", (e)=>{
                element.classList.toggle("actived");
            });

            // disable hover trigger when mouse leave
            element.addEventListener("mouseleave", (e)=>{
                element.classList.remove("actived");
            });

            // only after link clicking (disable trigger too)
            list.addEventListener("click", (e)=>{
                element.classList.remove("actived");
            });
        }
    }
    
}