import { StyleSheet, Text, View } from "react-native";
import MapView from "react-native-maps";

const MapScreen = () => {
  const onRegionChange = (region) => {
    console.log(region);
  };
  return (
    <View style={styles.container}>
      <MapView style={styles.map} onRegionChange={onRegionChange}></MapView>
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
