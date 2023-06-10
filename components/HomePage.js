import { Dimensions, View, Image, ImageBackground, ScrollView} from 'react-native'
import React, { Component } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Swiper from 'react-native-swiper'
import axios from 'axios'
import { Avatar, Button, Card, Text} from 'react-native-paper';
const LeftContent = props => <Avatar.Icon {...props} icon="folder" />
import { Entypo } from '@expo/vector-icons';
import { Searchbar } from 'react-native-paper';
import Genres from './Genres'


export class HomePage extends Component {

  state = {
    popularAnime: [],
  }

  getPopular = async () => {  
    try {

      const popular = await axios.get('https://webdis-jthh.onrender.com/popular',{
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }
      })
      this.setState({ popularAnime:popular.data});
      
    } catch (error) {
      console.log(error)
    }
  }
  

  componentDidMount(){

    this.getPopular();

  }



  render() {

    if(!this.state.popularAnime.length) {
      return (
        <SafeAreaView>
          <Text>Fetching data please wait!</Text>
        </SafeAreaView>
      )
    } 
    return (
      <SafeAreaView style={{
        flex:1,
      }}>

          <View style={{
             flex:1,
             backgroundColor: 'rgba(0, 0, 0, .8)',
          }}>

         <Text style={{
           fontSize:35,
            textAlign:'center',
            marginVertical:20,
            paddingTop:15,
            fontWeight:'bold',
            color:'white',
            opacity:0.8,
          }}>Animist</Text>
           <View>
        <Searchbar
        elevation={1}
      placeholder="Search"
      placeholderTextColor='white'
      style={{
        marginHorizontal:15,
        marginVertical:15,
        backgroundColor:'#4b4b4b',
        opacity:0.8
      }}
      iconColor='white'
    />
     <Button icon="eye" mode="contained" style={{
      marginHorizontal:17,
      marginBottom:10,
      backgroundColor:'#e15f41',
      opacity:0.7,
      height:50,
      textAlign:'center',
      paddingTop:5,
     }} onPress={() => this.props.navigation.navigate('Genres')}>
    Choose by Genres
  </Button>
        </View>
        <ScrollView style={{
          flex:1,
        }}>
        <Text style={{
          position:'absolute',
          zIndex:1,
          top:20,
          padding:10,
          backgroundColor:'#e15f41',
          color:'white',
          borderTopRightRadius:10,
          borderBottomRightRadius:10,
          opacity:0.9,
        }}>Popular anime</Text>
        <View style={{
          height:460,
        }}>

        <Swiper
          autoplay
          dot={
            <View
              style={{
                backgroundColor: 'white',
                width: 5,
                height: 5,
                borderRadius: 4,
                marginLeft: 3,
                marginRight: 4,
                marginTop: 3,
                marginBottom: 3,
                opacity:0,
              }}
              />
          }
          activeDot={
            <View
              style={{
                backgroundColor: 'white',
                width: 8,
                height: 8,
                borderRadius: 4,
                marginLeft: 3,
                marginRight: 3,
                marginTop: 3,
                marginBottom: 3,
                opacity:0,
              }}
              />
            }
          paginationStyle={{
            bottom:40,
            left: null,
            right: 70,
          }}
          loop
        >
        {this.state?.popularAnime.map((anime, i) => {
          return (
            <Card key={i} style={{
              padding:10,
              margin:10,
              backgroundColor:'#4b4b4b',
              opacity:0.8,
            }}>
            <Card.Content>
              <View style={{
                flexDirection:'row',
              }}>
              </View>
            </Card.Content>
           
            <Card.Cover source={{ uri: anime.animeImg}} style={{
              width:'100%',
              height:undefined,
              aspectRatio:1,
            }}/>     
            <Card.Actions>
              <View style={{
                justifyContent:'center',
                alignItems:'center',
                flexDirection:'row',
                gap:5, 
           
              }}>
              <Text style={{
                fontSize:anime.animeTitle.length > 15 ? 12 : 15,
                fontWeight:'bold',
                opacity:0.7,
                color:'white'
              }}>{anime.animeTitle || anime.animeId}</Text>
              <Text style={{
                color:'coral',
                fontSize:25,
                fontWeight:'bold',
              }}>/</Text>
              <Entypo name="eye" size={24} color="black" style={{
                opacity:0.7,
                color:'white',
              }} />
              </View>
            </Card.Actions>
          </Card>
          )
        })}
        </Swiper>
       
        </View>
     
        </ScrollView>
        </View>
    
      </SafeAreaView>
    )
  }
}

export default HomePage