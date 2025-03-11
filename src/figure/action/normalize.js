

export default (
    (v) => {
        var
            v0 = v[0],
            v1 = v[1],
            v2 = v[2],
            l = Math.sqrt(v0 * v0 + v1 * v1 + v2 * v2)
        ;
        return [v0 / l, v1 / l, v2 / l];
    }
)