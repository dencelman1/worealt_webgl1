

export default (
    (a,b,r) => {
        for (
            var
                i = 0,
                j = 0,
                k = 0,
                i4 = 0,
                i4j = 0,
                v = 0
            ;
            i < 4;
            i++, j = 0
        ) {
            i4 = i * 4;
            for (; j < 4; j++, v = k = 0) {
                i4j = i4 + j;

                for (
                    ;
                    k < 4;
                    k++
                ) {
                    v += a[i4 + k] * b[k * 4 + j];
                };
                r[i4j] = v;
            };
            
        }
        return r;
    }
);
