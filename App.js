import React from "react";
import { Platform, StyleSheet, Text, View, Image } from "react-native";
/* eslint-disable import/named*/

import { MapView, Constants, Location, Permissions } from "expo";
/* eslint-enable import/named*/

// import CarMarker from "./components/CarMarker";

import carIcon from "./components/carIcon.png";
import CurrentCarCallout from "./components/CurrentCarCallout";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      locationLoadingErrorMessage: "",
      locationLoading: false,
      region: {
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
      },
      markers: [
        // {
        //   latlng: {
        //     latitude: 37.78825,
        //     longitude: -122.4324
        //   },
        //   title: "Da Sam Mobile",
        //   description: "so fly"
        // }
      ]
    };
  }

  componentWillMount() {
    if (Platform.OS === "android" && !Constants.isDevice) {
      this.setState({
        locationLoadingErrorMessage:
          "Oops, this will not work on Sketch in an Android emulator. Try it on your device!"
      });
    } else {
      this.setState({
        locationLoading: true
      });
      this._getLocationAsync();
      // setInterval(() => {
      //   this._getLocationAsync();
      // }, 500);
    }
  }

  _getLocationAsync = async () => {
    const { region } = this.state;
    // console.log('asking for permisions')
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== "granted") {
      this.setState({
        locationLoadingErrorMessage: "Permission to access location was denied",
        locationLoading: false
      });
    }
    let location = await Location.getCurrentPositionAsync({});
    // console.error('location:',location)
    this.setState({
      locationLoading: false,
      region: {
        ...region,
        ...location.coords
      },
      markers: [
        {
          latlng: {
            ...location.coords
          },
          title: "Da Sam Mobile",
          description: "so fly"
        }
      ]
    });
  };

  onRegionChange = region => {
    this.setState({ region });
  };

  render() {
    const {
      locationLoading,
      locationLoadingErrorMessage,
      region,
      markers
    } = this.state;
    console.log("markers:", markers);
    if (locationLoading) {
      return <Text style={{ backgroundColor: "purple" }}>Loading... It</Text>;
      // return <AppLoading />;
    }
    if (locationLoadingErrorMessage) {
      return (
        <View style={styles.errorMessageContainer}>
          <Text style={styles.errorMessage}>{locationLoadingErrorMessage}</Text>
        </View>
      );
    }
    // return (
    //   <Image
    //     style={{
    //       alignSelf: "center",
    //       height: 150,
    //       width: 150,
    //       borderWidth: 1,
    //       borderRadius: 75,
    //       background: "lightgrey"
    //     }}
    //     source={carIcon}
    //   />
    // );
    // return (
    //   <View style={styles.container}>
    //     <Image style={{}} source={carIcon} />;
    //   </View>
    // );

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTexzt}>Welcome to Wheels</Text>
        </View>
        <View style={styles.call}>

        <CurrentCarCallout />
        </View>
        <MapView
          style={{ width: "100%", flex: 1 }}
          region={region}
          onRegionChange={this.onRegionChange}
        >
          {markers.map((marker, index) => (
            <MapView.Marker
              key={index}
              coordinate={marker.latlng}
              title={marker.title}
              description={marker.description}
              image={carIcon}
            >
              <MapView.Callout>
                <CurrentCarCallout />
              </MapView.Callout>
            </MapView.Marker>
          ))}
        </MapView>
        <View style={styles.footer}>
          <Text style={styles.headerTexzt}>Welcome to Wheels</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  call: {
    position: "absolute",
    top: 0,
    zIndex: 10,
    paddingTop: 90,
    height: 160,
    backgroundColor: "white",
    width: "100%",
  },
  errorMessageContainer: {
    flex: 1,
    color: "red"
  },

  container: {
    flex: 1,
    // backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  header: {
    position: "absolute",
    top: 0,
    zIndex: 10,
    paddingTop: 20,
    height: 60,
    width: "100%",
    backgroundColor: "purple",
    alignItems: "center",
    justifyContent: "center"
  },
  footer: {
    position: "absolute",
    bottom: 0,
    height: 40,
    width: "100%",
    backgroundColor: "blue",
    alignItems: "center",
    justifyContent: "center"
  },
  headerText: {
    fontSize: 16,
    color: "black"
  }
});
