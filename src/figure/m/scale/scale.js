

export default (
    (v,x,y,z) => (
        (v[0] = x),
        (v[5] = y),
        (v[10] = z),
        v
    )
)