import React, { useState } from 'react';

/**
 *
 * Build a simple app that allows the user to toggle light and dark mode as a react hook.
 *
 * Components will need a useMode() hook either 'light' or 'dark' so that they can change
 * their internal CSS.
 *
 * There should also be a way to useModeToggler() which returns a function that can be used
 * to toggle light or dark mode.
 *
 * The idea is that you have a way to globally mark the theme for the entire
 * app, then a hook that can be used to change the theme.
 *
 */

export type Theme = 'light' | 'dark';

export type UseThemeToggler = (theme: Theme) => void;

export type UseTheme = () => Theme;

const theme = {
    themes: [
        { name: "light"}, { name: "dark"}
    ],
    _current: 0
};
const ThemeState= React.createContext<any | undefined>(undefined);
const ThemeDispatch = React.createContext<any | undefined>(undefined);

const ThemeReducer = (state: any, action:any ) => {
    switch (action.type) {
      case "toggle":
      default: {
        return {
          ...state,
          _current:
            state._current === state.themes.length - 1 ? 0 : (state._current += 1)
        };
      }
    }
  };

  const ThemeProvider: React.FC = ({ children}) => {
    const [state, dispatch] = React.useReducer(ThemeReducer, theme);
    return (
      <ThemeState.Provider value={state}>
        <ThemeDispatch.Provider value={dispatch}>
          {children}
        </ThemeDispatch.Provider>
      </ThemeState.Provider>
    );
  };

  const useTheme: UseTheme = () => {
    const context = React.useContext(ThemeState);
    if (context === undefined) {
      throw new Error("useTheme must be used inside a ThemeProvider");
    }
    return context.themes[context._current];
  };

  const useThemeToggle: UseThemeToggler = () => {
    const context = React.useContext(ThemeDispatch);
    if (context === undefined) {
      throw new Error("useThemeToggle must be used inside a ThemeProvider");
    }
    return context;
  };

  export const App = () => {

    return (
        <ThemeProvider>
            <Main/>   
        </ThemeProvider>
    );

}

export const Main = () => {
    const theme = useTheme();
    const styles = (theme: Theme) => {
        if(theme === "light") {
            return "light-theme"
        } else {
            return "dark-theme"
        }
    }
    return (
        <div className={styles(theme)}>
            <Settings />
        </div>
    );

}

export const Settings: React.FC = () => {
    const theme = useTheme();
    const themeToggle = useThemeToggle(theme);
    const toggleMode = React.useCallback(() => {
        themeToggle;
    }, []);

    return (
        <button onClick={toggleMode}>toggle light/dark mode</button>
    );

}
