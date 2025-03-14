

export default (
    (v,c,s) => (
        (v[5] = v[0] = c),
        (v[1] = -(v[4] = s)),
        v
    )
)