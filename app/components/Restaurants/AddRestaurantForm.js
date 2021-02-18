import React, { useState } from "react";
import { StyleSheet, View, ScrollView, Alert, Dimensions } from "react-native";
import { Icon, Avatar, Image, Input, Button } from "react-native-elements";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";

export default function AddRestaurantForm(props) {
  const { toastRef, setIsloading, navigation } = props;
  const [restaurantName, setRestaurantName] = useState("");
  const [restaurantAddress, setRestaurantAddress] = useState("");
  const [restaurantDescription, setRestaurantDescription] = useState("");

  const addRestaurant = () => {
    console.log("ok");
  };

  return (
    <ScrollView style={styles.scrollView}>
      <FormAdd
        setRestaurantName={setRestaurantName}
        setRestaurantAddress={setRestaurantAddress}
        setRestaurantDescription={setRestaurantDescription}
      />
      <UploadImage toastRef={toastRef} />
      <Button
        title="crear restaurante"
        onPress={addRestaurant}
        buttonStyle={styles.btnAddRestaurant}
      />
    </ScrollView>
  );
}

function FormAdd(props) {
  return (
    <View style={styles.viewForm}>
      <Input
        placeholder="nombre del restaurante"
        containerStyle={styles.input}
        // con este onchange se obtiene el valor ingresado en el campo
        onChange={(e) => setRestaurantName(e.nativeEvent.text)}
      />
      <Input
        placeholder="direccion"
        containerStyle={styles.input}
        onChange={(e) => setRestaurantAddress(e.nativeEvent.text)}
      />
      <Input
        placeholder="descrición del restaurante"
        multiline={true}
        containerStyle={styles.input}
        inputContainerStyle={styles.textArea}
        onChange={(e) => setRestaurantDescription(e.nativeEvent.text)}
      />
    </View>
  );
}

function UploadImage(props) {
  const { toastRef } = props;
  const imageSelect = async () => {
    const resultPermissions = await Permissions.askAsync(Permissions.CAMERA);
    // const resultPermissionCamera = resultPermission.permissions.camera.status;
    console.log(resultPermissions);

    if (resultPermissions === "denied") {
      toastRef.current.show("es necesario dar permisos a la camara", 3000);
    } else {
      const result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [4, 3],
      });
      console.log(result);
      if (result.cancelled) {
        toastRef.current.show("no has seleccionado ninguna imagen", 2000);
      } else {
        console.log("ok");
      }
    }
  };
  return (
    <View style={styles.viewImages}>
      <Icon
        type="material-community"
        name="camera"
        color="#7a7a7a"
        containerStyle={styles.containerIcon}
        onPress={imageSelect}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  scrollView: {
    height: "100%",
  },
  viewForm: {
    marginLeft: 10,
    marginRight: 10,
  },
  input: {
    marginBottom: 10,
  },
  textArea: {
    height: 100,
    width: "100%",
    padding: 0,
    margin: 0,
  },
  btnAddRestaurant: {
    backgroundColor: "#00a680",
    margin: 20,
  },
  viewImages: {
    flexDirection: "row",
    marginLeft: 20,
    marginRight: 20,
    marginTop: 30,
  },
  containerIcon: {
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
    height: 70,
    width: 70,
    backgroundColor: "#e3e3e3",
  },
});
