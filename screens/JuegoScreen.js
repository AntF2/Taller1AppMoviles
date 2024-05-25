import React, { useState, useEffect, useRef } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Tarjeta from './Tarjeta';
import { getDatabase, ref, set } from 'firebase/database';
import { db } from '../config/Config'; // Asegúrate de importar la configuración de Firebase

const cartas = [
  "❤️",
  "🎨",
  "🐶",
  "🌍",
  "🏆",
  "🎵",
  "✈️",
  "📷",
  "🏠"
];

const puntosBase = 50; // Cantidad base de puntos por par encontrado

export default function JuegoScreen() {
  const [nombreJugador, setNombreJugador] = useState('');
  const [board, setBoard] = useState(() => shuffle([...cartas, ...cartas]));
  const [selectedCartas, setSelectedCartas] = useState([]);
  const [matchedCartas, setMatchedCartas] = useState([]);
  const [score, setScore] = useState(0);
  const [tiempo, setTiempo] = useState(300); // 5 minutos en segundos
  const [juegoIniciado, setJuegoIniciado] = useState(false);
  const tiempoRef = useRef(null);

  const handleNombreChange = (text) => {
    setNombreJugador(text);
  };

  const iniciarJuego = () => {
    if (nombreJugador.trim() === '') {
      alert('Por favor ingresa tu nombre para jugar.');
      return;
    }
    setJuegoIniciado(true);
  };

  useEffect(() => {
    if (!juegoIniciado || tiempo === 0 || matchedCartas.length === board.length) {
      clearTimeout(tiempoRef.current);
      return;
    }

    tiempoRef.current = setTimeout(() => {
      setTiempo(tiempo - 1);
    }, 1000);

    return () => clearTimeout(tiempoRef.current);
  }, [tiempo, matchedCartas, juegoIniciado]);

  const handleTapTarjeta = (index) => {
    if (!juegoIniciado || selectedCartas.length >= 2 || selectedCartas.includes(index) || matchedCartas.includes(index)) return;

    setSelectedCartas([...selectedCartas, index]);
  };

  useEffect(() => {
    if (selectedCartas.length === 2) {
      const [firstIndex, secondIndex] = selectedCartas;
      if (board[firstIndex] === board[secondIndex]) {
        setMatchedCartas([...matchedCartas, firstIndex, secondIndex]);
        // Calcular la puntuación en función del tiempo restante
        const puntosGanados = Math.floor(puntosBase * (tiempo / 300)); // 300 segundos son 5 minutos
        setScore(score + puntosGanados);
        setSelectedCartas([]); // Restablecer el estado de las cartas seleccionadas
      } else {
        setTimeout(() => {
          setSelectedCartas([]);
        }, 1000); // Voltear las cartas después de 1 segundo
      }
    }
  }, [selectedCartas]);

  const reinicio = () => {
    if (nombreJugador.trim() !== '') {
      const dbRef = ref(db, 'jugadores/' + nombreJugador);
      set(dbRef, {
        nombre: nombreJugador,
        puntuacion: score
      });
    }

    setNombreJugador('');
    setMatchedCartas([]);
    setScore(0);
    setSelectedCartas([]);
    setBoard(shuffle([...cartas, ...cartas]));
    setTiempo(300); // Reiniciar el temporizador a 5 minutos
    setJuegoIniciado(false);
  };

  return (
    <View style={styles.container}>
      {!juegoIniciado ? (
        <View>
          <Text style={styles.title}>Ingresa tu nombre para jugar:</Text>
          <TextInput
            style={styles.input}
            value={nombreJugador}
            onChangeText={handleNombreChange}
            placeholder="Nombre"
          />
          <Button title='Jugar' onPress={iniciarJuego} />
        </View>
      ) : (
        <>
          <Text style={styles.title}>Bienvenido, {nombreJugador}</Text>
          <Text style={styles.title}>Puntuación: {score}</Text>
          <Text style={styles.title}>Tiempo restante: {Math.floor(tiempo / 60)}:{(tiempo % 60).toString().padStart(2, '0')}</Text>
          <View style={styles.board}>
            {board.map((tarjeta, index) => {
              const isTurnedOver = selectedCartas.includes(index) || matchedCartas.includes(index);
              return (
                <Tarjeta
                  key={index}
                  isTurnedOver={isTurnedOver}
                  onPress={() => handleTapTarjeta(index)}
                >
                  {tarjeta}
                </Tarjeta>
              );
            })}
          </View>
          {(tiempo === 0 || matchedCartas.length === board.length) && <Button title='Reiniciar' onPress={reinicio} />}
          <StatusBar style="light" />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0f172a',
  },
  title: {
    fontSize: 24,
    color: 'white',
    fontWeight: '900',
    marginBottom: 10,
  },
  input: {
    height: 40,
    width: 200,
    borderWidth: 1,
    borderColor: 'white',
    marginBottom: 10,
    color: 'white',
    paddingLeft: 10,
  },
  board: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
});

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    [array[i], array[randomIndex]] = [array[randomIndex], array[i]];
  }
  return array;
}
