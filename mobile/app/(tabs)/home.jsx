import CustomButton from '../../components/CustomButton';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { FlatList, Image, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from 'axios';

export default function HomeScreen() {
  const [posts, setPosts] = useState([]);

  // Displaying  all the created post using flatList 

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("https://jsonplaceholder.typicode.com/posts");
      setPosts(response.data);
    };
    fetchData();
  }, []);

  const router = useRouter();

  return (
    <SafeAreaView className='bg-white h-full px-3 pt-3'>
      <FlatList
        data={posts}
        ListEmptyComponent={() => (
          <View className='h-full justify-center items-center bg-gray-50 rounded-lg'>
            <Image
              source={require('../../assets/svg.png')}
              style={{ width: 200, height: 200 }}
              className='rounded-lg'
            />
            <Text className='text-lg text-gray-700 pt-3'>You haven't created any posts</Text>
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View className='p-3 rounded-lg mb-3 border border-gray-200 shadow-sm'>
            <Text className='text-lg font-semibold'>{item.title}</Text>
            <Text className='text-base text-gray-500 mb-3'>{item.body}</Text>
            <CustomButton
              handlePress={() => router.push(`/post/${item.id}`)}
              title='View'
              containerStyles='mt-3'
              variant='outline'
              titleStyles='text-base'
            />
          </View>
        )}
        ListHeaderComponent={() => (
          <View className='mb-6'>
            <Text className='text-gray-500 text-base'>Here are the posts you have created</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
}
