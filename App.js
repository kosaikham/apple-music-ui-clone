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
    this._panResponder = PanResponder.create({
      onMoveShouldSetPanResponder: (e, gestureState) => true,
      onPanResponderGrant: (e, gestureState) => {
        //
        this.position.extractOffset({ x: 0, y: 0 });
      },
      onPanResponderMove: (e, gestureState) => {
        //
        this.position.setValue({ x: 0, y: gestureState.dy });
      },
      onPanResponderRelease: (e, gestureState) => {
        //
        if (gestureState.dy < 0) {
          Animated.spring(this.position.y, {
            toValue: -SCREEN_HEIGHT + 120,
            tension: 1
          }).start();
        } else if (gestureState.dy > 0) {
          Animated.spring(this.position.y, {
            toValue: SCREEN_HEIGHT - 120,
            tension: 1
          }).start();
        } else {
          //
        }
      }
    });
  }

  render() {
    const animatedHeight = {
      transform: this.position.getTranslateTransform()
    };

    const animatedImageHeight = this.position.y.interpolate({
      inputRange: [0, SCREEN_HEIGHT - 90],
      outputRange: [200, 32],
      extrapolate: "clamp"
    });

    const animatedOpacity = this.position.y.interpolate({
      inputRange: [0, SCREEN_HEIGHT - 500, SCREEN_HEIGHT - 90],
      outputRange: [0, 0, 1],
      extrapolate: "clamp"
    });

    const animatedImageMarginLeft = this.position.y.interpolate({
      inputRange: [0, SCREEN_HEIGHT - 90],
      outputRange: [SCREEN_WIDTH / 2 - 100, 10],
      extrapolate: "clamp"
    });

    const animatedHeaderHeight = this.position.y.interpolate({
      inputRange: [0, SCREEN_HEIGHT - 90],
      outputRange: [SCREEN_HEIGHT / 2, 90],
      extrapolate: "clamp"
    });

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
              height: SCREEN_HEIGHT,
              left: 0,
              right: 0,
              backgroundColor: "white",
              zIndex: 10
            }
          ]}
        >
          <Animated.View
            {...this._panResponder.panHandlers}
            style={{
              height: animatedHeaderHeight,
              borderTopWidth: 1,
              borderTopColor: "#ebe5e5",
              flexDirection: "row",
              alignItems: "center"
            }}
          >
            <View
              style={{ flex: 4, flexDirection: "row", alignItems: "center" }}
            >
              <Animated.View
                style={{
                  width: animatedImageHeight,
                  height: animatedImageHeight,
                  marginLeft: animatedImageMarginLeft
                }}
              >
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
                  opacity: animatedOpacity,
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
                opacity: animatedOpacity,
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
