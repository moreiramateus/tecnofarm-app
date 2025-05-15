import React, { useEffect, useRef, useState } from "react";
import { Dimensions, Image, ScrollView, StyleSheet, View } from "react-native";

const { width } = Dimensions.get("window");

const images = [
  require("@/assets/images/scrollImage1.png"),
  require("@/assets/images/menuBackground.png"),
  require("@/assets/images/scrollImage.png"),
];

export default function ImageCarousel() {
  const scrollRef = useRef<ScrollView>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (currentIndex + 1) % images.length;
      scrollRef.current?.scrollTo({ x: nextIndex * width, animated: true });
      setCurrentIndex(nextIndex);
    }, 3000); // troca a cada 3 segundos

    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        scrollEnabled={false} // bloqueia scroll manual
        showsHorizontalScrollIndicator={false}
        style={styles.scrollView}
      >
        {images.map((img, index) => (
          <Image
            key={index}
            source={img}
            style={styles.image}
            resizeMode="cover"
          />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 350,
    borderRadius:50,
  },
  scrollView: {
    width,
  },
  image: {
    width,
    height: 350,
  },
});
