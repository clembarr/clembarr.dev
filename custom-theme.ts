export const customTheme = {
    fontFamily: {
        montserrat: ["Montserrat", "sans-serif"],
        hind_vadodara: ["Hind Vadodara", "sans-serif"],
        kanit: ["Kanit", "sans-serif"],
    },
    fontSize: {
        "3xs": "60%",
        "2xs": "80%",
        xs: "90%",
        sm: "95%",
        base: "100%",
        md: "105%",
        lg: "110%",
        xl: "120%",
        "2xl": "135%",
        "3xl": "150%",
        "4xl": "180%",
        "5xl": "200%",
        "6xl": "225%",
        "7xl": "250%",
        "8xl": "300%",
        "9xl": "320%",
    },
    screens: {
        "base": [{min: "0px", max: "399px"},],
        "xs": [{min: "400px", max: "499px"},],
        "ss": [{min: "500px", max: "639px"},],
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": [{min: "1536px", max: "9999px"},],
        
        "hbase": [,{min: "0px", max: "699px"}],
        "hxs": [,{min: "720px", max: "849px"}],
        "hsm": [,{min: "850px", max: "1079px"}],
        "hmd": [,{min: "1080px", max: "1279px"}],
        "hlg": [,{min: "1280px", max: "1439px"}],
        "hxl": [,{min: "1440px", max: "2159px"}],
        "h2xl": [,{min: "2160px", max: "9999px"}],
    }
} as const;

export type TailwindTheme = typeof customTheme;