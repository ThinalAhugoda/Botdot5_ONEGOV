import Entypo from '@expo/vector-icons/Entypo';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Tabs } from "expo-router";

export default function RootLayout() {
  return (
    <Tabs screenOptions={{tabBarActiveTintColor: "#001F68", tabBarInactiveTintColor: "#FBBC05", }}>
      <Tabs.Screen name="index" options={{
        title: "Settings",
        tabBarIcon: ({color}) => (
          <Ionicons name="compass-sharp" size={24} color={color} />
        ),
        }}/>
        

        <Tabs.Screen name="Dashboard" options={{
        title: "Citizen Requests" ,
        tabBarIcon: ({color}) => (
          //<Ionicons name="compass-sharp" size={24} color={color} />
          <Entypo name="grid" size={24} color={color} />
        ),
        }}/>


      <Tabs.Screen name="ONEGOVAI" options={{
        title: "ONEGOV AI",
        tabBarIcon: ({color}) => (
          <MaterialIcons name="email" size={24} color={color} />
        ),
        }}/>


      <Tabs.Screen name="Profile" options={{
        title: "Profile",
        tabBarIcon: ({color}) => (
          //<MaterialIcons name="email" size={24} color={color} />
          <FontAwesome name="user" size={24} color={color} />
        ),
        }}/>
    </Tabs>
  )
}
