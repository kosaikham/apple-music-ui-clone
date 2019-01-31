import React from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  Animated,
  PanResponder,
  Image
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;

export default class App extends React.Component {
  componentWillMount() {
    this.position = new Animated.ValueXY({ x: 0, y: SCREEN_HEIGHT - 90 });
  }

  render() {
    const animatedHeight = {
      transform: this.position.getTranslateTransform()
    };

    return (
      <Animated.View
        style={{
          flex: 1,
          backgroundColor: "white"
        }}
      >
        <Animated.View
          style={[
            animatedHeight,
            {
              position: "absolute",
              height: 80,
              left: 0,
              right: 0,
              backgroundColor: "white",
              zIndex: 10
            }
          ]}
        >
          <Animated.View
            style={{
              height: 80,
              borderTopWidth: 1,
              borderTopColor: "#ebe5e5",
              flexDirection: "row",
              alignItems: "center"
            }}
          >
            <View
              style={{ flex: 4, flexDirection: "row", alignItems: "center" }}
            >
              <Animated.View style={{ width: 32, height: 32, marginLeft: 10 }}>
                <Image
                  source={require("./assets/songImage.jpeg")}
                  style={{
                    flex: 1,
                    width: null,
                    height: null,
                    resizeMode: "contain"
                  }}
                />
              </Animated.View>
              <Animated.Text
                style={{
                  opacity: 1,
                  fontSize: 18,
                  paddingLeft: 10
                }}
              >
                Hotel California
              </Animated.Text>
            </View>
            <Animated.View
              style={{
                flex: 1,
                opacity: 1,
                flexDirection: "row",
                justifyContent: "space-around"
              }}
            >
              <Ionicons name="md-pause" size={32} />
              <Ionicons name="md-play" size={32} />
            </Animated.View>
          </Animated.View>
        </Animated.View>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
