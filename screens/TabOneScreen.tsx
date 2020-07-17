import React, { useEffect, useState } from "react";
import * as Google from "expo-google-app-auth";

import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";
import { ActivityIndicator, StyleSheet, FlatList, Button } from "react-native";

export default function TabOneScreen() {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [auth, setAuth] = useState({});

  console.log(data);

  const signIn = async () => {
    try {
      const result = await Google.logInAsync({
        androidClientId:
          "383140547133-cpsjb6nmdv80ksd133q6i329jvlaes59.apps.googleusercontent.com",
        //iosClientId: YOUR_CLIENT_ID_HERE,  <-- if you use iOS
        scopes: ["profile", "email"],
      });

      if (result.type === "success") {
        setAuth({
          signedIn: true,
          name: result.user.name,
          photoUrl: result.user.photoUrl,
        });
      } else {
        console.log("cancelled");
      }
    } catch (e) {
      console.log("error", e);
    }
  };

  // useEffect(() => {
  //   signIn();
  // }, []);

  return (
    <View style={styles.container}>
      {auth.signedIn ? (
        <LoggedInPage name={auth.name} photoUrl={auth.photoUrl} />
      ) : (
        <LoginPage signIn={signIn} />
      )}
    </View>
  );
}

const LoginPage = (props) => {
  return (
    <View>
      <Text style={styles.header}>Sign In With Google</Text>
      <Button title="Sign in with Google" onPress={() => props.signIn()} />
    </View>
  );
};

const LoggedInPage = (props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>
        Welcome: {props.name}! You are signed in.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  header: {
    fontSize: 25,
  },
  image: {
    marginTop: 15,
    width: 150,
    height: 150,
    borderColor: "rgba(0,0,0,0.2)",
    borderWidth: 3,
    borderRadius: 150,
  },
});
