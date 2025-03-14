

export default (
    () => {
        var a = new Float32Array(16);
        return (
            (a[0] = a[15] = 1),
            a
        );
    }
)