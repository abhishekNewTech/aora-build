import { View, Text, TextInput, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { icons } from "../constants";

const SearchInput = ({
  title,
  value,
  placeholder,
  HandleChange,
  otherStyle,
  keyboardType,
  ...props
}) => {
  const [showPassword, setshowPassword] = useState(false);
  return (
 
      <View className="w-full h-16 px-4 border-2 border-black-200 flex-row items-center bg-black-100 item-center rounded-2xl focus:border-secondary">
        <TextInput
          className="text-base mt-0.5 text-white flex-1 font-pregular"
          value={value}
          placeholder={placeholder}
          placeholderTextColor="#7b7b8b"
          onChangeText={HandleChange}
          secureTextEntry={title === "Password" ? !showPassword : showPassword}
          keyboardType={keyboardType}
        />
      <TouchableOpacity>
        <Image source={icons.search} className="w-5 h-5" resizeMode="contain"/>
      </TouchableOpacity>
      </View>
  );
};

export default SearchInput;
