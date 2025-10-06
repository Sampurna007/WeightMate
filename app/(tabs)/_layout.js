import { Tabs } from "expo-router";
import { Image } from "react-native";

function TabIcon({ source, color, size }) {
  return (
    <Image
      source={source}
      style={{ width: size, height: size, tintColor: color }}
      resizeMode="contain"
    />
  );
}

export default function TabLayout() {
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
