import { ReactNode } from 'react';
import styles from '../../style';

type GlassCardProps = {
    children: ReactNode;
    variant?: 'card' | 'nav' | 'modal' | 'default';
    moreClasses?: string;
    onClick?: () => void;
}

/**
 * @description Glassmorphism card component with backdrop blur and transparency.
 * Provides consistent glass effect across the application.
 *
 * @param children - Content to render inside the glass card
 * @param variant - Glass style variant: 'card' | 'nav' | 'modal' | 'default'
 * @param moreClasses - Additional Tailwind classes to apply
 * @param onClick - Optional click handler
 */
const GlassCard = ({ children, variant = 'default', moreClasses = '', onClick }: GlassCardProps) => {
    const variantClasses = {
        card: styles.glassCard,
        nav: styles.glassNav,
        modal: styles.glassModal,
        default: styles.glass,
    };

    return (
        <div
            className={`
                ${variantClasses[variant]}
                ${moreClasses}
            `}
            onClick={onClick}
        >
            {children}
        </div>
    );
};

export default GlassCard;
