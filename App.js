import React from "react";
import {
  Text,
  StyleSheet,
  View,
  Dimensions,
  Animated,
  PanResponder,
  Image,
  Slider,
  ScrollView
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;

export default class App extends React.Component {
  state = {
    isScrollEnable: false
  };

  componentWillMount() {
    this.scrollOffset = 0;
    this.position = new Animated.ValueXY({ x: 0, y: SCREEN_HEIGHT - 90 });
    this._panResponder = PanResponder.create({
      onMoveShouldSetPanResponder: (e, gestureState) => {
        if (
          (this.state.isScrollEnable &&
            this.scrollOffset <= 0 &&
            gestureState.dy > 0) ||
          (!this.state.isScrollEnable && gestureState.dy < 0)
        ) {
          return true;
        } else {
          return false;
        }
      },
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
        if (gestureState.moveY < 120) {
          Animated.spring(this.position.y, {
            toValue: 0,
            tension: 1
          }).start();
        } else if (gestureState.moveY > SCREEN_HEIGHT - 120) {
          Animated.spring(this.position.y, {
            toValue: 0,
            tension: 1
          }).start();
        } else if (gestureState.dy < 0) {
          this.setState({ isScrollEnable: true });
          Animated.spring(this.position.y, {
            toValue: -SCREEN_HEIGHT + 120,
            tension: 1
          }).start();
        } else if (gestureState.dy > 0) {
          this.setState({ isScrollEnable: false });
          Animated.spring(this.position.y, {
            toValue: SCREEN_HEIGHT - 120,
            tension: 1
          }).start();
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

    const animatedSongDetailOpacity = this.position.y.interpolate({
      inputRange: [0, SCREEN_HEIGHT - 500, SCREEN_HEIGHT - 90],
      outputRange: [1, 0, 0],
      extrapolate: "clamp"
    });

    const animatedBackgroundColor = this.position.y.interpolate({
      inputRange: [0, SCREEN_HEIGHT - 90],
      outputRange: ["rgba(0,0,0,0.5)", "white"],
      extrapolate: "clamp"
    });

    return (
      <Animated.View
        style={{
          flex: 1,
          backgroundColor: animatedBackgroundColor
        }}
      >
        <Animated.View
          {...this._panResponder.panHandlers}
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
          <ScrollView
            scrollEnabled={this.state.isScrollEnable}
            scrollEventThrottle={16}
            onScroll={event => {
              this.scrollOffset = event.nativeEvent.contentOffset.y;
            }}
          >
            <Animated.View
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
            <Animated.View
              style={{
                height: animatedHeaderHeight,
                opacity: animatedSongDetailOpacity
              }}
            >
              <View
                style={{
                  flex: 1,
                  justifyContent: "flex-end",
                  alignItems: "center"
                }}
              >
                <Text style={{ fontWeight: "bold", fontSize: 22 }}>
                  Hotel California
                </Text>
                <Text style={{ fontSize: 18, color: "#fa95ed" }}>
                  Eagles - Hell Freezes Over
                </Text>
              </View>
              <View
                style={{
                  height: 40,
                  width: SCREEN_WIDTH,
                  alignItems: "center"
                }}
              >
                <Slider
                  style={{ width: 300 }}
                  step={1}
                  minimumValue={18}
                  maximumValue={70}
                  value={18}
                />
              </View>
              <View
                style={{
                  flex: 2,
                  flexDirection: "row",
                  justifyContent: "space-around",
                  alignItems: "center"
                }}
              >
                <Ionicons name="md-rewind" size={30} />
                <Ionicons name="md-pause" size={40} />
                <Ionicons name="md-fastforward" size={30} />
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  paddingHorizontal: 20,
                  paddingBottom: 20
                }}
              >
                <Ionicons
                  name="md-add"
                  size={32}
                  style={{
                    color: "#fa95ed"
                  }}
                />
                <Ionicons
                  name="md-more"
                  size={32}
                  style={{
                    color: "#fa95ed"
                  }}
                />
              </View>
            </Animated.View>
            <View style={{ height: 1000 }} />
          </ScrollView>
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
