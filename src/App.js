import React, { useEffect, useState } from "react";
import {
  StatusBar,
  FlatList,
  Image,
  Animated,
  Text,
  View,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Easing,
  SafeAreaViewBase,
  SafeAreaView,
  ScrollView
} from "react-native";
const { width, height } = Dimensions.get("screen");

const API_KEY = "userApi";
const API_URL =
  "https://api.pexels.com/v1/search?query=nature&orientation=portrait&size=small&per_page=20";

const IMAGE_SIZE = 80;
const SPACING = 10;

const fetchImages = async () => {
  const data = await fetch(API_URL, {
    headers: {
      Authorization: API_KEY
    }
  });
  const { photos } = await data.json();
  return photos;
};

export default function App() {
  const [images, setImages] = React.useState(null);
  React.useEffect(() => {
    const fetchImageData = async () => {
      const images = await fetchImages();
      // console.log(imagesArray);
      setImages(images);
    };
    fetchImageData();
  }, []);

  const topRef = React.useRef();
  const bottomRef = React.useRef();
  const [activeIndex, setActiveIndex] = React.useState(0);
  const scrollToActiveIndex = (index) => {
    setActiveIndex(index);
    topRef?.current?.scrollToOffset({
      offset: index * width,
      animated: true
    });
    if (index * (IMAGE_SIZE + SPACING) - IMAGE_SIZE / 2 > width / 2) {
      bottomRef?.current?.scrollToOffset({
        offset: index * (IMAGE_SIZE + SPACING) - width / 2 + IMAGE_SIZE / 2,
        animated: true
      });
    } else {
      bottomRef?.current?.scrollToOffset({
        offset: 0,
        animated: true
      });
    }
  };

  if (!images) {
    return <Text>Comming up...</Text>;
  }

  return (
    <div className="App">
      <View>
        <FlatList
          ref={topRef}
          data={images}
          keyExtractor={(item) => item.id.toString()}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={(ev) => {
            scrollToActiveIndex(
              Math.floor(ev.nativeEvent.contentOffset.x / width)
            );
          }}
          renderItem={({ item }) => {
            return (
              <View style={{ width, height }}>
                <Image
                  src={{ uri: item.src.portrait }}
                  style={[StyleSheet.absoluteFillObject]}
                />
              </View>
            );
          }}
        />
        <FlatList
          ref={bottomRef}
          data={images}
          keyExtractor={(item) => item.id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{ position: "absolute", bottom: IMAGE_SIZE }}
          contentContainerStyle={{ paddingHorizontal: SPACING }}
          renderItem={({ item, index }) => {
            return (
              <TouchableOpacity onPress={() => scrollToActiveIndex(index)}>
                <Image
                  src={{ uri: item.src.portrait }}
                  style={{
                    width: IMAGE_SIZE,
                    height: IMAGE_SIZE,
                    borderRadius: 12,
                    marginRight: SPACING,
                    borderWidth: 2,
                    borderColor: activeIndex === index ? "#000" : "transparent"
                  }}
                />
              </TouchableOpacity>
            );
          }}
        />
      </View>
    </div>
  );
}
