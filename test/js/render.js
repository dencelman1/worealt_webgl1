

export default (
    (a, b, c, _) => {

        var
            dot = c.dot,
            normalize = c.normalize,
            cross = c.cross,

            mperspectiving = c.mperspectiving,
            mperspective = c.mperspectiving,
            multiply = c.multiply,
        
            mrotationx = c.mrotationx,
            mrotationy = c.mrotationy,
            mrotationz = c.mrotationz,
        
            mrotatex = c.mrotatex,
            mrotatey = c.mrotatey,
            mrotatez = c.mrotatez,
        
            mscaling = c.mscaling,
        
            mtranslation = c.mtranslation,
            mtranslate = c.mtranslate,
        
            msimple = c.msimple,

            mscale = c.mscale,


            positionLocation = null,
            u_mvp = null,

            mouse_step = 0.001,
            move_step = 0.1,

            cubeVertices = new Float32Array([
                -1, -1, -1,   1, -1, -1,   1,  1, -1,  -1,  1, -1,
                -1, -1,  1,   1, -1,  1,   1,  1,  1,  -1,  1,  1
            ]),

            cubeIndices = new Uint16Array([
                0, 1, 2,  2, 3, 0,
                1, 5, 6,  6, 2, 1,
                5, 4, 7,  7, 6, 5,
                4, 0, 3,  3, 7, 4,
                3, 2, 6,  6, 7, 3,
                4, 5, 1,  1, 0, 4
            ]),
            cubeIndicesL = cubeIndices.length,

            vertexBuffer = b.createBuffer(),
            indexBuffer = b.createBuffer(),

            ARRAY_BUFFER = b.ARRAY_BUFFER,
            ELEMENT_ARRAY_BUFFER = b.ELEMENT_ARRAY_BUFFER,

            STATIC_DRAW = b.STATIC_DRAW,
            buffer_bit = b.COLOR_BUFFER_BIT | b.DEPTH_BUFFER_BIT,
            TRIANGLES = b.TRIANGLES,
            UNSIGNED_SHORT = b.UNSIGNED_SHORT,

            PI4 = Math.PI / 4,
            f = 1.0 / Math.tan(PI4 / 2),

            near = 0.1,
            far = 100,

            tx = 0, ty = 0, tz = -5,

            rx = 0, ry = 0, rz = 0,

            sx = 1, sy = 1, sz = 1,
            
            rx_sc = msimple(),
            ry_rxsc = msimple(),
            rx_ryrxsc = msimple(),
            t_rzryrxsc = msimple(),

            cx_sc = msimple(),
            cx_ct = msimple(),
            cy_cxct = msimple(),
            cz_cycxct = msimple(),

            view_model = msimple(),
            persp_viewmodel = msimple(),


            w = msimple(),

            

            cx = 0,
            mcx = 0,

            cy = 0,
            mcy = 0,

            cz = 5,
            mcz = -5,

            c_coords = [cx, cy, cz],
            
            crx = 0,
            mcrx = 0,

            cry = 0,
            mcry = 0,

            crz = 0,
            mcrz = 0,

            targetx = 0,
            targety = 0,
            targetz = 0,

            up_coords = [0,1,0],

            forward = [0,0,0],
            right = [0,0,0],
            up = [0,0,0],

            PERSP = mperspectiving(),

            CRX = mrotationx(),
            CRY = mrotationy(),
            CRZ = mrotationz(),

            RX = mrotationx(),
            RY = mrotationy(),
            RZ = mrotationz(),

            SC = mscaling(),

            T = mtranslation(tx, ty, tz),
            CT = mtranslation(cx, cy, cz),
            
            render = (time) => {
                return (
                    (forward[0] = targetx - cx),
                    (forward[1] = targety - cy),
                    (forward[2] = targetz - cz),

                    cross(up, forward, normalize(cross(right, up_coords, normalize(forward)))),

                    (w[0] = right[0]),
                    (w[1] = up[0]),
                    (w[2] = -forward[0]),

                    (w[4] = right[1]),
                    (w[5] = up[1]),
                    (w[6] = -forward[1]),

                    (w[8] = right[2]),
                    (w[9] = up[2]),
                    (w[10] = -forward[2]),

                    (w[12] = -dot(right, c_coords)),
                    (w[13] = -dot(up, c_coords)),
                    (w[14] = dot(forward, c_coords)),

                    (w[3] = w[7] = w[11] = 0),
                    (w[15] = 1),

                    


                    b.clear(buffer_bit)
                    , b.uniformMatrix4fv(u_mvp, false, (
                        multiply(
                            mperspective(PERSP, f, (a.width / a.height), near, far),

                            multiply(

                                w,

                                // multiply(
                                //     mtranslate(CT, cx, cy, cz),

                                //     multiply(
                                //         mrotatez(CRZ, Math.cos(mcrz), Math.sin(mcrz)),
                                //         multiply(
                                //             mrotatey(CRY, Math.cos(mcry), Math.sin(mcry)),
                                //             multiply(
                                //                 mrotatex(CRX, Math.cos(mcrx), Math.sin(mcrx)),
                                //                 mscale(SC, sx,sy,sz),
                                //                 cx_sc
                                //             ),
                                //             cx_ct
                                            
                                //         ),
                                //         cy_cxct
                                //     ),

                                //     cz_cycxct
                                // ),
                                    

                                multiply(
                                    mtranslate(T, tx, ty, tz),
                                    multiply(
                                        mrotatez(RZ, Math.cos(rz), Math.sin(rz)),
                                        multiply(
                                            mrotatey(RY, Math.cos(ry), Math.sin(ry)),
                                            multiply(
                                                mrotatex(RX, Math.cos(rx), Math.sin(rx)),
                                                mscale(SC, sx, sy, sz),
                                                rx_sc
                                            ),
                                            ry_rxsc
                                        ),
                                        rx_ryrxsc
                                    ),
                                    t_rzryrxsc
                                ),
    
                                view_model
                            ),
    
                            persp_viewmodel
                        )
                    ))
                    , b.drawElements(TRIANGLES, cubeIndicesL, UNSIGNED_SHORT, 0)
                    , requestAnimationFrame(render)
                );
            },

            setPointLockWaiter = () => document.body.addEventListener("click", onPointLocker),

            onPointLocker = (
                (e) => (
                    e
                    .currentTarget
                    .requestPointerLock(),
                    console.dir(persp_viewmodel)
                )
            ),

            onPointLockerChange = (
                () => {
                    var t = document.body;
                    return (
                        (document.pointerLockElement === t)
                        ? (
                            window.addEventListener("mousemove", mousemove),
                            window.addEventListener("keydown", keydown),
                            t.removeEventListener("click", onPointLocker)
                        )
                        : (
                            window.removeEventListener("mousemove", mousemove),
                            window.removeEventListener("keydown", keydown),
                            setTimeout(setPointLockWaiter, 1500)
                        )
                    );
                }
            ),

            mousemove = (
                (e) => (
                    (mcry = -(cry += (e.movementX * mouse_step))),
                    (mcrx = -(crx += (e.movementY * mouse_step)))
                )
            ),

            keydown = (
                (e) => {
                    var k = e.keyCode;

                    var forwardX = Math.sin(cry);
                    var forwardZ = Math.cos(cry);

                    var rightX = Math.cos(cry);
                    var rightZ = -Math.sin(cry);

                    if (k === 87) { // W - Move forward
                        cx += forwardX * move_step;
                        cz += forwardZ * move_step;
                    }
                    if (k === 83) { // S - Move backward
                        cx -= forwardX * move_step;
                        cz -= forwardZ * move_step;
                    }
                    if (k === 65) { // A - Move left
                        cx -= rightX * move_step;
                        cz -= rightZ * move_step;
                    }
                    if (k === 68) { // D - Move right
                        cx += rightX * move_step;
                        cz += rightZ * move_step;
                    };

                    c_coords[0] = cx;
                    c_coords[2] = cz;

                    mcx = -cx;
                    mcz = -cz;
                }
            )
        ;

        return (
            b.useProgram(_),
            b.bindBuffer(ARRAY_BUFFER, vertexBuffer),
            b.bufferData(ARRAY_BUFFER, cubeVertices, STATIC_DRAW),
            
            b.bindBuffer(ELEMENT_ARRAY_BUFFER, indexBuffer),
            b.bufferData(ELEMENT_ARRAY_BUFFER, cubeIndices, STATIC_DRAW),

            b.enableVertexAttribArray(positionLocation = b.getAttribLocation(_, "position")),
            b.vertexAttribPointer(positionLocation, 3, b.FLOAT, false, 0, 0),
            
            (u_mvp = b.getUniformLocation(_, "u_mvp")),

            document
            .body
            .addEventListener(
                "click",
                onPointLocker
            ),
            
            document.addEventListener("pointerlockchange", onPointLockerChange),
            document.addEventListener('pointerlockerror', console.error),

            render(0)
        );
    }
)


