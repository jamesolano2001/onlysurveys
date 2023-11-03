import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Tabs } from 'expo-router';
import { Pressable, useColorScheme } from 'react-native';
import { AntDesign, Entypo } from '@expo/vector-icons'; 
import { Ionicons } from '@expo/vector-icons';

import Colors from '../../constants/Colors';

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
      }}>
      {/* <Tabs.Screen
        name="login"
        options={{
          title: '',
          tabBarIcon: ({ color }) => <AntDesign name="login" size={30} color="#8AC83F" />,
        }}
      /> */}
      <Tabs.Screen
        name="fav"
        options={{
          title: '',
          tabBarIcon: ({ color }) => <TabBarIcon name="heart" color="#8AC83F" />,
          tabBarLabel: "Favorites"
          // headerRight: () => (
          //   <Link href="/modal" asChild>
          //     <Pressable>
          //       {({ pressed }) => (
          //         <FontAwesome
          //           name="info-circle"
          //           size={25}
          //           color={Colors[colorScheme ?? 'light'].text}
          //           style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
          //         />
          //       )}
          //     </Pressable>
          //   </Link>
          // ),
        }}
      />
      <Tabs.Screen
        name="chat"
        options={{
          title: '',
          tabBarIcon: ({ color }) => <Entypo name="chat" size={24} color="#8AC83F" />,
          tabBarLabel: "Chat"
        }}
      />
      <Tabs.Screen
        name="home" 
        options={{
          title: '',
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color="#8AC83F" />,
          tabBarLabel: "Home"
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: '',
          tabBarIcon: ({ color }) => <TabBarIcon name="search" color="#8AC83F" />,
          tabBarLabel: "Search"
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: '',
          tabBarIcon: ({ color }) => <Ionicons name="person-circle-outline" size={32} color="#8AC83F" />,
          tabBarLabel: "Profile"
        }}
      />

    </Tabs>
  );
}
