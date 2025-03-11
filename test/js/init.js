

export default (
    (a) => {
        var
            b = (
                a.getContext("webgl2")
                ||
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
            )
        ;
        return (
            b.clear(b.COLOR_BUFFER_BIT),

            b.enable(b.DEPTH_TEST),
            b.depthFunc(b.LESS),
            b.enable(b.CULL_FACE),
            b.cullFace(b.BACK),

            window.addEventListener("resize", resize),

            window.dispatchEvent( new Event("resize") )
        );
    }
);
