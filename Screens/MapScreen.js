import { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import axios from "axios";

async function getGeolocationByAddress(address) {
  try {
    const response = await axios.get(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
        address
      )}`
    );
    if (response.data && response.data.length > 0) {
      const firstResult = response.data[0];
      const latitude = parseFloat(firstResult.lat);
      const longitude = parseFloat(firstResult.lon);
      return { latitude, longitude };
    }
  } catch (error) {
    console.error("Помилка при отриманні геолокації:", error);
    return null;
  }
}

const MapScreen = ({ route }) => {
  console.log("route", route.params.location);
  const [location, setLocation] = useState({ latitude: 0, longitude: 0 });

  useEffect(() => {
    const locationString = route.params.location;
    // const locationString = "Київ,вулиця Юлії Здановської";
    getGeolocationByAddress(locationString).then((location) => {
      if (location) {
        console.log("Широта:", location.latitude);
        console.log("Довгота:", location.longitude);
        setLocation(location);
      } else {
        console.log("Не вдалося отримати геолокацію за адресою.");
      }
    });
  }, []);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Marker
          coordinate={{
            latitude: location.latitude,
            longitude: location.longitude,
          }}
          title="Місце"
          description="Опис місця"
        />
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
});

export default MapScreen;
