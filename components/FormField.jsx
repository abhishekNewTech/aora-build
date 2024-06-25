import { View, Text, TextInput, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { icons } from "../constants";

const FormField = ({
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
    <View className={`space-y-2 ${otherStyle}`}>
      <Text className="text-base text-gray-100 font-pmedium">{title}</Text>
      <View className="w-full h-16 px-4 border-2 border-black-200 flex-row items-center bg-black-100 item-center rounded-2xl focus:border-secondary">
        <TextInput
          className="flex-1 text-white font-psemibold text-base"
          value={value}
          placeholder={placeholder}
          placeholderTextColor="#7b7b8b"
          onChangeText={HandleChange}
          secureTextEntry={title === "Password" ? !showPassword : showPassword}
          keyboardType={keyboardType}
        />
        {title==="Password" &&
        <TouchableOpacity onPress={()=> setshowPassword(!showPassword)}>
          <Image
            source={!showPassword ? icons.eye : icons.eyeHide}
            className="w-6 h-6"
            resizeMode="contain"
            />
        </TouchableOpacity>
        }
      </View>
    </View>
  );
};

export default FormField;
