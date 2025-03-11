

// n - near;

export default (
    (
        fov,
        aspect,
        n,
        far
    ) => {
        var
            t = n * Math.tan(fov * Math.PI / 360),
            r = t * aspect,

            l = -r,
            b = -t
        ;
        return new Float32Array([
            (2 * n) / (r - l), 0, (r + l) / (r - l), 0,
            0, (2 * n) / (t - b), (t + b) / (t - b), 0,
            0, 0, -(far + n) / (far - n), -(2 * far * n) / (far - n),
            0, 0, -1, 0
        ]);
    }
)