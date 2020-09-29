import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Button, Alert, FlatList, Dimensions } from 'react-native';
import BodyText from '../components/BodyText';
import NumberContainer from '../components/NumberContainer';
import Card from '../components/Card';
import MainButton from '../components/MainButton';
import DefaultStyles from '../constants/default-styles';
import { AntDesign } from '@expo/vector-icons';
import { render } from 'react-dom';

const generateRandomBetween = (min, max, exclude) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  const rndNum = Math.floor(Math.random() * (max - min)) + min;
  if (rndNum === exclude) {
    return generateRandomBetween(min, max, exclude);
  } else {
    return rndNum;
  }
};

const renderListItem = (listLength, itemData) => <View style={styles.listItem} >
  <BodyText># {listLength - itemData.index} has guess</BodyText>
  <BodyText>{itemData.item}</BodyText>
</View>

const GameScreen = props => {
  const initialGuess = generateRandomBetween(1, 100, props.userChoice);
  const [currentGuess, setCurrentGuess] = useState(initialGuess);
  const [pastGuesses, setPastGuesses] = useState([initialGuess.toString()]);
  const currentLow = useRef(1);
  const currentHigh = useRef(100);

  const { userChoice, onGameOver } = props;

  useEffect(() => {
    if (currentGuess === userChoice) {
      onGameOver(pastGuesses.length);
    }
  }, [currentGuess, userChoice, onGameOver])

  const nextGuessHandler = direction => {
    if (
      (direction === 'lower' && currentGuess < props.userChoice)
      || (direction === 'greater' && currentGuess > props.userChoice)) {
      Alert.alert('Don\'t lie !', 'You know that this is wrong', [
        { text: 'Sorry', style: 'cancel' }
      ]);
      return;
    }
    if (direction === 'lower') {
      currentHigh.current = currentGuess
    }
    else {
      currentLow.current = currentGuess + 1;
    }
    const nextNumber = generateRandomBetween(currentLow.current, currentHigh.current, currentGuess);
    setCurrentGuess(nextNumber);
    // setRounds(curRounds => curRounds + 1);
    setPastGuesses(curPastGuesses => [nextNumber.toString(), ...curPastGuesses])
  };

  let listContainerStyle = styles.listContainer ;

  if(Dimensions.get('window').width < 350){
    listContainerStyle = styles.listContainerBig
  }


  return (
    <View style={styles.screen}>
      <Text style={DefaultStyles.title}>Opponent's Guess</Text>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card style={styles.buttonContainer}>
        <MainButton onPress={nextGuessHandler.bind(this, 'lower')}  >
          
          <AntDesign name="arrowdown" size={24} color="white" />
        </MainButton>
        <MainButton onPress={nextGuessHandler.bind(this, 'greater')}  >
          
          <AntDesign name="arrowup" size={24} color="white" />
        </MainButton>
      </Card>
      <View style={listContainerStyle}>
        {/* <ScrollView contentContainerStyle={styles.list}>
          {pastGuesses.map((item, index) => renderListItem(item, pastGuesses.length - index))}
        </ScrollView> */}
        <FlatList
          contentContainerStyle={styles.list}
          keyExtractor={(itemData) => itemData} 
          data={pastGuesses}
          renderItem={renderListItem.bind(this, pastGuesses.length)} />

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: 'center'
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: Dimensions.get('window').height > 600 ? 20 : 10 ,
    width: 400,
    maxWidth: '90%'
  },
  listItem: {
    borderColor: 'lightgrey',
    padding: 15,
    marginVertical: 10,
    backgroundColor: 'white',
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderRadius: 5,
    width:'70%'
  },
  listContainer: {
    
    flex: 1,
    width: '60%'
    
  },
  listContainerBig: {
    
    flex: 1,
    width:  '80%'
    
  },
  list: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'flex-end'

  },
  
});

export default GameScreen;
