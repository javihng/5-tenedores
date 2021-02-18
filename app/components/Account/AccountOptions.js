import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { ListItem } from "react-native-elements";
import { map } from "lodash";
import Modal from "../Modal";
import ChangeDisplayNameForm from "./ChangeDisplayNameForm";
import ChangeEmailForm from "./ChangeEmailForm";
import ChangePasswordForm from "./ChangePasswordForm";

export default function AccountOptions(props) {
  const { userInfo, toastRef, setReloadUserInfo } = props;
  const [showModal, setShowModal] = useState(false);
  const [renderComponent, setRenderComponent] = useState(null);

  const SelectedComponent = (key) => {
    switch (key) {
      case "displayName":
        setRenderComponent(
          <ChangeDisplayNameForm
            displayName={userInfo.displayName}
            setShowModal={setShowModal}
            toastRef={toastRef}
            setReloadUserInfo={setReloadUserInfo}
          />
        );
        setShowModal(true);
        break;
      case "email":
        setRenderComponent(
          <ChangeEmailForm
            email={userInfo.email}
            setShowModal={setShowModal}
            toastRef={toastRef}
            setReloadUserInfo={setReloadUserInfo}
          />
        );
        setShowModal(true);
        break;
      case "password":
        setRenderComponent(
          <ChangePasswordForm
            // password={userInfo.password}
            setShowModal={setShowModal}
            toastRef={toastRef}
            // setReloadUserInfo={setReloadUserInfo}
          />
        );
        setShowModal(true);
        break;
      default:
        setRenderComponent(null);
        setShowModal(false);
        break;
    }
  };

  const menuOptions = generateOptions(SelectedComponent);
  return (
    <View>
      {map(menuOptions, (menu, index) => (
        <ListItem
          key={index}
          title={menu.title}
          leftIcon={{
            type: menu.iconType,
            name: menu.iconNameLeft,
            color: menu.iconColorleft,
          }}
          rightIcon={{
            type: menu.iconType,
            name: menu.iconNameRight,
            color: menu.iconColorRight,
          }}
          containerStyle={styles.menuItem}
          onPress={menu.onPress}
        />
      ))}

      {renderComponent && (
        <Modal isVisible={showModal} setIsVisible={setShowModal}>
          {renderComponent}
        </Modal>
      )}
    </View>
  );
}

function generateOptions(SelectedComponent) {
  return [
    {
      title: "Cambiar nombre y apellido",
      iconType: "material-community",
      iconNameLeft: "account-circle",
      iconColorleft: "#ccc",
      iconNameRight: "chevron-right",
      iconColorRight: "#00a680",
      onPress: () => SelectedComponent("displayName"),
    },
    {
      title: "Cambiar email",
      iconType: "material-community",
      iconNameLeft: "at",
      iconColorleft: "#ccc",
      iconNameRight: "chevron-right",
      iconColorRight: "#00a680",
      onPress: () => SelectedComponent("email"),
    },
    {
      title: "Cambiar Contraseña",
      iconType: "material-community",
      iconNameLeft: "lock-reset",
      iconColorleft: "#ccc",
      iconNameRight: "chevron-right",
      iconColorRight: "#00a680",
      onPress: () => SelectedComponent("password"),
    },
  ];
}

const styles = StyleSheet.create({
  menuItem: {
    borderBottomWidth: 1,
    borderBottomColor: "#e3e3e3",
  },
});
