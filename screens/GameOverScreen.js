import React from 'react'
import { Button, StyleSheet, View, Image, Text } from 'react-native'
import Colors from '../constants/colors';
import BodyText from '../components/BodyText';
import TitleText from '../components/TitleText';
import MainButton from '../components/MainButton';


const GameOverScreen = (props) => {
    return (
        <View style={styles.screen}>
            <TitleText>The Game is Over</TitleText>
            <View style={styles.imageContainer}>
                <Image
                    fadeDuration={1000}
                    style={styles.image}
                    source={require('../assets/success.png')}
                    // source={{ uri: 'https://img.freepik.com/free-vector/success-vector-illustration_1893-2234.jpg?size=626&ext=jpg' }}
                    resizeMode="contain" />
            </View>
            <View style={styles.resultContainer}>
                <BodyText style={styles.endMessage}>Your phone needed <Text style={styles.highlight}>{props.roundsNumber}</Text> rounds to guess the correct number which was <Text style={styles.highlight}>{props.userNumber}</Text> </BodyText>
            </View>
            <MainButton onPress={props.onRestart} > New Game </MainButton> 

        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        width: '100%',
        height: '100%'
    },
    imageContainer: {
        width: 300,
        height: 300,
        alignItems: 'center',
        borderColor: 'lightgrey',
        borderWidth: 1,
        borderRadius: 20,
        marginVertical: 15,
        overflow: 'hidden'
    },
    highlight: {
        color: Colors.primary,
        fontFamily:'product-sans-bold'
    },
    resultContainer: {
       marginHorizontal:20
    },
    endMessage: {
        marginVertical: 10,
        textAlign: 'center'
    }
});

export default GameOverScreen;
