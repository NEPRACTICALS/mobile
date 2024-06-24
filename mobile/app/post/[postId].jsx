import CustomButton from "../../components/CustomButton";
import CustomInput from "../../components/CustomInput";
import Ioicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import { useRoute } from "@react-navigation/native"; // Import useRoute from react-navigation
import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useToast } from "react-native-toast-notifications";
import axios from "axios";

const PostView = () => {
  const toast = useToast();
  const router = useRouter();
  const route = useRoute(); // Use useRoute to get route parameters
  const { postId } = route.params || {}; // Access the postId parameter from route.params

  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [formData, setFormData] = useState({
    userId: 0,
    title: "",
    body: ""
  });

  useEffect(() => {
    console.log("Route params:", route.params); // Log route params for debugging
    if (postId) {
      const fetchPost = async () => {
        console.log("Fetching post with id:", postId); // Log fetch start
        try {
          const response = await axios.get(
            `https://jsonplaceholder.typicode.com/posts/${postId}`
          );
          console.log("post fetched:", response.data); // Log fetch success
          setPost(response.data);
          setFormData({
            userId: response.data.userId,
            title: response.data.title,
            body: response.data.body
          });
        } catch (error) {
          console.error("Error fetching post:", error); // Log fetch error
          toast.show("Error fetching post data", { type: "danger" });
        }
      };
      fetchPost();
    }
  }, [postId, route.params]); // Add route.params to dependency array

  const handleSubmit = async () => {
    if (!formData.userId || !formData.title || !formData.body) {
      return toast.show("Please fill in all fields", {
        type: "danger"
      });
    }

    if (
      formData.userId === post?.userId &&
      formData.title === post?.title &&
      formData.body === post?.body
    ) {
      return toast.show("No changes detected", {
        type: "info"
      });
    }

    try {
      const response = await axios.put(
        `https://jsonplaceholder.typicode.com/posts/${postId}`,
        formData
      );
      setPost(response.data);
      toast.show("post updated successfully", { type: "success" });
    } catch (error) {
      console.error("Error updating post:", error); // Log update error
      toast.show("Error updating post", { type: "danger" });
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(
        `https://jsonplaceholder.typicode.com/posts/${postId}`
      );
      toast.show("post deleted successfully", { type: "success" });
      router.push("/home");
    } catch (error) {
      console.error("Error deleting post:", error); // Log delete error
      toast.show("Error deleting post", { type: "danger" });
    }
  };

  const fetchComments = async () => {
    try {
      const response = await axios.get(
        `https://jsonplaceholder.typicode.com/posts/${postId}/comments`
      );
      setComments(response.data);
    } catch (error) {
      console.error("Error fetching comments:", error); // Log fetch error
      toast.show("Error fetching comments", { type: "danger" });
    }
  };

  if (!post) return <Text>Loading...</Text>; // Show loading message

  return (
    <SafeAreaView className="bg-white h-full p-3">
      <View className="flex-row justify-between">
        <Text>WELCOME</Text>
        <TouchableOpacity
          onPress={() => router.push("/home")}
          className="flex-row items-center h-fit"
        >
          <Ioicons name="arrow-back" size={24} />
          <Text>Back to posts</Text>
        </TouchableOpacity>
      </View>
      <View className="mt-6">
        <Text className="text-xl font-rubiksemibold text-gray-800">
          Post Details
        </Text>
        <View className="mb-5 mt-4">
          <CustomInput
            value={formData.title}
            label="title"
            placeholder="Enter title"
            onChangeText={(val) => setFormData({ ...formData, title: val })}
          />
          <CustomInput
            value={formData.body}
            label="body"
            placeholder="Enter body"
            onChangeText={(val) => setFormData({ ...formData, body: val })}
            multiline
            numberOfLines={4}
            containerStyles="mt-3"
          />
          <CustomInput
            value={
              formData.userId.toString() === "NaN"
                ? ""
                : formData.userId.toString()
            }
            label="USERID"
            placeholder="Enter userid "
            onChangeText={(val) =>
              setFormData({ ...formData, userId: parseInt(val) })
            }
            keyboardType="numeric"
            containerStyles="mt-3"
          />
          <CustomButton
            handlePress={handleSubmit}
            title="Update post"
            containerStyles="mt-3"
            variant="solid"
            titleStyles="text-base"
          />
          <CustomButton
            handlePress={handleDelete}
            title="Delete post"
            containerStyles="mt-3"
            variant="outline"
            titleStyles="text-base text-red-500"
          />
        </View>
      </View>
      <View className="mt-6">
        <CustomButton
          handlePress={fetchComments}
          title="Load Comments"
          containerStyles="mt-3"
          variant="solid"
          titleStyles="text-base"
        />
        {comments.map((comment) => (
          <View
            key={comment.id}
            className="p-3 mt-3 border border-gray-200 rounded"
          >
            <Text className="font-bold">{comment.name}</Text>
            <Text>{comment.body}</Text>
            <Text className="text-gray-500">{comment.email}</Text>
          </View>
        ))}
      </View>
    </SafeAreaView>
  );
};

export default PostView;
