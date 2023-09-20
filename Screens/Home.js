import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AntDesign } from "@expo/vector-icons";

import PostsScreen from "./PostsScreen";
import CreatePostsScreen from "./CreatePostsScreen";
import CommentsScreen from "./CommentsScreen";
import ProfileScreen from "./ProfileScreen";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const Tabs = createBottomTabNavigator();

const Home = () => {
  return (
    <Tabs.Navigator
      screenOptions={({ route }) => ({
        // tabBarButton: (props) => {
        //   const customStyles = {
        //     backgroundColor: "transparent",
        //     borderRadius: 100,
        //     paddingVertical: 8,
        //     width: 70,
        //     marginRight: 10,
        //   };

        //   return <TouchableOpacity {...props} style={customStyles} />;
        // },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Posts") {
            iconName = focused ? "ios-grid" : "ios-grid-outline";
            color = "rgba(33, 33, 33, 0.80)";
          } else if (route.name === "Create") {
            iconName = focused ? "ios-add-outline" : "ios-add";
            color = "white";
          } else if (route.name === "Profile") {
            iconName = focused ? "ios-person-sharp" : "ios-person-outline";
            color = "rgba(33, 33, 33, 0.80)";
          }
          return <Ionicons name={iconName} size={24} color={color} />;
        },
        tabBarLabel: () => null,
        tabBarStyle: {
          height: 83,
          backgroundColor: "#ffffff",
          paddingTop: 9,
          paddingBottom: 34,
        },
      })}
    >
      <Tabs.Screen
        name="Posts"
        component={PostsScreen}
        options={{ headerShown: false }}
      />
      <Tabs.Screen
        name="Create"
        component={CreatePostsScreen}
        options={{
          headerShown: false,
          tabBarButton: (props) => {
            const customStyles = {
              backgroundColor: props.accessibilityState.selected
                ? "#FF6C00"
                : "#FF6C00",
              borderRadius: 100,
              paddingVertical: 8,
              width: 70,
              color: "#ffffff",
            };

            return <TouchableOpacity {...props} style={customStyles} />;
          },
        }}
      />

      <Tabs.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ headerShown: false }}
      />
    </Tabs.Navigator>
  );
};

export default Home;

const styles = StyleSheet.create({
  text: {},
});
