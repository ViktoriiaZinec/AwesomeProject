import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
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
  Alert,
  ScrollView,
  SafeAreaView,
  TouchableHighlight,
  Image,
} from "react-native";
import React, { useReducer } from "react";

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
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const navigation = useNavigation();

  const onLogin = () => {
    Alert.alert(
      "Credentials",
      `${state.name} +${state.email}+ ${state.password}`
    );
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
                <Image
                  style={styles.avatar}
                  source={require("../assets/svg/avatar.svg")}
                />
                <TouchableOpacity>
                  <Image
                    style={styles.addIcon}
                    source={require("../assets/img/add.png")}
                  />
                </TouchableOpacity>
              </View>
              <Text style={styles.header}>Реєстрація</Text>
              <TextInput
                style={styles.textInput}
                placeholder="Логін"
                value={state.name}
                onChangeText={(text) =>
                  dispatch({ type: actionTypes.SET_NAME, payload: text })
                }
              ></TextInput>
              <TextInput
                style={styles.textInput}
                placeholder="Адреса електронної пошти"
                value={state.email}
                onChangeText={(text) =>
                  dispatch({ type: actionTypes.SET_EMAIL, payload: text })
                }
              ></TextInput>

              <TextInput
                style={styles.textInput}
                placeholder="Пароль"
                value={state.password}
                onChangeText={(text) =>
                  dispatch({ type: actionTypes.SET_PASSWORD, payload: text })
                }
                secureTextEntry={true}
              ></TextInput>
              <TouchableOpacity style={styles.button} onPress={onLogin}>
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
  addIcon: {
    position: "absolute",
    borderRadius: 100,
    width: 24,
    height: 24,
    top: 45,
    right: -11,
  },
  header: {
    fontFamily: "Roboto500",
    fontSize: 30,
    color: "#212121",
    textAlign: "center",
    fontWeight: "500",
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
