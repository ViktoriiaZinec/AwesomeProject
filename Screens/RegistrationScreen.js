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
import { createUserWithEmailAndPassword } from "firebase/auth";

import { useDispatch } from "react-redux";
import { setUser } from "../redux/auth/authSlice";

const initialState = {
  name: "",
  email: "",
  password: "",
};

const actionTypes = {
  SET_NAME: "SET_NAME",
  SET_EMAIL: "SET_EMAIL",
  SET_PASSWORD: "SET_PASSWORD",
};

const reducer = (state, action) => {
  console.log(`action.type: ${action.type} state: ${state}`);
  switch (action.type) {
    case actionTypes.SET_NAME:
      return { ...state, name: action.payload };
    case actionTypes.SET_EMAIL:
      return { ...state, email: action.payload };
    case actionTypes.SET_PASSWORD:
      return { ...state, password: action.payload };
    default:
      return state;
  }
};

const RegistrationScreen = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const [isNameInputActive, setIsNameInputActive] = useState(false);
  const [isEmailInputActive, setIsEmailInputActive] = useState(false);
  const [isPasswordInputActive, setIsPasswordInputActive] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();
  const auth = FIREBASE_AUTH;

  const signUp = async () => {
    setLoading(true);
    try {
      // console.log(`Email: <${email}>,${state.email}`);
      // console.log(`state: <${state}>`);

      const response = await createUserWithEmailAndPassword(
        auth,
        state.email,
        state.password
      );
      const { displayName, email } = response.user;
      dispatch(setUser({ displayName, email }));
      navigation.navigate("Inside");
      console.log(response);
    } catch (error) {
      console.log(error);
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
                value={state.name}
                onChangeText={(text) =>
                  dispatch({ type: actionTypes.SET_NAME, payload: text })
                }
                onFocus={() => setIsNameInputActive(true)}
                onBlur={() => setIsNameInputActive(false)}
              ></TextInput>
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
              {/* <TouchableOpacity style={styles.button} onPress={onLogin}> */}
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
