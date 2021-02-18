import React, {useState} from "react";
import {StyleSheet, View} from "react-native";
import {Input, Icon, Button} from "react-native-elements";
import Loading from "../Loading";
import {validateEmail} from "../../utils/validations";
import {size, isEmpty} from "lodash";
import * as firebase from "firebase";
import {useNavigation} from "@react-navigation/native"


export default function RegisterForm (props) {
    const {toastRef}= props;
    const [showPassword, setShowPassword] = useState(false);
    const [showRepeatPassword, setShowRepeatPassword] = useState(false);
    // guardar datos en base de datos
    const [formData, setFormData] = useState(defaultFormValue());
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();
    
    const onSubmit = () =>{
        if (
            isEmpty(formData.email) ||
            isEmpty(formData.password) ||
            isEmpty(formData.repeatPassword)
        ){            
            toastRef.current.show("Todos los campos son obligatorios");
        } else if (!validateEmail (formData.email)) {  
            toastRef.current.show("no es un email correcto");
        } else if (formData.password !== formData.repeatPassword) {
            toastRef.current.show("las contraseñas deben coincidir");
        }else if (size(formData.password)<6) {
            toastRef.current.show("la contraseña debe tener minimo 6 caracteres");
        } else {
            setLoading(true);
            firebase
                .auth()
                .createUserWithEmailAndPassword(formData.email, formData.password)
                .then((response) =>{
                    setLoading(false);
                    navigation.navigate("account");
                })
                .catch((err) =>{
                    setLoading(false);
                    toastRef.current.show("el email ya está siendo utilizado");
                });
        }
    };

    const onChange = (e, type) =>{
        // console.log(e.nativeEvent.text);
        setFormData({...formData, [type]: e.nativeEvent.text});
    };


    return (
        <View style ={styles.formContainer}>
            <Input 
                placeholder="Correo electrónico"
                containerSyle={styles.inputForm}
                onChange={(e) => onChange(e, "email")}
                rightIcon={
                    <Icon 
                        type="material-community"
                        name="at"
                        iconStyle={styles.iconRight}
                    />
                }
            />
            <Input 
                placeholder="Contraseña"
                containerStyle={styles.inputForm}
                password = {true}
                secureTextEntry={showPassword ? false : true}
                onChange={(e) => onChange(e, "password")}
                rightIcon={
                    <Icon 
                        type="material-community"
                        name={showPassword ? "eye-off-outline" : "eye-outline"}
                        iconStyle={styles.iconRight}
                        onPress={() => setShowPassword(!showPassword)}
                    />
                }
            />
            <Input 
                placeholder="Repetir Contraseña"
                containerStyle={styles.inputForm}
                password = {true}
                secureTextEntry={true}
                secureTextEntry={showRepeatPassword ? false : true}
                onChange={(e) => onChange(e, "repeatPassword")}
                rightIcon={
                    <Icon 
                        type="material-community"
                        name={showRepeatPassword ? "eye-off-outline" : "eye-outline"}
                        iconStyle={styles.iconRight}
                        onPress={() => setShowRepeatPassword(!showRepeatPassword)}
                    />
                }
            />
            <Button 
                title="Unirse"
                containerStyle={styles.btnContainerRegister}
                buttonStyle={styles.btnRegister}
                onPress={onSubmit}
            />
            <Loading isVisible={loading} text="Creando Cuenta" />
        </View>
    );
}

function defaultFormValue() {
    return {
        email: "",
        password: "",
        repeatPassword: "",
    };
}

const styles = StyleSheet.create({
    formContainer:{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 30,
    },
    inputForm:{
        width: "100%",
        marginTop: 20,
    },
    btnContainerRegister:{
        marginTop:20,
        width:"95%",
    },
    btnRegister: {
        backgroundColor: "#00a680",
    },
    iconRight:{
        color: "#c1c1c1",
    },
});