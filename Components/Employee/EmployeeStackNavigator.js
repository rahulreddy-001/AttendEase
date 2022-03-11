import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { Image, Text, View } from "react-native";
import Employee from "./Screens/Employee";
import Map from "./Screens/Map";
import Scan from "./Screens/Scan";
import Status from "./Screens/Status";
import Avatar from "../Assets/icon.png";
function LogoTitle() {
  return (
    <View
      style={{
        minHeight: 60,
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      <Image style={{ width: 40, height: 40 }} source={Avatar} />
      <Text style={{ fontSize: 22, fontWeight: "800", paddingLeft: 20 }}>
        AttendEase
      </Text>
    </View>
  );
}

const EmployeeStackNavigator = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      initialRouteName="Employee"
      screenOptions={{ headerShown: true }}
    >
      <Stack.Group>
        <Stack.Screen
          name="Employee"
          component={Employee}
          options={{ headerTitle: (props) => <LogoTitle {...props} /> }}
        />
        <Stack.Screen name="Map" component={Map} />
        <Stack.Screen name="Scan" component={Scan} />
        <Stack.Screen name="Status" component={Status} />
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default EmployeeStackNavigator;
