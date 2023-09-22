import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import axios from "axios";

const MapScreen = ({ route }) => {
  const [coordinates, setCoordinates] = useState(null);

  const location = route.params?.location || "";
  console.log("location: ", location);
  console.log("route.params", route);

  const initialRegion = {
    latitude: 50.4501,
    longitude: 30.5234,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  useEffect(() => {
    const getCoordinates = async () => {
      try {
        const apiKey = "AIzaSyAPKTAE3Swal8DHH7is-y7Mnsv8IEROJeU";
        const response = await axios.get(
          `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
            location
          )}&key=${apiKey}`
        );
        console.log("response", response.data);
        const results = response.data.results;
        if (results && results.length > 0) {
          const { lat, lng } = results[0].geometry.location;
          setCoordinates({ latitude: lat, longitude: lng });
        }
      } catch (error) {
        console.error("Помилка отримання координат:", error);
      }
    };

    if (location) {
      getCoordinates();
    }
  }, [location]);

  return (
    <View style={styles.container}>
      <MapView style={styles.map} initialRegion={initialRegion}>
        {coordinates ? (
          <Marker
            coordinate={coordinates}
            title="Місце"
            description={location}
          />
        ) : (
          initialRegion
        )}
      </MapView>
      <Text>MapScreen</Text>
    </View>
  );
};

export default MapScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: "100%",
    height: "100%",
  },
});
