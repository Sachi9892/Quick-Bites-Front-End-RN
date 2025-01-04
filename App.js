import { NavigationContainer } from "@react-navigation/native";
import TabNavigator from "./navigators/Tabs";

export default function app() {
  return (
    <NavigationContainer>
      <TabNavigator />
    </NavigationContainer>
  );
}
