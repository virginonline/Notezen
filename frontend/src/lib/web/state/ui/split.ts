import { useState, useEffect, useCallback, useRef } from 'react';

export default function useSplit(initData = [30,70]) {
    const [sizes, setSizes] = useState(initData);
    const sizesRef = useRef(sizes);

    useEffect(() => {
        sizesRef.current = sizes;
    }, [sizes]);

    const saveSizes = useCallback(
        async (sizes: [number, number]) => {
            setSizes(sizes);

        },
        []
    );

    const resize = useCallback(
        async (scale: number) => {
            const size = sizesRef.current?.[0] * scale;

            await saveSizes([size, 100 - size]);
        },
        [saveSizes]
    );

    return {
        sizes,
        saveSizes,
        resize,
    };
}