

export default (
    (a, b) => {
        var
            a0 = a[0],
            a1 = a[1],
            a2 = a[2],

            b0 = b[0],
            b1 = b[1],
            b2 = b[2]
        ;
        return [
            (a1 * b2) - (a2 * b1),
            (a2 * b0) - (a0 * b2),
            (a0 * b1) - (a1 * b0)
        ]
    }
);
