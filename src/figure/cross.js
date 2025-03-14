

export default (
    (v, a, b) => {
        var
            a0 = a[0], a1 = a[1], a2 = a[2],
            b0 = b[0], b1 = b[1], b2 = b[2]
        ;
        return (
            (v[0] = ((a1 * b2) - (a2 * b1))),
            (v[1] = ((a2 * b0) - (a0 * b2))),
            (v[2] = ((a0 * b1) - (a1 * b0))),
            v
        );
    }
)