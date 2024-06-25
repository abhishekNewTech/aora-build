import { Image, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../constants";
import {  Redirect,router } from "expo-router";
import Custombutton from "../components/Custombutton";
import { StatusBar } from "expo-status-bar";
import { GlobalContext, useGlobalContext } from "../context/GlobalProvider";
import { useContext } from "react";

export default function App() {
  // const {isLoggedIn}=useGlobalContext()
  const {isLoggedIn,isLoading}=useContext(GlobalContext)

  if(!isLoading && isLoggedIn) return <Redirect  href={"/Home"}/>

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-full justify-center  items-center min-h-[85vh] px-4">
          <Image
            source={images.logo}
            className="w-[130px] h-[84px]"
            resizeMode="contain"
          />
          <Image
            source={images.cards}
            className="max-w-[380px] h-[300px] w-full"
            resizeMode="contain"
          />

          <View className=" mt-5">
            <Text className="text-3xl text-white font-bold text-center relative">
              Discover Endless Possibilities with{" "}
              <Text className="text-secondary-200 relative">Aora</Text>
            </Text>

            <Text className="text-sm font-pregular text-gray-100 mt-7 text-center">
              Where Creativity meets innovation: embark on a journey of
              limitless exploration with Aora
            </Text>
          </View>

          <Custombutton title="Continue With Email" handlePress={()=>router.push('/Sign-in')} containerStyles="w-full mt-7"/>
        </View>
      </ScrollView>
      <StatusBar backgroundColor="#1616122" style="light"/>
    </SafeAreaView>
  );
}
