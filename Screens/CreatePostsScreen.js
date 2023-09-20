import { Text, View, TouchableOpacity } from "react-native";
import { StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const CreatePostsScreen = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View>
          <Text style={styles.text}>Створити публікацію</Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate("Posts")}>
          <View style={styles.iconContainer}>
            <Ionicons name="ios-arrow-back-outline" size={24} color="#BDBDBD" />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CreatePostsScreen;

const styles = StyleSheet.create({
  container: {
    paddingTop: 55,
  },
  headerContainer: {
    borderBottomWidth: 1,
    borderBottomColor: "#BDBDBD",
    paddingHorizontal: 10,
  },

  text: {
    fontFamily: "Roboto500",
    fontSize: 17,
    color: "#212121",
    textAlign: "center",
    paddingBottom: 11,
  },
  iconContainer: {
    position: "absolute",
    left: 10,
    top: -36,
  },
});
