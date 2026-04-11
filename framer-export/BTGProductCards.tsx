import { addPropertyControls, ControlType } from "framer"
import { useState, useEffect } from "react"

const TERRAIN_URL = "https://iili.io/qF2ox3u.png"

const RAINMAKER_LOGO = `<svg width="558" height="48" viewBox="0 0 558 48" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_rm)"><path d="M292.532 45.9724H309.508L295.801 0.230469H280.425L251.008 45.99H267.386L271.919 38.3985H290.634L292.532 45.99V45.9724ZM277.964 28.2415C277.964 28.2415 284.818 16.538 285.011 16.1338H285.134C285.187 16.538 288.069 28.2415 288.069 28.2415H277.947H277.964Z" fill="white"/><path d="M92.5205 45.9724H109.601L95.8066 0.230469H80.325L50.7148 45.9724H67.1981L71.767 38.381H90.5875L92.5029 45.9724H92.5205ZM77.8648 28.2415C77.8648 28.2415 84.7533 16.538 84.9642 16.1338H85.0872C85.1399 16.538 88.0394 28.2415 88.0394 28.2415H77.8648Z" fill="white"/><path d="M463.152 15.7472C463.995 10.7214 463.187 6.87298 460.692 4.21949C458.231 1.566 454.33 0.230469 449.006 0.230469H420.749L410.223 45.99H424.65L428.024 32.0372H438.849L444.367 45.99H461.201L453.627 29.7352C454.699 29.1728 455.719 28.5226 456.65 27.7494C460.094 24.9202 462.256 20.9136 463.134 15.7472H463.152ZM448.496 15.1498C448.215 16.3798 447.582 17.3288 446.616 17.979C445.649 18.6292 444.402 18.9455 442.855 18.9455H430.66L432.505 11.5298H444.736C446.264 11.5298 447.354 11.8285 447.969 12.4084C448.619 12.9707 448.795 13.8845 448.479 15.1498H448.496Z" fill="white"/><path d="M52.9292 15.6749C53.7727 10.6316 52.9643 6.78312 50.469 4.11206C48.0088 1.441 44.1077 0.105469 38.7831 0.105469H10.5261L0 45.9704H14.4272L17.8012 31.9825H28.626L34.1439 45.9704H50.9786L43.4048 29.6804C44.4767 29.1181 45.4959 28.4679 46.4273 27.6947C49.8715 24.8655 52.033 20.8413 52.9116 15.6574L52.9292 15.6749ZM38.2735 15.0599C37.9923 16.3076 37.3597 17.2389 36.3932 17.8891C35.4267 18.5393 34.179 18.8732 32.6326 18.8732H20.4371L22.2823 11.4399H34.5129C36.0418 11.4399 37.1313 11.7386 37.7463 12.3185C38.3965 12.8809 38.5722 13.7947 38.2559 15.0599H38.2735Z" fill="white"/><path d="M110.162 45.9705L120.618 0.421875H136.504L126.101 45.9705H110.145H110.162Z" fill="white"/><path d="M131.48 45.9178L141.884 0.421875H156.697L168.963 25.0062L174.604 0.421875H190.56L180.104 45.9178H165.413L153.077 21.2983L147.437 45.9178H131.48Z" fill="white"/><path d="M185.605 45.9706L196.009 0.615234H215.391L220.417 28.1518L238.06 0.615234H258.111L247.69 45.9706H231.681C233.21 38.1507 235.266 30.2078 237.814 22.6691L222.297 45.9706H211.754L206.482 20.6658C205.322 29.0831 203.811 37.7641 201.579 45.9706H185.623H185.605Z" fill="white"/><path d="M309.246 45.9724L319.737 0.230469H335.834L332.126 16.1865C337.925 10.7566 343.917 5.53745 349.822 0.230469H371.348L345.71 21.3705L359.399 45.9724H341.053L333.338 30.6665L327.961 34.4622L325.308 45.9548H309.246V45.9724Z" fill="white"/><path d="M363.125 45.9724L373.651 0.230469H414.666L412.188 10.8796H387.288L385.776 17.3463H409.798L407.408 27.6616H383.439L381.647 35.3584H406.512L404.07 45.9724H363.125Z" fill="white"/><path d="M533.892 0.0175781C547.159 0.0176854 557.948 10.7014 557.948 23.8105C557.948 36.9198 547.159 47.6044 533.892 47.6045H497.709C484.442 47.6044 473.652 36.9198 473.652 23.8105C473.652 10.7014 484.442 0.0176239 497.709 0.0175781H533.892ZM530.638 18.9434C529.179 18.9434 527.984 19.3118 527.07 20.0674C526.157 20.823 525.699 22.0182 525.699 23.6523H525.682V24.0391C525.682 25.6733 526.157 26.8684 527.07 27.624C528.002 28.3621 529.179 28.749 530.638 28.749C532.096 28.749 533.291 28.3796 534.223 27.624C535.154 26.8684 535.628 25.6733 535.628 24.0391V23.6523C535.628 22.0182 535.154 20.823 534.223 20.0674C533.291 19.3118 532.096 18.9434 530.638 18.9434ZM510.903 28.5723H513.451V25.3564H514.91C514.925 25.3556 514.94 25.3534 514.955 25.3525L516.808 28.5723H519.654L517.338 24.8428C517.567 24.7415 517.778 24.6264 517.968 24.4951C518.723 23.9855 519.092 23.2124 519.092 22.2109C519.092 21.1568 518.723 20.3836 517.985 19.874C517.247 19.3645 516.228 19.1182 514.928 19.1182H510.903V28.5723ZM495.966 28.5547H498.515V25.6201H500.324C501.607 25.6728 502.609 25.409 503.294 24.8467C503.979 24.2844 504.331 23.4762 504.331 22.3691C504.331 21.2621 503.979 20.4364 503.294 19.9092C502.591 19.382 501.607 19.1182 500.324 19.1182H495.966V28.5547ZM530.638 20.8232C531.358 20.8233 531.938 20.9992 532.359 21.3506C532.781 21.702 532.992 22.3696 532.992 23.3535V24.3379C532.992 25.3044 532.781 25.9894 532.359 26.3408C531.938 26.6922 531.341 26.8682 530.638 26.8682C529.935 26.8682 529.372 26.6923 528.95 26.3408C528.546 25.9893 528.336 25.3216 528.336 24.3379V23.3535C528.336 22.3698 528.529 21.7021 528.95 21.3506C529.354 20.9991 529.917 20.8232 530.638 20.8232ZM500.043 20.9629C500.676 20.9629 501.133 21.0684 501.396 21.2793C501.66 21.4902 501.801 21.8596 501.801 22.3691C501.801 22.8787 501.66 23.2481 501.396 23.4766C501.133 23.705 500.676 23.8096 500.043 23.8096V23.8271H498.532V20.9629H500.043ZM514.857 20.9277C515.437 20.9278 515.876 21.0158 516.14 21.209C516.403 21.4023 516.544 21.7365 516.544 22.2285C516.544 22.6502 516.403 22.9845 516.14 23.2129C515.876 23.4411 515.437 23.5644 514.857 23.5645V23.5469H513.398V20.9277H514.857Z" fill="white"/></g><defs><clipPath id="clip0_rm"><rect width="557.953" height="47.6046" fill="white"/></clipPath></defs></svg>`

