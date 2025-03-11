

export default (
    (M, angle) => {
        var
            cos = Math.cos(angle),
            sin = Math.sin(angle),
            m = new Float32Array(16)
        ;
        return (
            m.set(M),

            (m[10] = m[5] = cos),
            (m[6] = -(m[9] = sin)),

            m
        );
    }
)