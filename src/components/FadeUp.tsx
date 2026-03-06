import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface FadeUpProps {
    children: ReactNode;
    delay?: number;
    duration?: number;
    yOffset?: number;
    className?: string;
    fullWidth?: boolean;
}

const FadeUp: React.FC<FadeUpProps> = ({
    children,
    delay = 0,
    duration = 0.8,
    yOffset = 50,
    className = '',
    fullWidth = false
}) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: yOffset }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{
                duration: duration,
                delay: delay,
                ease: [0.21, 0.47, 0.32, 0.98] // Smooth ease-out cubic
            }}
            className={className}
            style={{ width: fullWidth ? '100%' : 'auto', display: 'flex', flexDirection: 'column' }}
        >
            {children}
        </motion.div>
    );
};

export default FadeUp;
