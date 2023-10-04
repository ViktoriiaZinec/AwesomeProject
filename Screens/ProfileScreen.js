import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { FIREBASE_AUTH, FIREBASE_DB } from "../Firebase";

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Image,
} from "react-native";

const ProfileScreen = () => {
  const navigation = useNavigation();

  const { user } = useSelector((state) => state.auth);

  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.imgBackground}
        source={require("../assets/img/registration_bckg.jpg")}
      >
        <View style={styles.formContainer}>
          <View style={styles.avatarContainer}>
            <TouchableOpacity>
              <View style={styles.iconContainer}>
                <Ionicons name="ios-close" size={13} color="#bdbdbd" />
              </View>
            </TouchableOpacity>
          </View>

          <TouchableOpacity onPress={() => FIREBASE_AUTH.signOut()}>
            <View style={styles.logoutContainer}>
              <Ionicons name="ios-exit-outline" size={24} color="#bdbdbd" />
            </View>
          </TouchableOpacity>
          <Text style={styles.header}>{user.displayName}</Text>
        </View>
      </ImageBackground>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: { flex: 1 },

  formContainer: {
    position: "relative",
    justifyContent: "center",
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 92,
    paddingBottom: 8,
    backgroundColor: "#ffffff",
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    marginBottom: 0,
  },
  imgBackground: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
  },
  avatarContainer: {
    position: "absolute",
    width: 120,
    height: 120,
    backgroundColor: "#f6f6f6",
    borderRadius: 16,
    top: -60,
    left: "50%",
    marginLeft: -48,
  },
  iconContainer: {
    position: "absolute",
    top: 80,
    right: -12,
    overflow: "hidden",
    backgroundColor: "#ffffff",
    borderRadius: 100,
    borderColor: "#bdbdbd",
    borderWidth: 1,
    width: 25,
    height: 25,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  logoutContainer: {
    position: "absolute",
    width: 25,
    height: 25,
    top: -72,
    right: 16,
  },
  header: {
    fontFamily: "Roboto500",
    fontSize: 30,
    color: "#212121",
    textAlign: "center",
    marginBottom: 33,
  },
});
