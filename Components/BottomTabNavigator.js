import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StatusBar } from "expo-status-bar";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import EmployeeStackNavigator from "./Employee/EmployeeStackNavigator";
import AdminStackNavigator from "./Admin/AdminStackNavigator";
const Tab = createBottomTabNavigator();

export default function BottomTabNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: "black",
          headerShown: false,
          tabBarStyle: {
            height: 70,
            paddingBottom: 10,
            paddingTop: 10,
          },
        }}
      >
        <Tab.Screen
          name="EmployeeStackNavigator"
          options={{
            title: "Employee",
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="person" color={color} size={30} />
            ),
          }}
          component={EmployeeStackNavigator}
        />
        <Tab.Screen
          name="AdminStackNavigator"
          options={{
            title: "Admin",
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons
                name="admin-panel-settings"
                color={color}
                size={30}
              />
            ),
          }}
          component={AdminStackNavigator}
        />
      </Tab.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}
