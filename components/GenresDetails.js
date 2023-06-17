import { Text, View,FlatList, TouchableOpacity, ImageBackground, Dimensions } from 'react-native'
import React, { Component } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import axios from 'axios'
import { AntDesign } from '@expo/vector-icons';
import ListAnime from './listAnime'
const width = (Dimensions.get('window').width - 4 * 10) / 2;
import { Constants } from 'expo';

export class GenresDetails extends Component {

   state = {
    data: [],
    selected:null
   }


    getAllDetailsGenre = async () => {
      const gn = this.props.route.params.genres.trim().toLowerCase();
      const genre = await axios.get(`https://webdis-jthh.onrender.com/genre/${gn}`,{
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }
      })
     
      this.setState({
        data: genre.data
      })
      
    }


  componentDidMount(){
    this.getAllDetailsGenre();

  }
  handleDetails = (image, id) => {
    this.setState({
      selected: image
     })
     this.props.navigation.navigate('AnimeDetail', {
      animeId:id,
   
    })
  }

  

  render() {

    if(!this.state.data.length){
      return (
        <SafeAreaView style={{
          flex:1,
          justifyContent:'center',
          alignItems:'center',
          backgroundColor: 'rgba(0, 0, 0, .8)',
        }}>
          <View>
            <Text style={{
              color:'white',
            }}>loading please wait!</Text>
          </View>
        </SafeAreaView>
      )
    }
    return (
      <SafeAreaView style={{
        flex:1,
      }}>
        <ImageBackground source={{uri:this.state.selected}} style={{
          marginBottom:100,
       
        }
        }>

        <View style={{
          marginBottom:20,
          backgroundColor: 'rgba(0, 0, 0, .8)',
         
        }}>
          <View style={{
            flexDirection:'row',
            justifyContent:'space-between',
            alignItems:'center',
            marginTop:20,
            marginHorizontal:20,
            marginBottom:10,
         
          }}>

          <View style={{
            flexDirection:'row',
            justifyContent:'center',
            alignItems:'center',
            gap:5,
          }}>
          <Text style={{
           color:'white',
           fontSize:25,
           fontWeight:'bold'
          }}>Ani<Text style={{
            color:'coral'
          }}>mist</Text></Text>
          <Text style={{
            fontSize:25,
            color:'white',
          }}>/</Text>
          <Text style={{

            fontSize:25,
            fontWeight:'bold',
            color:'white',
            opacity:0.8,
            marginBottom:15,
            marginTop:15,
            
          }}>{this.props.route.params.genres}.</Text>

          </View>
          
          <TouchableOpacity onPress={()=> this.props.navigation.goBack()}>
        <AntDesign name="back" size={24} color="white" style={{
            opacity:0.7,
            fontWeight:'bold'
        }} />

        </TouchableOpacity>
          </View>
           
          {!this.state.data.length ? (
            <View style={{
              flex:1,
              justifyContent:'center',
                            alignItems:'center',
            }}>
               <Text style={{
              textAlign:'center',
            }}>
              Fetching anime data!
            </Text>
            </View>
           
          ):
          <View style={{
           
          }}>
          <FlatList data={this.state.data}
          renderItem={({item}) => (
           <TouchableOpacity onPress={()=> this.handleDetails(item.animeImg, item.animeId)} style={{
 
            margin:5,
            width:width,
                      
                    
           }}>
             <ListAnime {...item}/>
           </TouchableOpacity>
          )}
          numColumns={2}
          keyExtractor={item => item.animeId}
          contentContainerStyle={{
            justifyContent: 'space-between',
            alignItems:'center',
            gap:5,
      
          }}
          style={{
            marginBottom:70,
          }}
          columnWrapperStyle={{
            flexShrink:1,
          }}
       
          />
          </View>
          }
        </View>
        </ImageBackground>
      </SafeAreaView>
    )
  }
}

export default GenresDetails