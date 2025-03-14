

export default (
    (v,x,y,z) => (
        (v[3] = x),
        (v[7] = y),
        (v[11] = z),
        v
    )
)