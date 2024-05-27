import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { getDatabase, ref, onValue } from 'firebase/database';
import { db } from '../config/Config';

export default function PuntuacionScreen() {
  const [puntuaciones, setPuntuaciones] = useState([]);

  useEffect(() => {
    const dbRef = ref(db, 'jugadores');
    onValue(dbRef, (snapshot) => {
      const data = snapshot.val();
      const listaPuntuaciones = data ? Object.values(data) : [];
      listaPuntuaciones.sort((a, b) => b.puntuacion - a.puntuacion); 
      setPuntuaciones(listaPuntuaciones);
    });
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mejores Puntuaciones</Text>
      <FlatList
        data={puntuaciones}
        keyExtractor={(item) => item.nombre}
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
    backgroundColor: '#0f172a',
    paddingTop: 20,
  },
  title: {
    fontSize: 28,
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#1e293b',
    padding: 15,
    marginVertical: 8,
    width: '90%',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  nombre: {
    fontSize: 20,
    color: '#f8fafc',
    fontWeight: '600',
  },
  puntuacion: {
    fontSize: 20,
    color: '#f8fafc',
    fontWeight: '600',
  },
});

