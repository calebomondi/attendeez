import React, { useEffect, useRef, useState } from 'react';
import { QRCodeCanvas } from 'qrcode.react';

interface ResponsiveQRCodeProps {
    value: string;
    level?: 'L' | 'M' | 'Q' | 'H';
    includeMargin?: boolean;
    className?: string;
    bgColor?: string;
    fgColor?: string;
}

const ResponsiveQRCode: React.FC<ResponsiveQRCodeProps> = ({
    value,
    level = 'H',
    includeMargin = true,
    className = '',
    bgColor = '#FFFFFF',
    fgColor = '#000000'
}) => {
    const figureRef = useRef<HTMLElement | null>(null);
    const [size, setSize] = useState<number>(300);

    useEffect(() => {
        const updateSize = (): void => {
            if (figureRef.current) {
                const width = figureRef.current.clientWidth;
                const height = figureRef.current.clientHeight;
                setSize(Math.min(width, height));
            }
        };

        // Initial size
        updateSize();

        // Update size when window resizes
        window.addEventListener('resize', updateSize);
        return () => window.removeEventListener('resize', updateSize);
    }, []);

    return (
        <figure ref={figureRef} className={`bg-red-500 w-full h-full ${className}`}>
            <QRCodeCanvas
                className="w-full h-full"
                value={value}
                size={size}
                level={level}
                includeMargin={includeMargin}
                bgColor={bgColor}
                fgColor={fgColor}
            />
        </figure>
    );
};

export default ResponsiveQRCode;