const PLAYER_PRO_LOGO = `<svg width="224" height="28" viewBox="0 0 224 28" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_pp)"><path d="M78.5 26.22H88.22L80.37 0.190002H71.56L54.71 26.22H64.09L66.69 21.9H77.4L78.49 26.22H78.5ZM70.16 16.13C70.16 16.13 74.08 9.47 74.2 9.24H74.27C74.3 9.47 75.95 16.13 75.95 16.13H70.16Z" fill="white"/><path d="M29.72 26.18L35.68 0.589996H44.84L40.25 20.24H53.49L52.1 26.18H29.72Z" fill="white"/><path d="M90.45 26.18L92.73 16.35L85.79 0.039989L95.51 0.019989L98.67 9.86999L106.38 0.019989H117.12L101.92 17.2L99.85 26.18H90.45Z" fill="white"/><path d="M170.67 8.94C171.15 6.04 170.69 3.83 169.27 2.3C167.88 0.77 165.66 0 162.63 0H146.55L140.56 26.35H148.77L150.69 18.31H156.85L159.99 26.35H169.57L165.26 16.99C165.87 16.67 166.45 16.29 166.98 15.85C168.94 14.22 170.17 11.92 170.67 8.94ZM162.33 8.6C162.17 9.31 161.81 9.85 161.26 10.23C160.71 10.6 160 10.79 159.12 10.79H152.18L153.23 6.52H160.19C161.06 6.52 161.68 6.69 162.03 7.03C162.4 7.36 162.5 7.88 162.32 8.6H162.33Z" fill="white"/><path d="M24.71 17.12C25.32 16.8 25.9 16.43 26.43 15.99C28.39 14.38 29.62 12.1 30.12 9.15999C30.6 6.29999 30.14 4.10999 28.72 2.59999C27.32 1.08999 25.1 0.329987 22.07 0.329987H5.99L0 26.37H8.21L10.13 18.43H16.29C16.29 16.43 22.34 18.8 24.71 17.12ZM21.78 8.82999C21.62 9.52999 21.26 10.07 20.71 10.44C20.16 10.81 19.45 10.99 18.57 10.99H11.63L12.68 6.76999H19.64C20.51 6.76999 21.13 6.93999 21.48 7.26999C21.85 7.58999 21.95 8.10999 21.77 8.82999H21.78Z" fill="white"/><path d="M113.76 26.35L119.74 0H143.08L141.67 6.14H127.5L126.64 9.87H140.31L138.95 15.81H125.31L124.29 20.24H138.44L137.05 26.36H113.75L113.76 26.35Z" fill="white"/><path d="M209.81 0.410156C217.36 0.410156 223.5 6.4902 223.5 13.9502C223.5 21.4101 217.36 27.4902 209.81 27.4902V27.5H189.22C181.67 27.4998 175.53 21.4199 175.53 13.96C175.53 6.50008 181.67 0.41032 189.22 0.410156H209.81ZM207.96 11.1797C207.13 11.1797 206.45 11.3903 205.93 11.8203C205.41 12.2503 205.15 12.9306 205.15 13.8604H205.14V14.0801C205.14 15.01 205.41 15.6901 205.93 16.1201C206.46 16.5401 207.13 16.7598 207.96 16.7598C208.79 16.7598 209.47 16.5501 210 16.1201C210.53 15.6901 210.8 15.01 210.8 14.0801V13.8604C210.8 12.9304 210.53 12.2503 210 11.8203C209.47 11.3903 208.79 11.1797 207.96 11.1797ZM196.73 16.6699H198.18V14.8398H199.01C199.02 14.8393 199.031 14.8375 199.041 14.8369L200.09 16.6602H201.71L200.396 14.5449C200.525 14.4878 200.643 14.4234 200.75 14.3496C201.18 14.0596 201.39 13.6197 201.39 13.0498C201.39 12.4499 201.18 12.0097 200.76 11.7197C200.34 11.4299 199.759 11.29 199.02 11.29H196.73V16.6699ZM188.23 16.6602H189.68V14.9902H190.71C191.44 15.0202 192.01 14.8698 192.4 14.5498C192.79 14.2298 192.99 13.7695 192.99 13.1396C192.99 12.51 192.79 12.0402 192.4 11.7402C192 11.4402 191.44 11.29 190.71 11.29H188.23V16.6602ZM207.96 12.2598C208.37 12.2598 208.7 12.3596 208.94 12.5596C209.18 12.7596 209.3 13.1402 209.3 13.7002V14.2598C209.3 14.8097 209.18 15.2004 208.94 15.4004C208.7 15.6004 208.36 15.7002 207.96 15.7002C207.56 15.7002 207.24 15.6003 207 15.4004C206.77 15.2004 206.65 14.8198 206.65 14.2598V13.7002C206.65 13.1402 206.76 12.7596 207 12.5596C207.23 12.3597 207.55 12.2598 207.96 12.2598ZM190.55 12.3398C190.91 12.3398 191.17 12.3995 191.32 12.5195C191.47 12.6395 191.55 12.8498 191.55 13.1396C191.55 13.4294 191.47 13.6395 191.32 13.7695C191.17 13.8995 190.91 13.96 190.55 13.96V13.9697H189.69V12.3398H190.55ZM198.98 12.3203C199.31 12.3204 199.56 12.3705 199.71 12.4805C199.86 12.5904 199.94 12.7799 199.94 13.0596C199.94 13.2996 199.86 13.4901 199.71 13.6201C199.56 13.75 199.31 13.8202 198.98 13.8203V13.8096H198.15V12.3203H198.98Z" fill="white"/></g><defs><clipPath id="clip0_pp"><rect width="223.5" height="27.5" fill="white"/></clipPath></defs></svg>`

