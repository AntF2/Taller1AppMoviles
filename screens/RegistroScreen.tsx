import { StyleSheet, Text, TextInput, View, Button, Image, Alert } from 'react-native'
import React, { useState } from 'react'
import { getDatabase, ref, set } from 'firebase/database';
import { db } from '../config/Config';
export default function RegistroScreen() {
  const [correo, setCorreo] = useState('')
  const [nick, setNick] = useState('')
  const [password, setPassword] = useState('')
  const [edad, setEdad] = useState('')

  function guardar(correo: string, password: string, nick : string, edad : string) {
    //const db = getDatabase();
    set(ref(db, 'usuarios/' + nick), {
      correo: correo,
      nick: nick,
      edad: edad,
      password: password
    });
  function limpiar(){
    setCorreo('')
    setNick('')
    setPassword('')
    setEdad('')  
  }
    Alert.alert("Mensaje","Registro exitoso")
    limpiar()}
  return (
    <View style={styles.View}>

      <Image source={{uri:"https://w7.pngwing.com/pngs/857/213/png-transparent-man-avatar-user-business-avatar-icon.png"}} style={styles.img}/>
      <Text style={styles.Text}>Registro</Text>
      <TextInput placeholder='Ingrese un correo' style ={styles.input} placeholderTextColor={'#ffe'} keyboardType='email-address' onChangeText={(texto)=> setCorreo(texto)} value={correo}/>
      <TextInput placeholder='Ingrese un nick' style ={styles.input} placeholderTextColor={'#ffe' } onChangeText={(texto)=> setNick(texto)} value={nick}/>
      <TextInput placeholder='Ingrese una contraseña' style ={styles.input} placeholderTextColor={'#ffe'} secureTextEntry onChangeText={(texto)=> setPassword(texto)} value={password}/>
      <TextInput placeholder='Ingrese una edad' style ={styles.input} placeholderTextColor={'#ffe'} keyboardType='numeric' onChangeText={(texto)=> setEdad((texto))} value={edad.toString()}/>
      <Button title='Registrarse' onPress={() => guardar(correo, password, nick, edad)}/>

    </View>
  )
}

const styles = StyleSheet.create({
    View: {
        flex: 1,
        backgroundColor: '#hsl(199, 100%, 29%)',
        alignItems: 'center',
        justifyContent: 'center',
      },
      Text: {
        color: '#fff',
        fontSize: 20
      },
      input: {
        color: '#fff',
        height: 40,
        margin: 12,
        borderWidth: 1,
        borderRadius: 20,
        padding: 10,
        backgroundColor: '#666',
      },
      img : {
        width: 100,
        height: 100
      }
})