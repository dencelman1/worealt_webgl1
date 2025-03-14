
export default (
    () => {
        var a = new Float32Array(16);
        return (
            (a[5] = a[15] = 1),
            a
        );
    }
)