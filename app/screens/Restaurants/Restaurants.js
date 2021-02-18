import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Icon } from "react-native-elements";
import { firebaseApp } from "../../utils/firebase";
import firebase from "firebase/app";

export default function Restaurants(props) {
  const { navigation } = props;
  const [user, setUser] = useState(null);

  // este hook se utiliza para capturar el estado de logueo del usuario.
  // si setUser es null no está logueado.
  useEffect(() => {
    firebase.auth().onAuthStateChanged((userInfo) => {
      // console.log(userInfo);
      setUser(userInfo);
    });
  }, []);

  return (
    <View style={styles.viewBody}>
      <Text>Restaurants...</Text>
      {/* el siguiente if sirve para comprobar si se se cumple una condición. 
      en este caso si se está logueado y mostrar el icono de + */}
      {user && (
        <Icon
          reverse
          type="material-community"
          name="plus"
          color="#00a680"
          containerStyle={styles.btnContainer}
          // en este onPress se navega hacia la screen de nuevo restaurant
          // que hace un llamado a la screen de un nuevo restaurante
          onPress={() => navigation.navigate("add-restaurant")}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  viewBody: {
    flex: 1,
    backgroundColor: "#fff",
  },
  btnContainer: {
    position: "absolute",
    bottom: 10,
    right: 10,
    shadowColor: "black",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.5,
  },
});
