

export default (
    (a, b) => {
        var r = new Float32Array(16);
        for (
            var
                i = 0,
                j = 0,
                k = 0,
                i4 = 0,
                i4j = 0
            ;
            i < 4;
            i++, j = 0
        ) {
            i4 = i * 4;
            for (
                ;
                j < 4;
                j++, k = 0
            ) {
                r[i4j = (i4 + j)] = 0;
                for (
                    ;
                    k < 4;
                    k++
                ) {
                    r[i4j] += a[i4 + k] * b[i4j];
                };
            };
        };
        return r;
    }
)