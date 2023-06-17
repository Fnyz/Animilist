import { View, ScrollView, TouchableOpacity} from 'react-native'
import React, { Component } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Swiper from 'react-native-swiper'
import axios from 'axios'
import {Text} from 'react-native-paper';
import Genres from './Genres'
import TopAnime from './TopAnime'
import RecentRelease from './RecentRelease'
import Popular from './Popular'
import TopMovies from './TopMovies'
import { MaterialIcons } from '@expo/vector-icons';
import { FAB, Portal, PaperProvider } from 'react-native-paper';




const url = "https://consumet-api-funk.onrender.com/anime/gogoanime/recent-episodes";

export class HomePage extends Component {

  state = {
    popularAnime: [],
    open:false,
    jusclick:false,
  }

  onStateChange = ({ open }) => {
    this.setState({open})
  };

  getPopular = async () => {
    try {
      const { data } = await axios.get(url, { params: { page: 1, type: 1 } });
      this.setState({ popularAnime: data.results });
  } catch (err) {
      throw new Error(err.message);
  }
  }

  

  componentDidMount(){

    this.getPopular();

  }



  render() {

    

    if(!this.state.popularAnime.length) {
      return (
        <SafeAreaView style={{
          justifyContent:'center',
          alignItems:'center',
          backgroundColor:'rgba(0, 0, 0,.8)',
          flex:1,
        }}>
          <Text style={{
            color:'white'
          }}>Welcome to Animist.</Text>
        </SafeAreaView>
      )
    } 
    return (
      <>
        <PaperProvider>
      <SafeAreaView style={{
        flex:1,
      }}>
        
   
          <View style={{
            flex:1,
            backgroundColor: 'rgba(0, 0, 0, .8)',
          }}>

     

        <View style={{
          flexDirection:'row',
          justifyContent:'center',
          alignItems:'center',
          marginVertical:30,
          gap:5,
        }}>
        <MaterialIcons name="live-tv" size={40} color="coral" style={{
          opacity:0.8
        }}/>
         <Text style={{
           fontSize:35,
           fontWeight:'bold',
           color:'white',
           opacity:0.8,
          
          }}>
            Ani<Text style={{
              color:'coral',
              textAlign:'center',
              fontWeight:'bold',
            }}>mist</Text>
          </Text>

        </View>


          <Genres navigation={this.props.navigation}/>

        

          <View style={{
            flex:1,
          }}>
          <ScrollView style={{
            height:100,
          }}>
        <View style={{
          height:330,
        }}>
        <Text style={{
          color:'white',
          fontSize:15,
          opacity:0.5,
          marginBottom:10,
          marginLeft:10,
        }}>Recent Episode</Text>

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
              }}
              />
          }
          activeDot={
            <View
            style={{
              backgroundColor: 'coral',
                width: 8,
                height: 8,
                borderRadius: 4,
                marginLeft: 3,
                marginRight: 3,
                marginTop: 3,
                marginBottom: 3,
              }}
              />
            }
            paginationStyle={{
              bottom:350,
              left: null,
              right: 70,
          }}
          loop
        >
        {this.state?.popularAnime.map((anime, i) => {
          return (
            <View key={i}>
              <RecentRelease {...anime} navigation = {this.props.navigation}/>
            </View>
          )
        })}
        </Swiper>
        </View>
        <TopAnime navigation = {this.props.navigation}/>
        <Popular navigation = {this.props.navigation}/>
        <TopMovies navigation = {this.props.navigation}/>
        </ScrollView>

        </View>
        </View> 


        <Portal>
        <FAB.Group
          open={this.state.open}
          visible
          fabStyle={{ backgroundColor: 'coral' }}
          color='white'
          backdropColor='rgba(0, 0, 0, 0.5)'
          icon= {this.state.jusclick? 'close' : 'dots-horizontal'} 
          actions={[
            { icon: 'search-web', color:'coral', backdropColor:'white', onPress: () => this.props.navigation.navigate('Search')},
          ]}
         
          onStateChange={this.onStateChange}
          onPress={() => {
            this.setState({jusclick:!this.state.jusclick})
            
          }}
         
        />
      </Portal>

    
    
      </SafeAreaView>
      </PaperProvider>
  </>
    )
  }
}

export default HomePage