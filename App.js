import React, { useEffect, useState } from "react";
import { NavigationContainer, StackActions } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StatusBar } from "expo-status-bar";
import {
  Button,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import BlockRGB from "./components/BlockRGB";

function HomeScreen({ navigation }) {
  const [colourArray, setColourArray] = useState([]);

  function renderItem({ item }) {
    return (
      <TouchableOpacity onPress={() => navigation.navigate("Details", item)}>
        <BlockRGB red={item.red} green={item.green} blue={item.blue} />
      </TouchableOpacity>
    );
  }

  function addColour() {
    setColourArray([
      {
        red: Math.floor(Math.random() * 255),
        green: Math.floor(Math.random() * 255),
        blue: Math.floor(Math.random() * 255),
        id: colourArray.length.toString(),
      },
      ...colourArray,
    ]);
  }

  function resetColours() {
    setColourArray([]);
  }

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => <Button onPress={addColour} title="Add colour" />,
    });
  });

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={addColour}
        style={{ height: 40, justifyContent: "center" }}
      >
        <Text>Add Colour</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={resetColours}
        style={{ height: 40, justifyContent: "center" }}
      >
        <Text>Reset Colour</Text>
      </TouchableOpacity>
      <FlatList
        data={colourArray}
        renderItem={renderItem}
        style={{ width: "100%" }}
      />
    </View>
  );
}

function DetailScreen({ route }) {
  const { red, green, blue } = route.params;
  return (
    <View
      style={[
        styles.container,
        { backgroundColor: `rgb(${red}, ${green}, ${blue})` },
      ]}
    >
      <Text style={styles.detailText}> Red: {red} </Text>
      <Text style={styles.detailText}> Green: {green} </Text>
      <Text style={styles.detailText}> Blue: {blue} </Text>
    </View>
  );
}

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Details" component={DetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  detailText: {
    fontSize: 24,
    marginBottom: 20,
  },
});
