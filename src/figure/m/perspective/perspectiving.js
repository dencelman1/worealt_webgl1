

export default (
    () => {
        var a = new Float32Array(16);
        return (
            (a[0] = a[5] = a[10] = a[15] = 1),
            (a[14] = -1),
            a
        );
    }
)