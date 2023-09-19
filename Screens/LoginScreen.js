import { useNavigation } from "@react-navigation/native";
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

const LoginScreen = () => {
  const navigation = useNavigation();

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <ImageBackground
          resizeMode="cover"
          style={styles.imgBackground}
          source={require("../assets/img/registration_bckg.jpg")}
        >
          <View style={styles.formContainer}>
            <Text style={styles.header}>Увійти</Text>
            <KeyboardAvoidingView
              behavior={Platform.OS == "ios" ? "padding" : "height"}
            >
              <TextInput
                style={styles.textInput}
                placeholder="Адреса електронної пошти"
                underlineColorAndroid={"transparent"}
              ></TextInput>
              <TextInput
                style={styles.textInput}
                placeholder="Пароль"
                underlineColorAndroid={"transparent"}
                secureTextEntry={true}
              ></TextInput>
            </KeyboardAvoidingView>
            <TouchableOpacity style={styles.button}>
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
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: { alignSelf: "stretch" },
  formContainer: {
    justifyContent: "center",
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 32,
    paddingBottom: 16,
    backgroundColor: "#ffffff",
    marginTop: "auto",
    marginBottom: 0,
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
  },
  imgBackground: {
    resizeMode: "cover",
    width: "100%",
    height: "100%",
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
    alignSelf: "stretch",
    alignItems: "center",
    padding: 16,
    marginTop: 27,
    backgroundColor: "#FF6C00",
    borderRadius: 100,
    marginBottom: 16,
  },
  btnText: {
    fontFamily: "Roboto400",
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
