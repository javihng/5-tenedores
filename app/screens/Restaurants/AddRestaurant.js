import React, { useState, useRef, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { Icon, Button } from "react-native-elements";
import Toast from "react-native-easy-toast";
import Loading from "../../components/Loading";
import AddRestaurantForm from "../../components/Restaurants/AddRestaurantForm";

export default function AddRestaurant(props) {
  const { navigation } = props;
  const [isLoading, setIsLoading] = useState(false);
  const toastRef = useRef();

  return (
    <View>
      {/* al importar el componente y utilizar la etiqueta con el nombre 
      del componente invoco el componente */}
      <AddRestaurantForm
        toastRef={toastRef}
        setIsLoading={setIsLoading}
        navigation={navigation}
      />
      <Toast ref={toastRef} position="center" opacity={0.9} />
      <Loading isVisible={isLoading} text="creando restaurante" />
    </View>
  );
}

const styles = StyleSheet.create({});
