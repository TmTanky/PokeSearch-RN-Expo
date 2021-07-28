import React, { useEffect, useState } from "react";
import { View, Text, Button, StyleSheet, Image, TextInput, Alert, ActivityIndicator, ToastAndroid, Keyboard, ScrollView, TouchableOpacity } from 'react-native'
import axios from 'axios'
import { MaterialIcons } from '@expo/vector-icons';

const HomeScreen = () => {

    const [defaultPokemon, setDefaultPokemon] = useState('pikachu')
    const [name, setName] = useState<string>()
    const [imgUrl, setImgUrl] = useState<string>()
    const [userInput, setUserInput] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(false)
    const [stats, setStats] = useState({
        hp: "",
        atk: "",
        def: "",
        spAtk: "",
        spDef: "",
        spd: ""
    })
    
    useEffect(() => {

        setIsLoading(true)
        setIsError(false)

        const fetchPokemon = async () => {
            const {data} = await axios.get(`https://pokeapi.co/api/v2/pokemon/${defaultPokemon}`)
            const pokemonName = data.forms[0].name
            const {data: img} = await axios.get(data.forms[0].url)
            const pokemonImage = img.sprites.front_default
            const pokemonStats = data.stats
            
            setStats({
                hp: pokemonStats[0].base_stat,
                atk: pokemonStats[1].base_stat,
                def: pokemonStats[2].base_stat,
                spAtk: pokemonStats[3].base_stat,
                spDef: pokemonStats[4].base_stat,
                spd: pokemonStats[5].base_stat
            })
            setName(pokemonName)
            setImgUrl(pokemonImage)
            setIsLoading(false)
        }

        fetchPokemon()

    }, [isError])

    const showToast = () => {
        ToastAndroid.showWithGravity('Error please try again.', ToastAndroid.SHORT, ToastAndroid.BOTTOM)
    }

    const searchSubmit = async () => {
        
        if (!userInput) {
            return Alert.alert('Input must be a valid.', 'Please try again.', [
                {
                    text: 'Ok'
                }
            ])
        }

        setIsLoading(true)
        Keyboard.dismiss()

        try {

            const {data} = await axios.get(`https://pokeapi.co/api/v2/pokemon/${userInput.toLocaleLowerCase()}`)
            const pokemonName = data.forms[0].name
            const {data: img} = await axios.get(data.forms[0].url)
            const pokemonImage = img.sprites.front_default
            const pokemonStats = data.stats
            
            setStats({
                hp: pokemonStats[0].base_stat,
                atk: pokemonStats[1].base_stat,
                def: pokemonStats[2].base_stat,
                spAtk: pokemonStats[3].base_stat,
                spDef: pokemonStats[4].base_stat,
                spd: pokemonStats[5].base_stat
            })
            setName(pokemonName)
            setImgUrl(pokemonImage)
            setIsLoading(false)
            
        } catch (error) {
            setUserInput("")
            Keyboard.dismiss()
            showToast()
            setDefaultPokemon('pikachu')
            setIsError(true)
        }

    }

    return (
        <ScrollView style={styles.root}>

            <View style={styles.searchbar}>
                <TextInput placeholder="Enter Pokemon Name" onChangeText={setUserInput} value={userInput} style={styles.search} />
                {/* <Button title="Search" color="#0a369d" onPress={searchSubmit} /> */}
                <TouchableOpacity onPress={searchSubmit} style={styles.searchbtn}>
                    <MaterialIcons name="search" size={24} color="white" />
                </TouchableOpacity>
            </View>
            
            <View style={styles.pokemontitle} >
                <Text style={styles.title} > {name} </Text>
            </View>

            <View style={styles.imgcontainer}>
                <View style={styles.imgbox}>
                { isLoading ? <ActivityIndicator size="large" color="#0a369d" /> : <Image style={styles.img} source={{uri: imgUrl}} /> }
                </View>
            </View>

            <View style={styles.statsbox}>
                <View style={styles.stat}>
                    <View style={styles.info}>
                        <Text style={{fontFamily: 'MonsReg'}}> HP: {stats.hp} </Text>
                    </View>
                    <View style={styles.info}>
                        <Text style={{fontFamily: 'MonsReg'}}> ATK: {stats.atk} </Text>
                    </View>
                </View>

                <View style={styles.stat}>
                    <View style={styles.info}>
                        <Text style={{fontFamily: 'MonsReg'}}> DEF: {stats.def} </Text>
                    </View>
                    <View style={styles.info}>
                        <Text style={{fontFamily: 'MonsReg'}}> SP-ATK: {stats.spAtk} </Text>
                    </View>
                </View>

                <View style={styles.stat}>
                    <View style={styles.info}>
                        <Text style={{fontFamily: 'MonsReg'}}> SP-DEF: {stats.spDef} </Text>
                    </View>
                    <View style={styles.info}>
                        <Text style={{fontFamily: 'MonsReg'}}> SPD: {stats.spd} </Text>
                    </View>
                </View>
 
            </View>

        </ScrollView>
    )

}

export default HomeScreen

const styles = StyleSheet.create({
    root: {
        flex: 1,
        // backgroundColor: '#CFDEE7'
        // backgroundColor: 'red',
        // alignItems: 'center'
    },
    searchbar: {
        flexDirection: 'row',
        // backgroundColor: 'red',
        width: '100%',
        justifyContent: 'space-evenly',
        padding: 20,
    },
    search: {
        borderColor: 'black',
        borderWidth: 1,
        paddingHorizontal: 15,
        width: '80%',
        height: 40,
        borderRadius: 25,
        fontFamily: 'MonsReg'
    },
    searchbtn: {
        backgroundColor: "#0a369d",
        justifyContent: 'center',
        alignItems: 'center',
        width: '15%',
        borderRadius: 25,
    },
    pokemontitle: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 50
    },
    title: {
        fontSize: 40,
        textTransform: 'uppercase',
        fontFamily: 'MonsBold',
        letterSpacing: 3
    },
    imgcontainer: {
        // backgroundColor: 'blue',
        justifyContent: 'center',
        alignItems: 'center'
    },
    imgbox: {
        height: 300,
        width: 300,
        justifyContent: 'center',
        alignItems: 'center'
    },
    img: {
        height: '100%',
        width: '100%',
    },
    statsbox: {
        // backgroundColor: '#CFDEE7',
        borderRadius: 15,
        flexDirection: 'column',
        margin: 15
        // justifyContent: 'center'
    },
    stat: {
        // backgroundColor: 'yellow',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        flexDirection: 'row',
        // flex: 1
    },
    info: {
        backgroundColor: '#CFDEE7',
        marginVertical: 5,
        alignItems: 'center',
        justifyContent: 'center',
        // padding: 10,
        width: '40%',
        height: 40,
        borderRadius: 3,
        textAlign: 'center',
        elevation: 1
    }
})