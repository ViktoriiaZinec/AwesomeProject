import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { useReducer, useState } from "react";
import { FIREBASE_AUTH } from "../Firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

import { useDispatch } from "react-redux";
import {
  setName,
  setEmail,
  setPassword,
  setLoggedIn,
} from "../redux/auth/authSlice";

const RegistrationScreen = () => {
  const [avatar, setAvatar] = useState(null);
  const [login, setLogin] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  const [isNameInputActive, setIsNameInputActive] = useState(false);
  const [isEmailInputActive, setIsEmailInputActive] = useState(false);
  const [isPasswordInputActive, setIsPasswordInputActive] = useState(false);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigation = useNavigation();
  const auth = FIREBASE_AUTH;

  const signUp = async () => {
    setLoading(true);

    const photo = avatar ? await uploadImageToServer(avatar, "avatars") : null;

    dispatch(authSignUpUser({ photo, login, email, password })).then((data) => {
      if (data === undefined || !data.uid) {
        alert(`Реєстрацію не виконано!`);
        return;
      }
      dispatch(authStateChange({ stateChange: true }));
      console.log(data);
    });

    console.log({ login, email, password, photo });
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <ImageBackground
          style={styles.imgBackground}
          source={require("../assets/img/registration_bckg.jpg")}
        >
          <KeyboardAvoidingView
            keyboardVerticalOffset={-22}
            behavior={Platform.OS == "ios" ? "padding" : "position"}
          >
            <View style={styles.formContainer}>
              <View style={styles.avatarContainer}>
                <TouchableOpacity>
                  <View style={styles.iconContainer}>
                    <Ionicons name="ios-add" size={13} color="#FF6C00" />
                  </View>
                </TouchableOpacity>
              </View>
              <Text style={styles.header}>Реєстрація</Text>
              <TextInput
                style={
                  isNameInputActive ? styles.activeTextInput : styles.textInput
                }
                placeholder="Логін"
                placeholderTextColor="#bdbdbd"
                value={login}
                onChangeText={setLogin}
                onFocus={() => setIsNameInputActive(true)}
                onBlur={() => setIsNameInputActive(false)}
                editable={true}
              ></TextInput>
              <TextInput
                style={
                  isEmailInputActive ? styles.activeTextInput : styles.textInput
                }
                placeholder="Адреса електронної пошти"
                value={email}
                onChangeText={setEmail}
                onFocus={() => setIsEmailInputActive(true)}
                onBlur={() => setIsEmailInputActive(false)}
                editable={true}
              ></TextInput>

              <TextInput
                style={
                  isPasswordInputActive
                    ? styles.activeTextInput
                    : styles.textInput
                }
                placeholder="Пароль"
                value={password}
                onChangeText={setPassword}
                onFocus={() => setIsPasswordInputActive(true)}
                onBlur={() => setIsPasswordInputActive(false)}
                editable={true}
                secureTextEntry={true}
              ></TextInput>

              <TouchableOpacity style={styles.button} onPress={signUp}>
                <Text style={styles.btnText}>Зареєструватися</Text>
              </TouchableOpacity>

              <View style={styles.linkContainer}>
                <Text style={styles.link}>Вже є акаунт?</Text>
                <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                  <Text style={styles.link}> Увійти</Text>
                </TouchableOpacity>
              </View>
            </View>
          </KeyboardAvoidingView>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default RegistrationScreen;

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
    borderColor: "#FF6C00",
    borderWidth: 1,
    width: 25,
    height: 25,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    fontFamily: "Roboto500",
    fontSize: 30,
    color: "#212121",
    textAlign: "center",
    marginBottom: 33,
  },
  textInput: {
    fontFamily: "Roboto400",
    alignSelf: "stretch",
    height: 50,
    marginBottom: 16,
    color: "#212121",
    backgroundColor: "#F6F6F6",
    borderRadius: 8,
    paddingLeft: 16,
    borderWidth: 1,
    borderColor: "#E8E8E8",
  },
  activeTextInput: {
    fontFamily: "Roboto400",
    alignSelf: "stretch",
    height: 50,
    marginBottom: 16,
    color: "#212121",
    backgroundColor: "#ffffff",
    borderRadius: 8,
    paddingLeft: 16,
    borderWidth: 1,
    borderColor: "#FF6C00",
  },

  button: {
    fontFamily: "Roboto400",
    alignSelf: "stretch",
    alignItems: "center",
    padding: 16,
    marginTop: 27,
    backgroundColor: "#FF6C00",
    borderRadius: 100,
    marginBottom: 16,
  },
  btnText: {
    fontSize: 16,
    color: "#ffffff",
  },
  linkContainer: {
    fontFamily: "Roboto400",
    display: "flex",
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "center",
  },
  link: {
    color: "#1B4371",
  },
});
