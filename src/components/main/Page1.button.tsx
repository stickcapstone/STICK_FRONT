import { useEffect, useState } from "react";
import styles from "./Page1.module.css";

export default function Page1Button() {
    const [dark, setDark] = useState(false);
    useEffect(() => {
        document.documentElement.setAttribute(
            "data-theme",
            dark ? "dark" : "light"
        );
    }, [dark]);

    const toggle = () => { setDark(prev => !prev) };

    return (
        <div>    
          <button className={`${styles.themeToggle}`} onClick={toggle}>
            {dark ? "☀️" : "🌙"}
          </button>
        </div>
    )
}