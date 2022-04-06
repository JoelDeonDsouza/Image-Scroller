import React, { useEffect } from "react";
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
  "https://api.pexels.com/v1/search?query=berlins&orientation=portrait&size=small&per_page=20";

const fetchImages = async () => {
  const data = await fetch(API_URL, {
    headers: {
      Authorization: API_KEY
    }
  });
  const dataResults = await data.json();
  return dataResults;
};

export default function App() {
  React.useEffect(() => {
    const fetchImageData = async () => {
      const images = await fetchImages();
      console.log(images);
    };
    fetchImageData();
  }, []);
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
    </div>
  );
}
