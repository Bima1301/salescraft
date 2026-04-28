export const stagger = {
    hidden: {},
    show: { transition: { staggerChildren: 0.1 } },
};

export const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};