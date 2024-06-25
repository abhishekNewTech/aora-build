import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ImageBackground,
  Image,
} from "react-native";
import React, { useRef, useState } from "react";
import * as Animatable from "react-native-animatable";
import { icons } from "../constants";
// import { VideoView, useVideoPlayer } from "expo-video";
import { ResizeMode, Video } from "expo-av";

const zoomout = {
  0: { scale: 1 },
  1: { scale: 0.9 },
};

const zoomIn = {
  0: { scale: 0.9 },
  1: { scale: 1 },
};
const TrendingItem = ({ activeItem, item }) => {
  const videoSource =
    "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4";

  const ref = useRef(null);
  const [play, setPlay] = useState(false);

  return (
    <Animatable.View
      animation={activeItem == item.$id ? zoomIn : zoomout}
      duration={500}
      className="mx-5"
    >
      {play ? (
        <Video
          ref={ref}
          source={{ uri: videoSource }}
          className="w-52 h-72 rounded-[35px] mt-3 bg-white/10"
          resizeMode={ResizeMode.CONTAIN}
          useNativeControls
          shouldPlay
          onPlaybackStatusUpdate={(status) => {
            if (status.didJustFinish) {
              setPlay(false);
            }
          }}
        />
      ) : (
        <TouchableOpacity
          className="relative justify-center items-center"
          activeOpacity={0.7}
          onPress={() => setPlay(true)}
        >
          <ImageBackground
            className="w-52 h-72 rounded-[35px] my-5 overflow-hidden shadow-lg shadow-black/40"
            source={{ uri: item.thumbnail }}
          />
          <Image
            source={icons.play}
            className="w-12 h-12  rounded-xl absolute"
            resizeMode="cover"
          />
        </TouchableOpacity>
      )}
    </Animatable.View>
  );
};

const Trending = ({ posts }) => {
  const [activeItem, setActiveItem] = useState(posts[1]);

  const viewableItemsChanged = ({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setActiveItem(viewableItems[0].key);
    }
  };
  return (
    <FlatList
      data={posts}
      keyExtractor={(item) => item.$id}
      renderItem={({ item }) => (
        <TrendingItem activeItem={activeItem} item={item} />
      )}
      horizontal
      onViewableItemsChanged={viewableItemsChanged}
      viewabilityConfig={{ itemVisiblePercentThreshold: 80 }}
      contentOffset={{ x: 170 }}
    />
  );
};

export default Trending;
