import React from 'react';
import Constants from 'expo-constants';
import { Feather as Icon } from '@expo/vector-icons';
import Emoji from 'react-native-emoji';
import { useNavigation } from '@react-navigation/native';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useEffect } from 'react';
import api from "../../services/api";
import { useState } from 'react';

const Points = () => {
    const navigate = useNavigation();

    function handleNavigationBack() {
      navigate.goBack();
    }

    const [weather, setWeather] = useState(null);
    const [temperature, setTemperature] = useState(null);

    useEffect(() => {
      api.get('/clima-tempo').then((responseData) => {
        setWeather(responseData.data.data.text);
      }).catch((err) => {
        console.log(err);
        navigate.goBack();
      });

      api.get('/temperature').then((responseData) => {
        setTemperature(responseData.data.data.temp);
        console.log(responseData.data)
      }).catch((err) => {
        console.log(err);
        navigate.goBack();
      });
    }, [])

    return (
        <>
            <View style={styles.container}>
                <TouchableOpacity onPress={handleNavigationBack}>
                  <Icon name="arrow-left" size={20} color="#34cb79" />
                </TouchableOpacity>

                <Text style={styles.title}>
                  <Emoji name="grin" />
                  Bem vindo.
                </Text>
                <Text style={styles.description}>Visualize abaixo um resumo sobre o clima hoje.</Text>
                {weather &&
                  <Text style={styles.title}>
                    {weather}
                  </Text>
                }
            </View>
            {temperature &&
              <View style={styles.itemsContainer}>
                  <ScrollView horizontal>
                      <TouchableOpacity style={styles.item} onPress={() => {}}>
                          <Text style={styles.itemTitle}>{temperature} C</Text>
                      </TouchableOpacity>
                  </ScrollView>
              </View>
            }
        </>
    );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: 32,
      paddingTop: 20 + Constants.statusBarHeight,
    },
  
    title: {
      fontSize: 20,
      fontFamily: 'Ubuntu_700Bold',
      marginTop: 24
    },

    emojiTitle: {
        marginRight: 24
    },
  
    description: {
      color: '#6C6C80',
      fontSize: 16,
      marginTop: 4,
      fontFamily: 'Roboto_400Regular',
    },
  
    mapContainer: {
      flex: 1,
      width: '100%',
      borderRadius: 10,
      overflow: 'hidden',
      marginTop: 16,
    },
  
    map: {
      width: '100%',
      height: '100%',
    },
  
    mapMarker: {
      width: 90,
      height: 80, 
    },
  
    mapMarkerContainer: {
      width: 90,
      height: 70,
      backgroundColor: '#34CB79',
      flexDirection: 'column',
      borderRadius: 8,
      overflow: 'hidden',
      alignItems: 'center'
    },
  
    mapMarkerImage: {
      width: 90,
      height: 45,
      resizeMode: 'cover',
    },
  
    mapMarkerTitle: {
      flex: 1,
      fontFamily: 'Roboto_400Regular',
      color: '#FFF',
      fontSize: 13,
      lineHeight: 23,
    },
  
    itemsContainer: {
      flexDirection: 'row',
      marginTop: 16,
      marginBottom: 32,
    },
  
    item: {
      backgroundColor: '#fff',
      borderWidth: 2,
      borderColor: '#eee',
      height: 120,
      width: 120,
      borderRadius: 8,
      paddingHorizontal: 16,
      paddingTop: 20,
      paddingBottom: 16,
      marginRight: 8,
      alignItems: 'center',
      justifyContent: 'space-between',
  
      textAlign: 'center',
    },
  
    selectedItem: {
      borderColor: '#34CB79',
      borderWidth: 2,
    },
  
    itemTitle: {
      fontFamily: 'Roboto_400Regular',
      textAlign: 'center',
      fontSize: 13,
    },
});

export default Points;