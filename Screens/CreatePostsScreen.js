import { useState, useEffect, useRef } from "react";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";

import { Camera, CameraType } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import * as Location from "expo-location";
import * as ImagePicker from "expo-image-picker";

import Button from "../components/button";


export default function App() {
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [image, setImage] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [flash, setFlash] = useState(Camera.Constants.FlashMode.off);
  const [photoName, setPhotoName] = useState("");
  const [photoLocation, setPhotoLocation] = useState("");

  const [address, setAddress] = useState("");
  const [location, setLocation] = useState();

  const navigation = useNavigation();

  const cameraRef = useRef(null);

  useEffect(() => {
    (async () => {
      MediaLibrary.requestPermissionsAsync();
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraStatus.status === "granted");
    })();
  }, []);

  const takePicture = async () => {   
    if (cameraRef) {
      try {      
        const data = await cameraRef.current.takePictureAsync();   
        setImage(data.uri);
        reverseGeocode();
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    const getPermissions = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Please grant location permissions");
        return;
      }

      let currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation);
      // console.log("Location:");
      // console.log(currentLocation);
    };

    getPermissions();
  }, []);

  const reverseGeocode = async () => {
    const reverseGeocodedAddress = await Location.reverseGeocodeAsync({
      longitude: location.coords.longitude,
      latitude: location.coords.latitude,
    });
    // console.log("reverseGeocodedAddress[0];", reverseGeocodedAddress[0]);
    const addressInfo = reverseGeocodedAddress[0];
    const city = addressInfo.city;
    const street = addressInfo.street;
    const streetNumber = addressInfo.streetNumber;

    // console.log(`${city}, ${street}, ${streetNumber}`);

    // console.log("Reverse Geocoded:");
    // console.log(reverseGeocodedAddress);
    setAddress(`${city}, ${street}, ${streetNumber}`);
  };

  const pickImageFromGallery = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status === "granted") {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
      });
      if (!result.canceled) {
        const selectedAssets = result.assets;

        selectedAssets.forEach((asset) => {
          setImage(asset.uri);
          reverseGeocode();
        });
      }
    }
  };

  const savePicture = async () => {
    if (image) {
      try {
        let albumName;
        if (photoLocation) {
          albumName = photoLocation;
        } else if (address) {
          albumName = address;
        } else {
          albumName = "Десь у світі";
        }
        const asset = await MediaLibrary.createAssetAsync(image, {
          albumName,
        });
        setImage(null);
        setPhotoLocation("");
        setAddress("");

        navigation.navigate("Posts", {
          photo: {
            uri: asset.uri,
            photoName,
            location: albumName,
          },
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  if (hasCameraPermission === null) {
    return <View />;
  }
  if (hasCameraPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const handleInputChange = (text) => {
    setPhotoName(text);
  };

  const handleLocationChange = (text) => {
    setPhotoLocation(text);
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : null}
    >
      <View style={styles.container}>
        <ScrollView style={{ flex: 1 }}>
          <View style={styles.headerContainer}>
            <View>
              <Text style={styles.text}>Створити публікацію</Text>
            </View>

            <TouchableOpacity onPress={() => navigation.navigate("Posts")}>
              <View style={styles.iconContainer}>
                <Ionicons
                  name="ios-arrow-back-outline"
                  size={24}
                  color="#BDBDBD"
                />
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.cameraContainer}>
            {!image ? (
              <Camera
                style={styles.camera}
                type={type}
                ref={cameraRef}
                flashMode={flash}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    paddingHorizontal: 20,
                    paddingTop: 10,
                  }}
                >
                  <Button
                    title=""
                    icon="ios-camera-reverse-outline"
                    onPress={() => {
                      setType(
                        type === CameraType.back
                          ? CameraType.front
                          : CameraType.back
                      );
                    }}
                  />
                  <Button
                    onPress={() =>
                      setFlash(
                        flash === Camera.Constants.FlashMode.off
                          ? Camera.Constants.FlashMode.on
                          : Camera.Constants.FlashMode.off
                      )
                    }
                    icon="ios-flash"
                    color={
                      flash === Camera.Constants.FlashMode.off
                        ? "#bdbdbd"
                        : "#ffffff"
                    }
                  />
                </View>
                <TouchableOpacity onPress={() => takePicture()}>
                  <Ionicons
                    name="ios-camera"
                    size={32}
                    color="#cdcdcd"
                    style={styles.cameraButton}
                  />
                </TouchableOpacity>
              </Camera>
            ) : (
              <Image source={{ uri: image }} style={styles.camera} />
            )}

            <View style={styles.camera} type={type} flashMode={flash}>
              {image ? (
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "start",
                    marginTop: 10,
                  }}
                >
                  <TouchableOpacity
                    onPress={() => {                     
                      setImage(null);
                    }}
                  >
                    <Text style={styles.galleryButtonText}>
                      Редагувати фото
                    </Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <View style={styles.imgGet}>
                  <TouchableOpacity onPress={pickImageFromGallery}>
                    <Text style={styles.galleryButtonText}>
                      Завантажте фото
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Назва..."
              value={photoName}
              onChangeText={handleInputChange}
            />
            <View>
              <TextInput
                style={{ ...styles.input, paddingLeft: 28 }}
                placeholder="Місцевість"
                value={photoLocation || address}
                onChangeText={handleLocationChange}
              />
              <TouchableOpacity>
                <Ionicons
                  style={styles.locationIcon}
                  name="ios-location-outline"
                  size={24}
                  color="#BDBDBD"
                />
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={{
                ...styles.button,
                backgroundColor: !image || !photoName ? "#f6f6f6" : "#FF6C00",
              }}
              onPress={async () => {
                if (photoLocation) {
                  console.log("введена локація:", photoLocation);
                } else if (address) {
                  console.log("автоматично геолокація:", address);
                } else {
                  console.log("Локація не визначена");
                }

                savePicture();
              }}
              disabled={!image || !photoName}
            >
              <Text style={styles.buttonText}>Опублікувати</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 55,
    backgroundColor: "#ffffff",
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

  cameraContainer: {
    justifyContent: "center",
    paddingHorizontal: 16,
    paddingTop: 32,
  },

  cameraButton: {
    marginTop: 110,
    marginLeft: "auto",
    marginRight: "auto",
    backgroundColor: "rgba(255, 255, 255, 0.30)",
    width: 60,
    height: 60,
    alignItems: "center",
    paddingTop: 12,
    borderRadius: 100,
    paddingLeft: 14,
  },

  camera: {
    height: 240,
    borderRadius: 8,
  },
  galleryButtonText: {
    color: "#bdbdbd",
    paddingTop: 8,
  },

  inputContainer: {
    marginTop: -176,
    paddingHorizontal: 16,
    marginBottom: 0,
  },
  input: {
    paddingVertical: 16,
    fontFamily: "Roboto400",
    fontSize: 16,
    alignSelf: "stretch",
    marginBottom: 1,
    color: "#212121",
    backgroundColor: "#ffffff",
    borderBottomWidth: 1,
    borderColor: "#E8E8E8",
    marginBottom: 16,
  },
  button: {
    fontFamily: "Roboto400",
    alignSelf: "stretch",
    alignItems: "center",
    padding: 16,
    marginTop: 26,
    backgroundColor: "#FF6C00",
    borderRadius: 100,
    marginBottom: 16,
  },
  buttonText: {
    fontSize: 16,
    color: "#ffffff",
  },
  locationIcon: {
    position: "absolute",
    top: -62,
  },
});