const RINGER_LOGO = `<svg width="241" height="39" viewBox="0 0 2413 394" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M452.917 124.55C456.499 87.1206 441.169 57.251 407.375 35.8102C375.635 15.6865 330.383 5.46653 272.883 5.46653L90.399 5.20312L0 388.582H138.733L169.103 261.017H216.726L270.723 388.582H412.801V370.539L350.902 235.468C379.112 225.485 401.87 212.394 418.701 196.432C438.667 177.493 450.177 153.313 452.917 124.576V124.55ZM310.338 141.012C305.597 150.337 297.721 157.58 286.29 163.138C274.305 168.959 259.792 171.936 243.25 171.936L190.017 171.54L208.271 94.8382L277.202 95.049C306.414 96.1026 312.472 107.192 314.474 115.304C316.344 123.47 315 131.872 310.365 141.012H310.338Z" fill="white"/><path d="M539.284 5.22656L448.516 388.579H587.275L677.674 5.22656H539.284Z" fill="white"/><path d="M1020.2 5.22656L971.524 211.627L865.347 5.22656H736.703L646.304 388.579H785.037L834.029 182.047L940.575 388.579H1068.19L1158.96 5.22656H1020.2Z" fill="white"/><path d="M1369.52 173.173L1349.95 255.591H1429.47L1419.54 292.361C1401.52 300.184 1380.56 304.004 1357.01 303.714C1317.53 303.292 1297.82 287.409 1294.95 253.457C1293.29 238.259 1295.51 216.16 1301.51 187.791C1308.41 155.499 1321.24 130.476 1339.63 113.46C1357.77 96.6813 1380.4 88.8583 1408.58 89.6222C1426.92 90.0436 1440.96 93.9683 1450.28 101.264C1459.1 108.166 1464.06 119.334 1465.37 135.427L1466.22 145.832L1599.73 146.122L1598.68 133.768C1595.02 90.8601 1576.84 57.461 1544.68 34.5715C1513.44 12.3405 1468.69 0.72457 1411.72 0.039729C1346.74 -0.934852 1290.76 16.0281 1245.59 50.1385C1200.13 84.4595 1171.6 131.555 1160.78 190.188L1158.04 205.202C1152.06 240.682 1155.64 273.159 1168.7 301.712C1181.87 330.528 1204 353.233 1234.5 369.222C1264.32 384.868 1301.17 392.954 1343.92 393.296C1346.24 393.296 1348.55 393.323 1350.87 393.323C1391.94 393.323 1430.02 389.082 1464.21 380.706C1501.12 371.645 1529.83 358.449 1549.56 341.512L1552.45 339.01L1587.91 173.173H1369.49H1369.52Z" fill="white"/><path d="M1936.57 235.517L1957.12 148.385H1776.27L1789.07 95.0724H2003.06L2024.29 5.22656H1671.22L1580.82 388.579H1933.2L1954.43 298.997H1740.84L1755.99 235.517H1936.57Z" fill="white"/><path d="M2366.83 35.8102C2335.1 15.6865 2289.84 5.46653 2232.34 5.46653L2049.86 5.20312L1959.46 388.582H2098.19L2128.56 261.017H2176.19L2230.18 388.582H2372.26V370.539L2310.36 235.468C2338.57 225.485 2361.33 212.394 2378.16 196.432C2398.13 177.493 2409.64 153.313 2412.38 124.576C2415.96 87.147 2400.63 57.2774 2366.81 35.8366L2366.83 35.8102ZM2269.8 141.012C2265.06 150.337 2257.18 157.58 2245.75 163.138C2233.77 168.959 2219.25 171.936 2202.71 171.936L2149.48 171.54L2167.7 94.8382L2236.64 95.049C2265.85 96.1026 2271.91 107.192 2273.91 115.304C2275.78 123.47 2274.43 131.872 2269.8 141.012Z" fill="white"/></svg>`

