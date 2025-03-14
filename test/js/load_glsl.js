

export default (
    (b, glsl, _) => {
        var
            COMPILE_STATUS = b.COMPILE_STATUS,
            shader_type = [
                b.VERTEX_SHADER,
                b.FRAGMENT_SHADER
            ]
        ;
        for (
            var
                i = 0,
                a = null,
                s = null,
                sc = "",
                al = 0,
                j = 0,
                type = 0
            ;
            i < 2;
            i++, j = 0
        ) {
            al = ( a = glsl[i] ).length;
            type = shader_type[i];
            
            for (;j < al; j++) {
                b.shaderSource((s = b.createShader(type)), (sc = a[j])),
                b.compileShader(s),
                console.log(sc);


                (b.getShaderParameter(s, COMPILE_STATUS))
                ? b.attachShader(_, s)
                : (
                    console.error(sc),
                    console.error(b.getShaderInfoLog(s)),
                    b.deleteShader(s)
                );
            };
        };
    }
)