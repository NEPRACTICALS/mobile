import CustomButton from '../../components/CustomButton'
import CustomInput from '../../components/CustomInput'

import React, { useState } from 'react'
import { Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useToast } from 'react-native-toast-notifications'
import { validatePost } from '../../lib/utils'
import axios from 'axios'
import { router } from 'expo-router'

// model to create a  post 

const AddPost = () => {
  // use toast to send notifications to the post ui
  const toast = useToast();

  const [formData, setFormData] = useState({
    userId: 0,
    title: "",
    body: ""
  });

  // function to create a post with userId, title and body 

  const handleSubmit = async () => {
    try {
      if (!formData.userId || !formData.title || !formData.body) {
        return toast.show("Please fill in all fields", {
          type: "danger"
        });
      }
      // function to validate the post 
      const validationResults = validatePost(formData);

      if (!validationResults.title.valid) {
        return toast.show(validationResults.title.message, {
          type: "danger"
        });
      }
      if (!validationResults.userId.valid) {
        return toast.show(validationResults.userId.message, {
          type: "danger"
        });
      }
      if (!validationResults.body.valid) {
        return toast.show(validationResults.body.message, {
          type: "danger"
        });
      }
      // url of creating post 

      const post = await axios.post(
        "https://jsonplaceholder.typicode.com/posts",
        formData
      );
      console.log(post.data); // Log post data
      toast.show("Post created successfully", { type: "success" });

      router.push("/home");
    } catch (error) {
      console.error("Error creating post:", error); // Log fetch error
      toast.show("Error creating post", { type: "danger" });
    }
  };

  return (
    <SafeAreaView className="p-3 px-5 h-full justify-center">
      <View>
        <Text className="text-xl font-rubiksemibold text-gray-800">
          Add Post
        </Text>
        <Text className="text-gray-600 text-base">
          Fill in the form below to add a new post
        </Text>
      </View>
      <View className="mb-5 mt-8">
        <CustomInput
          value={
            formData.userId.toString() == "NaN"
              ? ""
              : formData.userId.toString()
          }
          label="userId"
          placeholder="userId"
          onChangeText={(val) =>
            setFormData({ ...formData, userId: parseInt(val) })
          }
          keyboardType="numeric"
          containerStyles="mt-3"
        />
        <CustomInput
          value={formData.title}
          label=""
          placeholder="Enter title"
          onChangeText={(val) => setFormData({ ...formData, title: val })}
        />
        <CustomInput
          value={formData.body}
          label="body"
          placeholder="Enter body"
          onChangeText={(val) => setFormData({ ...formData, body: val })}
        />
      </View>
      <CustomButton
        title="Add POST"
        handlePress={handleSubmit}
        containerStyles="mt-8"
      />
    </SafeAreaView>
  );
}

export default AddPost