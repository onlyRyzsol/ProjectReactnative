import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  FlatList,
  Image,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { Picker } from "@react-native-picker/picker";
import { Entypo } from "@expo/vector-icons";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";

// Halaman Utama
const HomeScreen = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <FontAwesome5 name="mountain" size={80} color="#ff5c5c" />
        <Text style={styles.loadingText}>Localgoes</Text>
        <ActivityIndicator
          size="large"
          color="#ff5c5c"
          style={styles.activityIndicator}
        />
      </View>
    );
  }

  const handlePress = () => {
    navigation.navigate("Detail");
  };

  const handleAboutPress = () => {
    navigation.navigate("About");
  };

  return (
    <ImageBackground
      source={{
        uri: "https://i.pinimg.com/736x/88/86/4d/88864dfe857e060689b057436a252406.jpg",
      }}
      style={styles.background}
    >
      <View style={styles.overlay}>
        <TouchableOpacity style={styles.aboutButton} onPress={handleAboutPress}>
          <Text style={styles.aboutButtonText}>About</Text>
        </TouchableOpacity>
        <Text style={styles.textAboveButton}>Mulai untuk menjelajah</Text>
        <Text style={styles.textBelowButton}>
          Selamat menikmati perjalanan bebas stres dengan mudah dan sederhana di
          setiap langkah
        </Text>

        <TouchableOpacity style={styles.button} onPress={handlePress}>
          <Text style={styles.buttonText}>Lanjutkan</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};
