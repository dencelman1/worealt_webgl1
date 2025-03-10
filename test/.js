

import {ctx_init} from '/i.js';


ctx_init(
    document.querySelector("canvas")
)
.then(
    (o) => {
        var
            resize_st = (
                () => (
                    c.viewport(0, 0, (a.width = window.width), (a.height = window.height))
                )
            ),
            st_i = 0,
            
            resize = () => (
                clearTimeout(st_i),
                (st_i = setTimeout(resize_st, 200))
            )
        ;
        return (
            console.dir(c),

            resize_st(),
            c.clear(c.COLOR_BUFFER_BIT),

            window.addEventListener("resize", resize)
        );
        

    }
);
