/** @type {import("tailwindcss").Config} */
module.exports = {
  darkMode: true,
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px"
      }
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        accent: "#3edef7",
        placeholder: "hsl(var(--placeholder))",
        binance: "#F3BA2F",
        ethereum: "#637FEA",
        matic: "#8D35D5",
        avax: "#E84142",
        fantom: "#005EFF",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))"
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
          hover: "hsl(var(--secondary-hover))"
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))"
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))"
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))"
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))"
        }
      },
      fontSize: {
        xxs: "11px"
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)"
      },
      maxWidth: {
        "1/2": "50%",
        "1/3": "33.3%",
        "2/3": "66.6%",
        "1/4": "25%",
        "3/4": "75%",
        "1/5": "20%",
        "4/5": "80%"
      },
      maxHeight: {
        "1/2": "50%",
        "1/3": "33.3%",
        "2/3": "66.6%",
        "1/4": "25%",
        "3/4": "75%",
        "1/5": "20%",
        "4/5": "80%"
      },
      borderWidth: {
        DEFAULT: "1px",
        0: "0",
        2: "2px",
        3: "3px",
        4: "4px",
        6: "6px",
        8: "8px"
      },
      dropShadow: {
        up: "0px 0px 6px rgb(34 197 94 / 100%)",
        down: "0px 0px 6px rgb(239 68 68 / 100%)"
      },
      transitionTimingFunction: {
        curve: "cubic-bezier(0.62, 0.05, 0.01, 0.99)"
      },
      transitionDuration: {
        25: "25ms"
      }
    }
  },
  corePlugins: {
    preflight: true,
    divideStyle: true
  }
};
