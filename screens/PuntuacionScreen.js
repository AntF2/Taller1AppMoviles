import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { db } from '../config/Config'; 
import { ref, get, orderByChild, limitToLast, query } from 'firebase/database'; 
export default function ListaPuntajesScreen() {
  const [puntajes, setPuntajes] = useState([]);

  useEffect(() => {
    const dbRef = ref(db, 'jugadores');
    const queryRef = query(dbRef, orderByChild('puntuacion'), limitToLast(10)); 
    get(queryRef).then((snapshot) => {
      if (snapshot.exists()) {
        const puntajesArray = [];
        snapshot.forEach((childSnapshot) => {
          const childData = childSnapshot.val();
          puntajesArray.push(childData);
        });
        setPuntajes(puntajesArray);
      }
    }).catch((error) => {
      console.error("Error al recuperar los puntajes: ", error);
    });
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mejores Puntajes</Text>
      <FlatList
        data={puntajes}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.nombre}>{item.nombre}</Text>
            <Text style={styles.puntuacion}>{item.puntuacion}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  nombre: {
    fontSize: 18,
  },
  puntuacion: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
