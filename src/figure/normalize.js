

export default (
    (v) => {
        var
            v0 = v[0],
            v1 = v[1],
            v2 = v[2],
            l = Math.sqrt((v0 ** 2) + (v1 ** 2) + (v2 ** 2))
        ;
        return (
            l > 0
            ? (
                (v[0] = v0 / l),
                (v[1] = v1 / l),
                (v[2] = v2 / l)
            )
            : ( v[0] = v[1] = v[2] = 0 ),
            v
        );
    }
)