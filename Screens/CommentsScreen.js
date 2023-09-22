// import { Text } from "react-native";
// import { View } from "react-native";

// const CommentsScreen = () => {
//   return (
//     <View>
//       <Text>CommentsScreen</Text>
//     </View>
//   );
// };

// export default CommentsScreen;
import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, TextInput, View } from "react-native";
import { useState, useEffect } from "react";
import * as Location from "expo-location";
import { Text /* інші імпорти */ } from "react-native";

export default function App() {
  const [location, setLocation] = useState();
  const [address, setAddress] = useState("");
  const [geocodedAddress, setGeocodedAddress] = useState("");

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

  const geocode = async () => {
    const geocodedLocation = await Location.geocodeAsync(address);
    console.log("Geocoded Address:");
    console.log(geocodedLocation);
    console.log("first", first);

    // Встановлюємо геокодовану адресу в стані для відображення на екрані
    if (geocodedLocation.length > 0) {
      setGeocodedAddress(geocodedLocation[0].formattedAddress);
    } else {
      setGeocodedAddress("Адресу не знайдено");
    }
  };

  const reverseGeocode = async () => {
    const reverseGeocodedAddress = await Location.reverseGeocodeAsync({
      longitude: location.coords.longitude,
      latitude: location.coords.latitude,
    });

    const addressInfo = reverseGeocodedAddress[0];
    const city = addressInfo.city;
    const street = addressInfo.street;
    const streetNumber = addressInfo.streetNumber;

    console.log(`${city}, ${street}, ${streetNumber}`);

    console.log("Reverse Geocoded:");
    console.log(reverseGeocodedAddress);
    setAddress(`${city}, ${street}, ${streetNumber}`);
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Address"
        value={address}
        onChangeText={setAddress}
      />
      <Button title="Geocode Address" onPress={geocode} />
      <Text>{geocodedAddress}</Text>
      <Button
        title="Reverse Geocode Current Location"
        onPress={reverseGeocode}
      />
      <Text>{address}</Text>
      <StatusBar style="auto" />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
