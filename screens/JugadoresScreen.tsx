import { StyleSheet, Text, View, Button, FlatList, TextInput, } from 'react-native'
import React, { useState } from 'react'
import { onValue, ref, remove, update } from 'firebase/database'
import { db } from '../config/Config';

export default function JugadoresScreen() {
    const [lista, setlista] = useState([]);
    const [nick, setnick] = useState("");
    const [correo, setcorreo] = useState("");
    const [password, setpassword] = useState("");
    const [edad, setedad] = useState("");

    function leer() {
        const startCountRef = ref(db, 'usuarios/');
        onValue(startCountRef, (snapshot) => {
            const data = snapshot.val();
            console.log(data);
            let dataArray: any = Object.keys(data).map(key => ({
                key, ...data[key]
            }))
            setlista(dataArray)
            console.log(lista);
        }
        )
    }

    function actualizar(id: any) {
        update(ref(db, 'usuarios/' + id), {
            nick: nick,
            correo: correo,
            password: password,
            edad: edad
        })
    }

    function eliminar() {
        remove(ref(db, 'usuarios/' + nick))
    }

    type Usuario = {
        nick: string,
        correo: string
    }
    return (
        <View>
            <Text>JugadoresScreen</Text>
            <Button title='Cargar' onPress={() => leer()} />

            <TextInput
                placeholder='nick'
                onChangeText={(texto) => setnick(texto)} />
            <TextInput
                placeholder='correo'
                onChangeText={(texto) => setcorreo(texto)} />
            <TextInput
                placeholder='password'
                onChangeText={(texto) => setpassword(texto)} />
            <TextInput
                placeholder='edad'
                onChangeText={(texto) => setedad(texto)} />

            <Button title='editar' color={'green'} onPress={() => actualizar(nick)} />
            <TextInput
                placeholder='ingrese el nick para eliminar'
                onChangeText={(texto) => setnick(texto)} />
            <Button title='eliminar' color={'red'} onPress={() => eliminar()} />


            <FlatList
                data={lista}
                renderItem={({ item }: { item: Usuario }) => (
                    <View>
                        <Text>Nick: {item.nick}</Text>
                        <Text>Email:{item.correo}</Text>
                    </View>
                )}
            />
        </View>

    )
}

const styles = StyleSheet.create({})