import { NavigationContainer } from "@react-navigation/native";

import RootNavigator from "./src/navigation/RootNavigator";

import { ThemeProvider } from "./src/contexts/ThemeContext";
import { UserProvider } from "./src/contexts/UserContext";

export default function App() {
  return (
    <UserProvider>
      <ThemeProvider>
        <NavigationContainer>
          <RootNavigator/>
        </NavigationContainer>
      </ThemeProvider>
    </UserProvider>
  );
}