import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import { loadWeather } from "../storage/weatherServiceStorage";

import AppNavigator from "./AppNavigator";
import UserScreen from "../screens/User/UserScreen";

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  const [initialRoute, setInitialRoute] = useState<string | null>(null);

  useEffect(() => {
    async function check() {
      const cached = await loadWeather("last-weather");

      setInitialRoute(cached ? "Tabs" : "UserScreen");
    }

    check();
  }, []);

  if (!initialRoute) return null;

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName={initialRoute}>

      <Stack.Screen name="UserScreen" component={UserScreen} />

      <Stack.Screen name="Tabs" component={AppNavigator} />

    </Stack.Navigator>
  );
}