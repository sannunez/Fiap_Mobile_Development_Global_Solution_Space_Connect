import { createContext, useContext, useState, useEffect, ReactNode } from "react";

import { darkTheme } from "../theme/dark";
import { lightTheme } from "../theme/light";

import { saveTheme, loadTheme } from "../storage/themeStorage";

type ThemeContextType = {
    theme: typeof lightTheme;
    darkMode: boolean;
    toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType>(
    {} as ThemeContextType
);

type ThemeProviderProps = {
    children: ReactNode;
};

export function ThemeProvider({ children } : ThemeProviderProps ) {
    
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        async function getSavedTheme() {
            const savedTheme = await loadTheme();

            setDarkMode(savedTheme);
        }

        getSavedTheme();
    }, []);

    async function toggleTheme(){
        const newValue = !darkMode
        
        setDarkMode(newValue);
        
        await saveTheme(newValue);
    }

    return (
        <ThemeContext.Provider
            value={{
                darkMode,
                toggleTheme,
                theme: darkMode ? darkTheme : lightTheme,
            }}
        >
            {children}
        </ThemeContext.Provider>
    );

}

export function useThemeContext(){
    return useContext(ThemeContext);
}