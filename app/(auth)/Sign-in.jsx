import { View, Text, ScrollView, Image, Alert } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import FormField from "../../components/FormField";
import Custombutton from "../../components/Custombutton";
import { Link, router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Signin } from "../../lib/appwrite";

const SignIn = () => {
  const [form, setform] = useState({ email: "", password: "" });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const HandleSubmit = async () => {
    if (!form.email || !form.password) {
      return Alert.alert("Error", "Please fill in all the fields");
    }

    setIsSubmitting(true);
    try {
      const user = await Signin(form.email, form.password);

      // global state
      console.log(user, "existing user");
      router.replace("/Home");
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full ">
      <ScrollView>
        <StatusBar backgroundColor="#1616122" style="light" />

        <View className="w-full justify-center min-h-[85vh]  px-4 my-6">
          <Image
            source={images.logo}
            resizeMode="contain"
            className="w-[115px] h-[35px]"
          />

          <Text className="text-2xl text-white text-semibold mt-10 font-psemibold">
            Login to Aora
          </Text>

          <FormField
            title="Email"
            value={form.email}
            HandleChange={(e) => setform({ ...form, email: e })}
            otherStyle="mt-7"
            keyboardType="email-address"
          />
          <FormField
            title="Password"
            value={form.password}
            HandleChange={(e) => setform({ ...form, password: e })}
            otherStyle="mt-7"
          />
          <Custombutton
            title={"Sign in"}
            containerStyles={"mt-7"}
            isLoading={isSubmitting}
            handlePress={HandleSubmit}
          />

          <View className="justify-center pt-5  flex-row gap-2">
            <Text className="text-lg text-gray-100 font-pregular">
              Don't have account?
            </Text>
            <Link
              href={"Sign-up"}
              className="text-lg font-psemibold text-secondary"
            >
              Sign Up
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
