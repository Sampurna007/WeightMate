import { Tabs } from "expo-router";
import { Image, ImageSourcePropType } from "react-native";
import React from "react";
import { JSX } from "react/jsx-runtime";


interface TabIconProps {
  source: ImageSourcePropType;
  color: string;
  size: number;
}

function TabIcon({ source, color, size }: TabIconProps): JSX.Element {
  return (
    <Image
      source={source}
      style={{ width: size, height: size, tintColor: color }}
      resizeMode="contain"
    />
  );
}

export default function TabLayout(): JSX.Element {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen
        name="Home"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <TabIcon source={require("../../assets/home.png")} color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="bmi"
        options={{
          title: "BMI",
          tabBarIcon: ({ color, size }) => (
            <TabIcon source={require("../../assets/bmi.png")} color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="Weightlogs"
        options={{
          title: "Logs",
          tabBarIcon: ({ color, size }) => (
            <TabIcon source={require("../../assets/log.png")} color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, size }) => (
            <TabIcon source={require("../../assets/user.png")} color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
}