// Halaman Detail
const DetailScreen = ({ navigation }) => {
  const [selectedFilter, setSelectedFilter] = useState("semua");
  const [searchQuery, setSearchQuery] = useState("");

  const imageList = [
    {
      id: "1",
      uri: "https://i.pinimg.com/736x/1a/25/69/1a256935e03763b1c309cb0295ea7d78.jpg",
      title: "Gunung Arjuna",
      description:
        "Gunung Arjuna adalah salah satu gunung tertinggi di Jawa Timur dengan pemandangan yang menakjubkan.",
      region: "Jawa Timur",
    },
    {
      id: "2",
      uri: "https://i.pinimg.com/736x/03/1a/1f/031a1f8a8bc800c3089f8537ec11afda.jpg",
      title: "Gunung Lawu",
      description:
        "Gunung Lawu memiliki sejarah budaya yang kaya dan trek yang menantang untuk pendaki.",
      region: "Jawa Timur",
    },
    {
      id: "3",
      uri: "https://i.pinimg.com/736x/d8/4a/96/d84a9630a77806e2bc796896e2b0cab5.jpg",
      title: "Gunung Welirang",
      description:
        "Gunung Welirang terkenal dengan aktivitas vulkaniknya dan menjadi lokasi populer bagi pendaki.",
      region: "Jawa Timur",
    },
    {
      id: "4",
      uri: "https://i.pinimg.com/736x/51/4e/b6/514eb6837acc56c149498bbdd5bfc382.jpg",
      title: "Gunung Raung",
      description:
        "Gunung Raung adalah salah satu gunung dengan kaldera terbesar di Indonesia.",
      region: "Jawa Timur",
    },
    {
      id: "5",
      uri: "https://i.pinimg.com/736x/4d/b1/b1/4db1b189d7478b9736d81e87680d8bda.jpg",
      title: "Gunung Kelud",
      description:
        "Gunung kelud adalah salah satu gunung yang mempunyai kawah terbesar di Indonesia.",
      region: "Jawa Timur",
    },
    // Lanjutan daftar gunung yang Anda tambahkan...
    {
      id: "6",
      uri: "https://i.pinimg.com/736x/65/f9/b9/65f9b91a4acfe7768ce507f5504a8a68.jpg",
      title: "Gunung Ijen",
      description:
        "Gunung Ijen adalah salah satu gunung yang identik dengan kawah dan api birunya",
      region: "Jawa Timur",
    },
    {
      id: "7",
      uri: "https://i.pinimg.com/736x/dd/a5/69/dda56915c86910f4d1705c02cb9a4b18.jpg",
      title: "Gunung Bromo",
      description:
        "Gunung Bromo adalah salah satu gunung yang indah dengan view kawahnya.",
      region: "Jawa Timur",
    },
    {
      id: "8",
      uri: "https://i.pinimg.com/736x/f8/a5/21/f8a5216c86534d2d7f25fd974bf9e3cf.jpg",
      title: "Gunung Butak",
      description:
        "Gunung Butak adalah salah satu gunung identik dengan savana nya yang luas dan indah",
      region: "Jawa Timur",
    },
    {
      id: "1.2",
      uri: "https://i.pinimg.com/736x/3e/a8/76/3ea876a738372056106dfb7063daf14e.jpg",
      title: "Gunung Selamet",
      description:
        "Gunung selamet adalah salah satu gunung tertinggi di jawa tengah",
      region: "Jawa Tengah",
    },
    {
      id: "2.2",
      uri: "https://i.pinimg.com/736x/ec/bd/ee/ecbdeef2e0f40ca0c858be9659874769.jpg",
      title: "Gunung sumbing",
      description: "Gunung sumbing adalah gunung tertinggi ke 2 di jawa Tengah",
      region: "Jawa Tengah",
    },
    {
      id: "3.2",
      uri: "https://i.pinimg.com/736x/67/ce/39/67ce3954b643492472286d6c932a1cf4.jpg",
      title: "Gunung Sindoro",
      description:
        "Gunung Sindoro adalah adik dari gunung sumbing di jawa tengah",
      region: "Jawa Tengah",
    },
    {
      id: "4.2",
      uri: "https://i.pinimg.com/736x/04/40/d9/0440d957a6fde925c3f09ab6646610d4.jpg",
      title: "Gunung merbabu",
      description:
        "Gunung Merbabu adalah salah satu gunung identik dengan savana nya yang luas dan indah",
      region: "Jawa Tengah",
    },
    {
      id: "5.2",
      uri: "https://i.pinimg.com/736x/ab/42/73/ab42734011523d30d6c4cf8ac4b412ea.jpg",
      title: "Gunung Merapi",
      description:
        "Gunung merapi adalah gunung yang terus aktif dan sering memuntahkan lava",
      region: "Jawa Tengah",
    },
    {
      id: "6.2",
      uri: "https://i.pinimg.com/736x/65/75/0e/65750ee4d1750464e5c8bd8b743bdbc8.jpg",
      title: "Gunung Prau",
      description:
        "Gunung prau adalah gunung yang paling dekat dengan pemukiman warga yang padat",
      region: "Jawa Tengah",
    },
    {
      id: "7.2",
      uri: "https://i.pinimg.com/736x/41/cf/a1/41cfa1c3acfd4abcfcfeee2b044de7bf.jpg",
      title: "Gunung Unggaran",
      description:
        "Gunung unggaran adalah gunung yang Lokasinya relatif dekat dengan Kota Semarang, menjadikannya destinasi wisata alam yang mudah dijangkau.",
      region: "Jawa Tengah",
    },
    {
      id: "8.2",
      uri: "https://i.pinimg.com/736x/6d/a7/1b/6da71b95b8d0b1be435bb99df1d097b9.jpg",
      title: "Gunung Muria",
      description: "Gunung muria adalah tempat sunan muria bertempat",
      region: "Jawa Tengah",
    },
    {
      id: "1.3",
      uri: "https://i.pinimg.com/736x/35/1b/03/351b03522b1c3f1cff2f985dd39fe8f7.jpg",
      title: "Gunung ciremai",
      description: "Gunung ciremai adalah gunung tertinggi di jawa barat",
      region: "Jawa Barat",
    },
    {
      id: "2.3",
      uri: "https://i.pinimg.com/736x/2f/43/9f/2f439fdcb6f5c89112f083e23316ac55.jpg",
      title: "Gunung pangranggo",
      description:
        "Gunung pangranggo adalah gunung tertinggi ke 2 di jawa barat",
      region: "Jawa Barat",
    },
    {
      id: "3.3",
      uri: "https://i.pinimg.com/736x/cb/6b/b9/cb6bb9dd2645ed5c0693d9c836d2b794.jpg",
      title: "Gunung gede",
      description:
        "Gunung Gede adalah adalah gunung kembar dari gunung pangranggo",
      region: "Jawa Barat",
    },
    {
      id: "4.3",
      uri: "https://i.pinimg.com/736x/fb/f3/ea/fbf3ea300df5f8e4432124d4b52ffe31.jpg",
      title: "Gunung papamdayan",
      description:
        "Gunung papandayan adalah salah satu gunung yang treknya seram namun puncaknya yang begitu indah",
      region: "Jawa Barat",
    },
    {
      id: "5.3",
      uri: "https://i.pinimg.com/736x/a4/76/fa/a476faaf662b67b22959a499a74b6a49.jpg",
      title: "Gunung gulunggung",
      description: "Gunung gulunggung adalah gunung yang mempunyai air terjun",
      region: "Jawa Barat",
    },
    {
      id: "6.3",
      uri: "https://i.pinimg.com/736x/7d/11/69/7d11698bf49bda42f95d3daf4fe17115.jpg",
      title: "Gunung salak",
      description: "Gunung salak adalah gunung yang mempunyai jalur berbatuan",
      region: "Jawa Barat",
    },
    {
      id: "7.3",
      uri: "https://i.pinimg.com/736x/1b/69/08/1b69082f3c64c1da93c6f7fc21342874.jpg",
      title: "Gunung sagara",
      description:
        "gunung sagara adalah Gunung yang mempunyai track yang indah dan mempunyai kawah",
      region: "Jawa Barat",
    },
    {
      id: "8.3",
      uri: "https://i.pinimg.com/736x/3c/a7/16/3ca716ed9ffbc661f46cc2701799f857.jpg",
      title: "Gunung cikuray",
      description:
        "Gunung cikuray adalah gunung yang memiliki puncak yang hampir setapak untuk di lewati",
      region: "Jawa Barat",
    },
  ];

  const filteredImages = imageList.filter(
    (item) =>
      (selectedFilter === "semua" || item.region === selectedFilter) &&
      item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleImagePress = (item) => {
    navigation.navigate("Empty", {
      image: item.uri,
      title: item.title,
      description: item.description,
    });
  };

  return (
    <View style={styles.detailContainer}>
      <Text style={styles.detailText}>LocalGo</Text>
      <TextInput
        style={styles.searchBox}
        placeholder="Telusuri Gunung"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <Picker
        selectedValue={selectedFilter}
        style={styles.picker}
        onValueChange={(itemValue) => setSelectedFilter(itemValue)}
      >
        <Picker.Item label="Semua" value="semua" />
        <Picker.Item label="Jawa Timur" value="Jawa Timur" />
        <Picker.Item label="Jawa Tengah" value="Jawa Tengah" />
        <Picker.Item label="Jawa Barat" value="Jawa Barat" />
      </Picker>
      <FlatList
        data={filteredImages}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleImagePress(item)}>
            <View style={styles.imageContainerGrid}>
              <Image source={{ uri: item.uri }} style={styles.imageGrid} />
              <Text style={styles.imageTitle}>{item.title}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

// Halaman About
const AboutScreen = () => {
  return (
    <View style={styles.aboutContainer}>
      <Text style={styles.aboutTitle}>Tentang Aplikasi</Text>
      <Text style={styles.aboutText}>
        MountAGoes adalah aplikasi eksplorasi gunung di Indonesia yang
        menyediakan info wisata dan infografis setiap gunung.
      </Text>
    </View>
  );
};

const handleImagePress = (item) => {
  navigation.navigate("Empty", {
    image: item.uri,
    title: item.title,
    description: item.description,
  });
};

const EmptyScreen = ({ route }) => {
  const { image, title, description } = route.params;

  return (
    <View style={styles.detailContainer}>
      <Image source={{ uri: image }} style={styles.detailImage} />
      <Text style={styles.detailTitle}>{title}</Text>
      <Text style={styles.detailDescription}>{description}</Text>
    </View>
  );
};

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Detail" component={DetailScreen} />
        <Stack.Screen name="About" component={AboutScreen} />
        <Stack.Screen name="Empty" component={EmptyScreen} />{" "}
        {/* Tambahkan screen baru */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

// Stylesheet
const styles = StyleSheet.create({
  // Global Styles
  background: {
    flex: 1,
    resizeMode: "cover",
  },
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 20,
  },
  button: {
    backgroundColor: "#ff5c5c",
    paddingVertical: 15,
    paddingHorizontal: 95,
    borderRadius: 10,
    elevation: 5,
    position: "absolute",
    bottom: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },

  // HomeScreen Styles
  aboutButton: {
    position: "absolute",
    top: 50,
    right: 20,
    backgroundColor: "#ff5c5c",
    padding: 10,
    borderRadius: 5,
  },
  aboutButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
  textAboveButton: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 5,
    textAlign: "center",
  },
  textBelowButton: {
    fontSize: 14,
    color: "#fff",
    textAlign: "center",
    marginBottom: 20,
    paddingHorizontal: 30,
  },

  // Loading Screen Styles
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff", // Background color of the loading screen
  },
  loadingText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333", // White text for loading message
    marginTop: 20,
  },
  activityIndicator: {
    marginTop: 20,
  },

  // DetailScreen Styles
  detailContainer: {
    flex: 1,
    backgroundColor: "#f2f2f2",
    paddingTop: 20,
  },
  detailText: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  searchBox: {
    width: "80%",
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 10,
    alignSelf: "center",
  },
  picker: {
    width: "80%",
    alignSelf: "center",
    marginBottom: 20,
  },
  columnWrapper: {
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
  imageContainerGrid: {
    flex: 1,
    alignItems: "center",
    marginVertical: 10,
    marginHorizontal: 5,
  },
  imageGrid: {
    width: 150,
    height: 150,
    borderRadius: 10,
  },
  imageTitle: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },

  // AboutScreen Styles
  aboutContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  aboutTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  aboutText: {
    fontSize: 16,
    color: "#555",
    textAlign: "center",
    lineHeight: 24,
  },
});
