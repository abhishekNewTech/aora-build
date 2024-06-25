import {
  View,
  Text,
  ScrollView,
  Image,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import FormField from "../../components/FormField";
import Custombutton from "../../components/Custombutton";
import { Link, router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { createUser } from "../../lib/appwrite";
const SignUp = () => {
  const [form, setform] = useState({ email: "", password: "", username: "" });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const HandleSubmit = async () => {
    if (!form.email || !form.password || !form.username) {
      return Alert.alert("Error", "Please fill in all the fields");
    }
    console.log(form.email, form.password, form.username, "Result");

    setIsSubmitting(true);
    try {
      const result = await createUser(form.email, form.password, form.username);

      // global state
      router.replace("/Home");
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full ">
      <KeyboardAvoidingView
        behavior={"position"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 40} // adjust as needed
      >
        <ScrollView>
          <StatusBar backgroundColor="#1616122" style="light" />

          <View className="w-full justify-center min-h-[85vh]  px-4 my-6">
            <Image
              source={images.logo}
              resizeMode="contain"
              className="w-[115px] h-[35px]"
            />

            <Text className="text-2xl text-white text-semibold mt-10 font-psemibold">
              Sign up to Aora
            </Text>

            <FormField
              title="User Name"
              value={form.username}
              HandleChange={(e) => setform({ ...form, username: e })}
              otherStyle="mt-7"
            />

            <FormField
              title="Email"
              value={form.email}
              HandleChange={(e) => setform({ ...form, email: e })}
              otherStyle="mt-10"
              keyboardType="email-address"
            />
            <FormField
              title="Password"
              value={form.password}
              HandleChange={(e) => setform({ ...form, password: e })}
              otherStyle="mt-7"
            />
            <Custombutton
              title={"Sign up"}
              containerStyles={"mt-7"}
              isLoading={isSubmitting}
              handlePress={HandleSubmit}
            />

            <View className="justify-center pt-5  flex-row gap-2">
              <Text className="text-lg text-gray-100 font-pregular">
                Have an account already?
              </Text>
              <Link
                href={"Sign-in"}
                className="text-lg font-psemibold text-secondary"
              >
                Sign in
              </Link>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SignUp;