interface ProductData {
    name: string
    description: string
    tags: string[]
    link: string
    logoType: "svg" | "image"
    logoSvg?: string
    logoImage?: string
    productImage: string
}

const products: ProductData[] = [
    {
        name: "RAINMAKER",
        description:
            "Designed the first portable launch monitor in the Blue Tees ecosystem. Led the end-to-end product design from hardware form factor to the companion Launch App, creating a seamless experience that bridges Doppler radar precision with intuitive on-screen feedback and full simulation integration.",
        tags: ["Launch Monitor", "Product Design", "UI/UX", "Companion App"],
        link: "https://blueteesgolf.com/products/rainmaker",
        logoType: "svg",
        logoSvg: RAINMAKER_LOGO,
        productImage: "https://iili.io/qF2oJYG.png",
    },
    {
        name: "PLAYER",
        description:
            "Redesigned the GPS speaker experience from the ground up. Crafted the touchscreen interface, on-device GPS flow, scoring UX, and music controls for a device that serves as the golfer's on-course command center with 360-degree audio, real-time yardages, and AI-powered club recommendations.",
        tags: ["GPS Speaker", "UI/UX", "Touchscreen", "IoT"],
        link: "https://blueteesgolf.com/products/player-pro",
        logoType: "svg",
        logoSvg: PLAYER_PRO_LOGO,
        productImage: "https://iili.io/qF2odvf.png",
    },
    {
        name: "GAME",
        description:
            "Designed the official companion app that ties the entire Blue Tees ecosystem together. Built the UX for GPS course mapping across 42K+ courses, real-time shot tracking, AI caddie recommendations, 3D round replays, live leaderboards, and USGA Handicap integration across iOS and Apple Watch.",
        tags: ["Mobile App", "UI/UX", "AI/ML", "GPS", "Analytics"],
        link: "https://apps.apple.com/us/app/blue-tees-game-ai-golf-gps/id6448720121",
        logoType: "image",
        logoImage: "https://iili.io/qF2o03g.png",
        productImage: "https://iili.io/qF2niYJ.png",
    },
    {
        name: "PLAYMAKER",
        description:
            "Designed a swing-friendly GPS golf watch with a vibrant AMOLED touchscreen. Defined the UX for on-wrist course views, FCB distances, shot tracking, dynamic hazard mapping, scorekeeping, weather, and activity tracking, all engineered to be ultra-lightweight and distraction-free during play.",
        tags: ["Wearable", "UI/UX", "GPS Watch", "Product Design"],
        link: "https://blueteesgolf.com/products/playmaker-watch",
        logoType: "image",
        logoImage: "https://iili.io/qF2nmBt.png",
        productImage: "https://iili.io/qF2nDQI.png",
    },
    {
        name: "RINGER",
        description:
            "Designed a compact, magnetic GPS handheld built for the modern golfer. Created the touchscreen interface for 42K+ preloaded courses, green view, shot tracking, hazard distances, advanced scoring, and seamless music control when paired with the Player+ speaker ecosystem.",
        tags: ["Handheld GPS", "UI/UX", "Product Design", "Touchscreen"],
        link: "https://blueteesgolf.com/products/ringer",
        logoType: "svg",
        logoSvg: RINGER_LOGO,
        productImage: "https://iili.io/qF2o2p4.png",
    },
]

