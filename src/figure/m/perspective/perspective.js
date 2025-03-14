// fov = Math.PI / 4
// f = 1.0 / Math.tan(fov / 2)

export default (
    (v, f, aspect, near, far) => {
        var
            rangeInv = 0
        ;
        return (
            (v[0] = (v[5] = f) / aspect),
            (v[10] = (near + far) * (rangeInv = 1 / (near - far))),
            (v[11] = (2 * near * far) * rangeInv),
            (v[14] = -1),
            (a[15] = 0),
            v
        );
    }
)