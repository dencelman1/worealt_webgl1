import {gpu_proto, gl_proto} from '../proto/i.js';


export default (
    (a) => {
        var
            g = navigator.gpu,
            gctx = null,

            o = {
                conf: null,
                gctx: null,
                ad: null,

                lctx: null
            }
        ;
        return (
            Promise.resolve(
                g
                ? (
                    Object.setPrototypeOf(o, gpu_proto),

                    (o.gctx = gctx = a.getContext("webgpu")),

                    g.requestAdapter()
                    .then(ad => (
                        (o.ad = ad),

                        Promise.all([
                            ad.requestDevice(),
                            g.getPreferredCanvasFormat()
                        ])
                        .then(
                            (A) => (
                                gctx.configure(
                                    o.conf = { device:A[0], format:A[1] }
                                ),
                                o
                            )
                        )
                    ))
                )
                : (
                    Object.setPrototypeOf(o, gl_proto),

                    (
                        o.lctx = (
                            a.getContext("webgl")
                            ||
                            null
                        )
                    ),
                    o
                )
            )
        );
    }
);