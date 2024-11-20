import React, { useEffect } from "react";
import { View, Text } from "react-native";
import SplashScreen from "react-native-splash-screen";

const App = () => {
  useEffect(() => {
    // Menghilangkan splash screen setelah beberapa detik
    SplashScreen.hide();
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Selamat Datang!</Text>
    </View>
  );
};

export default App;
