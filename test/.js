

import render from '/test/render.js';
import * as c from "/i.js"; // all that functions
import load_glsl from './test/load_glsl.js';


(
    (a,c) => {
        var
            b = (
                a.getContext("webgl")
                ||
                null
            ),
            
            resize = (
                (e) => {
                    var w = e.currentTarget;
                    return (
                        b.viewport(
                            0,
                            0,
                            (a.width = w.innerWidth),
                            (a.height = w.innerHeight)
                        )
                    );
                }
            ),

            _ = b.createProgram()
        ;
        
        return (
            b.clear(b.COLOR_BUFFER_BIT),

            b.enable(b.DEPTH_TEST),

            window.addEventListener( "resize", resize ),
            window.dispatchEvent( new Event("resize") ),

            load_glsl(b, JSON.parse(document.getElementById("v").textContent), _),
            b.linkProgram(_),

            (b.getProgramParameter(_, b.LINK_STATUS))
            ? render(a,b,c,_)
            : console.error(b.getProgramInfoLog(_))
        );
    }
)(
    document.querySelector("canvas"),
    c
);
