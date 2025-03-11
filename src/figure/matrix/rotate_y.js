

export default (
    (M, a) => {
        var
            cos = Math.cos(a),
            sin = Math.sin(a),
            m = new Float32Array(16)
        ;
        return (
            m.set(M),
            
            (m[8] = -(m[2] = sin)),
            (m[0] = m[10] = cos),
            m
        );
    }
)