import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
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
import React, { useReducer } from "react";
import { FIREBASE_AUTH } from "../Firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

import { useDispatch } from "react-redux";
import { setUser } from "../redux/auth/authSlice";

const initialState = {
  email: "",
  password: "",
};

const actionTypes = {
  SET_EMAIL: "SET_EMAIL",
  SET_PASSWORD: "SET_PASSWORD",
};

const reducer = (state, action) => {
  switch (action.type) {
    case actionTypes.SET_EMAIL:
      return { ...state, email: action.payload };
    case actionTypes.SET_PASSWORD:
      return { ...state, password: action.payload };
    default:
      return state;
  }
};

const LoginScreen = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const [isEmailInputActive, setIsEmailInputActive] = useState(false);
  const [isPasswordInputActive, setIsPasswordInputActive] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();
  const auth = FIREBASE_AUTH;

  const { email, password } = state;

  // const onLogin = () => {
  //   console.log("Credentials", `${state.email}+ ${state.password}`);
  // };
  const signIn = async () => {
    setLoading(true);
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      const { displayName, email } = response.user;
      dispatch(setUser({ displayName, email }));
      navigation.navigate("Inside");
      console.log(response);
    } catch (error) {
      console.log(error);
      alert("Check your email and password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <ImageBackground
          style={styles.imgBackground}
          source={require("../assets/img/registration_bckg.jpg")}
        >
          <KeyboardAvoidingView
            keyboardVerticalOffset={-100}
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
              <Text style={styles.header}>Увійти</Text>

              <TextInput
                style={
                  isEmailInputActive ? styles.activeTextInput : styles.textInput
                }
                placeholder="Адреса електронної пошти"
                value={state.email}
                onChangeText={(text) =>
                  dispatch({ type: actionTypes.SET_EMAIL, payload: text })
                }
                onFocus={() => setIsEmailInputActive(true)}
                onBlur={() => setIsEmailInputActive(false)}
              ></TextInput>

              <TextInput
                style={
                  isPasswordInputActive
                    ? styles.activeTextInput
                    : styles.textInput
                }
                placeholder="Пароль"
                value={state.password}
                onChangeText={(text) =>
                  dispatch({ type: actionTypes.SET_PASSWORD, payload: text })
                }
                onFocus={() => setIsPasswordInputActive(true)}
                onBlur={() => setIsPasswordInputActive(false)}
                secureTextEntry={true}
              ></TextInput>
              {/* <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  onLogin();
                  navigation.navigate("Home");
                }}
              > */}
              <TouchableOpacity style={styles.button} onPress={signIn}>
                <Text style={styles.btnText}>Увійти</Text>
              </TouchableOpacity>

              <View style={styles.linkContainer}>
                <Text style={styles.link}>Немає акаунту?</Text>
                <TouchableOpacity
                  onPress={() => navigation.navigate("Registration")}
                >
                  <Text style={styles.link}> Зареєструватися</Text>
                </TouchableOpacity>
              </View>
            </View>
          </KeyboardAvoidingView>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default LoginScreen;

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
