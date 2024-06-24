import CustomButton from '../components/CustomButton'

import { useRouter } from 'expo-router'
import React from 'react'
import { Image, ScrollView, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

// home page 

const Onboarding = () => {
  
    const router = useRouter();
    return (
      <SafeAreaView className="bg-white">
        <ScrollView
          contentContainerStyle={{
            height: "100%"
          }}
        >
          <View className="h-full items-center justify-center px-6 font-rubik">
            <Image
              source={require("../assets/undraw_Welcome_re_h3d9 (12).png")}
              resizeMode="contain"
              className="w-[240px] h-[240px]"
            />
            <Text className="text-2xl font-bold font-rubik">Welcome </Text>

            <Text className="text-center text-lg text-gray-500 py-4 ">
              JsonPlaceholder
            </Text>

            <View className="w-full mt-6">
              <CustomButton
                title="Go to Home"
                handlePress={() => router.push("/add-post")}
                containerStyles="mb-3"
              />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
}

export default Onboarding