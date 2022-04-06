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
  SafeAreaView
} from "react-native";
const { width, height } = Dimensions.get("screen");

const API_KEY = "userApi";
const API_URL =
  "https://api.pexels.com/v1/search?query=nature&orientation=portrait&size=small&per_page=20";

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

  if (!images) {
    return <Text>Comming up...</Text>;
  }
  return (
    <div className="App">
      <View>
        <FlatList
          data={images}
          keyExtractor={(item) => item.id.toString()}
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
      </View>
    </div>
  );
}
