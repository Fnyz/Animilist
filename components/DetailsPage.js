import { Text, View, TouchableOpacity, ScrollView, Image} from 'react-native'
import React, { Component } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from 'axios';
import { AntDesign } from '@expo/vector-icons';


export class DetailsPage extends Component {
  state = {
    singleAnime: {},
    episodesDetails:false,
  }
  handleEpisode =(epData, animeTitle, subOrDub,) => {
  
    this.props.navigation.navigate('Episodes',{
      epData,
      title:animeTitle,
      subOrDub
    });
  }
  getSingleAnime = async () => {
    try {
      const title = this.props.route.params.animeId;
      console.log(title);
      const url = `https://consumet-api-funk.onrender.com/anime/gogoanime/info/${title}`;
      const { data } = await axios.get(url);
      this.setState({
              singleAnime: data,
      });
  } catch (err) {
      throw new Error(err.message);
  }
  }
  
 componentDidMount() {

  this.getSingleAnime();
    
 }
  render() {

    const {title, type, releaseDate, status, genres, description, image, subOrDub, episodes, otherName} = this.state.singleAnime;
    
    return (
      <SafeAreaView style={{
        backgroundColor: 'rgba(0, 0, 0, .8)',
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        paddingTop:20,
      }}>
  
        
            
        {!image ? (
          <View>
            <Text style={{
              color:'white',
            }}>Please wait!</Text>
          </View>
        ): (
          
          <ScrollView style={{
            padding:15,
          }}>

            <Image source={{uri:image}} style={{
              width:'100%',
              height:undefined,
              aspectRatio:1,
              opacity:0.9,
              borderRadius:5,
            }}/>
         
         <Text style={{
          marginTop:10,
          color:'coral',
          fontSize:17
         }}>{title}.</Text>

         <Text style={{marginTop:10, opacity:0.5, color:'white'}}>Other name: </Text>
         <Text style={{
          marginTop:2,
          color:'white',
          fontSize:12,
          opacity:0.9,
         }}>{otherName}.</Text>

         <View style={{
          flexDirection:'row',
          marginTop:10,
         }}>

         <Text style={{ opacity:0.5, color:'white'}}>Type: </Text>
         <Text style={{
          marginTop:2,
          color:'white',
          fontSize:12,
          opacity:0.9,
         }}>{type}.</Text>

         </View>
        
         <View style={{
          flexDirection:'row',
          marginTop:10,
          alignItems:'center',
         }}>

         <Text style={{opacity:0.5, color:'white'}}>Genre: </Text>
         <Text style={{
           marginTop:2,
           color:'white',
           fontSize:13,
           opacity:0.9,
          }}>{genres.join(', ')}.</Text>
          </View>

         
         <View style={{
          flexDirection:'row',
                    marginTop:10,
                    alignItems:'center',
         }}>

         <Text style={{ opacity:0.5, color:'white'}}>Released: </Text>
         <Text style={{
          marginTop:2,
          color:'white',
          fontSize:12,
          opacity:0.9,
         }}>{releaseDate}.</Text>

         </View>
        
        <View style={{
          flexDirection:'row',
                    marginTop:10,
                    alignItems:'center',
 
        }}>

        <Text style={{opacity:0.5, color:'white'}}>Status: </Text>
         <Text style={{
          marginTop:2,
          color:'white',
          fontSize:12,
          opacity:0.9,
         }}>{status}.</Text>

        </View>
        

         
        <Text style={{marginTop:10, opacity:0.5, color:'white'}}>Plot Summary: </Text>
         <Text style={{
          marginTop:2,
          color:'white',
          fontSize:13,
          opacity:0.9,
         }}>{description}.</Text>

         <View style={{
          marginTop:30,
          marginBottom:50,
          flexDirection:'row',
          alignItems:'center',
          justifyContent:'center',
          gap:10,
         }}>
          <TouchableOpacity onPress={()=>this.handleEpisode(episodes, title, subOrDub)}>


         
          <View style={{
            borderWidth:1,
            padding:10,
            width:150,
            justifyContent:'center',
            alignItems:'center',
            backgroundColor:'coral',
            borderTopLeftRadius:15,
            borderBottomLeftRadius:15,
          }}>
            <Text style={{
              color:'white',
              fontSize:15,
              fontWeight:'bold',
             
            }}>See episode{episodes.length > 1 ? 's': ''}</Text>
          </View>

          </TouchableOpacity>


          <TouchableOpacity onPress={()=> this.props.navigation.goBack()}>

          <View style={{
            borderWidth:1,
            padding:8,
            width:150,
            justifyContent:'center',
            alignItems:'center',
            borderColor:'coral',
            borderTopRightRadius:15,
            borderBottomRightRadius:15,
           
          }}>
            <Text style={{
              color:'white',
              fontSize:15,
              fontWeight:'bold',
             
            }}><AntDesign name="back" size={24} color="coral" /></Text>
          </View>
          </TouchableOpacity>
         </View>

        </ScrollView>
        )} 
     
      </SafeAreaView>
    )
  }
}

export default DetailsPage