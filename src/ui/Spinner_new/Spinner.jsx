import styles from "./styles.module.scss";

export const Spinner = () => {
    return (
        <div className={styles.spinnerWrapper}>
            <svg
                width="71"
                height="72"
                viewBox="0 0 71 72"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className={styles.spinner}
            >
                <path
                    d="M69 36C69 43.9765 66.1539 51.6912 60.9736 57.7565C55.7933 63.8219 48.6188 67.8398 40.7406 69.0876C32.8623 70.3354 24.7973 68.7311 17.9963 64.5634C11.1953 60.3958 6.10447 53.9381 3.63961 46.3521C1.17475 38.766 1.49758 30.5494 4.55004 23.1801C7.60249 15.8108 13.1842 9.77252 20.2913 6.15128C27.3984 2.53005 35.5644 1.56354 43.3204 3.42561C51.0765 5.28767 57.9136 9.8561 62.6021 16.3092"
                    stroke="url(#paint0_angular_102_9083)"
                    strokeWidth="4"
                />
                <defs>
                    <radialGradient
                        id="paint0_angular_102_9083"
                        cx="0"
                        cy="0"
                        r="1"
                        gradientUnits="userSpaceOnUse"
                        gradientTransform="translate(35.5 36) scale(41.5)"
                    >
                        <stop stopColor="#036BFD" />
                        <stop
                            offset="1"
                            stopColor="#036BFD"
                            stopOpacity="0.1"
                        />
                    </radialGradient>
                </defs>
            </svg>
            <div className={styles.loadingText}>Загрузка...</div>
        </div>
    );
};