function TagPill({ label }: { label: string }) {
    return (
        <span
            style={{
                display: "inline-flex",
                alignItems: "center",
                fontSize: 16,
                lineHeight: 1.4,
                color: "rgba(255,255,255,0.65)",
                fontFamily: "'Inter Display', 'Inter', sans-serif",
                fontWeight: 700,
                textTransform: "uppercase" as const,
                backgroundColor: "rgba(255,255,255,0.07)",
                padding: "6px 16px",
                borderRadius: 100,
                letterSpacing: "0.04em",
                border: "1px solid rgba(255,255,255,0.06)",
                whiteSpace: "nowrap" as const,
            }}
        >
            {label}
        </span>
    )
}

function ProductCard({
    product,
    index,
    isMobile,
    isTablet,
}: {
    product: ProductData
    index: number
    isMobile: boolean
    isTablet: boolean
}) {
    const [hovered, setHovered] = useState(false)

    const stickyTop = isMobile ? 0 : index * 20

    return (
        <a
            href={product.link}
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
                display: "block",
                position: isMobile
                    ? ("relative" as const)
                    : ("sticky" as const),
                top: isMobile ? undefined : stickyTop,
                zIndex: index + 1,
                width: "100%",
                textDecoration: "none",
                color: "inherit",
                marginBottom: isMobile ? 20 : 0,
            }}
        >
            <div
                style={{
                    width: isMobile ? "100%" : isTablet ? "85vw" : "75vw",
                    maxWidth: "100%",
                    height: isMobile ? "auto" : "75vh",
                    maxHeight: isMobile ? "none" : 600,
                    minHeight: isMobile ? 320 : isTablet ? 360 : 420,
                    margin: "0 auto",
                    backgroundColor: "rgb(26, 26, 26)",
                    borderRadius: 16,
                    overflow: "hidden",
                    position: "relative",
                    cursor: "pointer",
                    transition:
                        "transform 0.4s cubic-bezier(0.25,0.46,0.45,0.94), box-shadow 0.4s ease",
                    transform: hovered ? "scale(1.008)" : "scale(1)",
                    boxShadow: hovered
                        ? "0 20px 60px rgba(0,0,0,0.35), 0 8px 20px rgba(0,0,0,0.2)"
                        : "0 6px 30px rgba(0,0,0,0.12), 0 2px 6px rgba(0,0,0,0.08)",
                }}
            >
                {/* Terrain pattern */}
                <div
                    style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundImage: `url(${TERRAIN_URL})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        opacity: 1,
                        pointerEvents: "none",
                    }}
                />

                <div
                    style={{
                        display: "flex",
                        flexDirection: isMobile
                            ? ("column" as const)
                            : ("row" as const),
                        height: "100%",
                        position: "relative",
                        zIndex: 1,
                    }}
                >
                    <div
                        style={{
                            flex: 1,
                            display: "flex",
                            flexDirection: "column" as const,
                            justifyContent: "space-between",
                            gap: 20,
                            minWidth: 0,
                            padding: isMobile ? 20 : isTablet ? 32 : 40,
                        }}
                    >
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                padding: "10px 0",
                            }}
                        >
                            {product.logoType === "svg" && product.logoSvg ? (
                                <div
                                    dangerouslySetInnerHTML={{
                                        __html: product.logoSvg,
                                    }}
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        height: isMobile ? 28 : 36,
                                        maxWidth: isMobile ? 200 : 280,
                                        overflow: "visible",
                                    }}
                                />
                            ) : (
                                <img
                                    src={product.logoImage}
                                    alt={product.name}
                                    style={{
                                        height: isMobile ? 28 : 36,
                                        maxWidth: isMobile ? 200 : 280,
                                        objectFit: "contain",
                                        objectPosition: "left center",
                                    }}
                                />
                            )}
                        </div>

                        <p
                            style={{
                                fontSize: isMobile ? 16 : 19,
                                lineHeight: 1.6,
                                color: "rgba(255,255,255,0.7)",
                                fontFamily:
                                    "'Inter Display', 'Inter', sans-serif",
                                margin: 0,
                                maxWidth: 520,
                                fontWeight: 400,
                                letterSpacing: "-0.01em",
                            }}
                        >
                            {product.description}
                        </p>

                        <div
                            style={{
                                display: "flex",
                                flexWrap: "wrap" as const,
                                gap: 8,
                                marginTop: "auto",
                            }}
                        >
                            {product.tags.map((tag, i) => (
                                <TagPill key={i} label={tag} />
                            ))}
                        </div>
                    </div>

                    <div
                        style={{
                            width: isMobile ? "100%" : "55%",
                            minHeight: isMobile ? 220 : "auto",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexShrink: 0,
                            overflow: "hidden",
                        }}
                    >
                        <img
                            src={product.productImage}
                            alt={product.name}
                            style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "contain",
                                display: "block",
                                transition: "transform 0.5s ease",
                                transform: hovered ? "scale(1.04)" : "scale(1)",
                            }}
                        />
                    </div>
                </div>
            </div>
        </a>
    )
}

/**
 * @framerSupportedLayoutWidth any
 * @framerSupportedLayoutHeight auto
 */
export default function BTGProductCards() {
    const [windowWidth, setWindowWidth] = useState(1200)

    useEffect(() => {
        const update = () => setWindowWidth(window.innerWidth)
        update()
        window.addEventListener("resize", update)
        return () => window.removeEventListener("resize", update)
    }, [])

    const isMobile = windowWidth < 640
    const isTablet = windowWidth >= 640 && windowWidth < 1024

    return (
        <div
            style={{
                width: "100%",
                display: "flex",
                flexDirection: "column" as const,
                alignItems: "center",
                gap: isMobile ? 0 : 20,
                padding: isMobile ? "0 12px" : "0",
                boxSizing: "border-box" as const,
            }}
        >
            {products.map((product, i) => (
                <ProductCard
                    key={i}
                    product={product}
                    index={i}
                    isMobile={isMobile}
                    isTablet={isTablet}
                />
            ))}
        </div>
    )
}

addPropertyControls(BTGProductCards, {})
