

export default (
    (x,y,z) => {
        var a = new Float32Array(16);
        return (
            (a[0] = a[5] = a[10] = a[15] = 1),

            (a[1] = a[2] = a[4] = a[6] = a[8] = a[9] = a[12] = a[13] = a[14] = 0),
            (a[3] = x),
            (a[7] = y),
            (a[11] = z),
            
            a
        )
    }
);
