import { Text, View, Image } from 'react-native'
import React, { Component } from 'react'
import axios from 'axios';


export class TopAnimeInfo extends Component {

    state = {
        animeData: {}
    }

    
    data = async () => {
        try {

            const url = `https://consumet-api-funk.onrender.com/anime/gogoanime/info/${this.props.id}`;
            const { data } = await axios.get(url);
            let newData = {
                id: data.id,
                title: data.title,
                image: data.image,
                subOrdub: data.subOrDub,
                tEpisodes: data.totalEpisodes,
            }
            this.setState({
                animeData: newData
            })
        } catch (err) {
            throw new Error(err.message);
        }
    };
  
  componentDidMount(){

    this.data();

  }
  
  render() {

    const  {title, image, subOrdub, tEpisodes} = this.state.animeData;

    if (!this.state.animeData) {

        <View>
            <Text>Please wait fetching top animes.</Text>
        </View>

    }

    
    
    return (
      <View>
        
        <View style={{
           width: 200, height: 200, margin:10,
           position:'relative',
          
        }}>
        <View style={{

            position:'absolute',
            width:'100%',
            zIndex:1,
            height:'100%',
            justifyContent:'space-between'
        }}>
            <Text style={{
                color:'black',
                backgroundColor:'white',
                width:25,
                padding:2,
                textAlign:'center',
                borderBottomRightRadius:5,
                fontWeight:'bold',
                borderTopLeftRadius:5,
                opacity:0.9
            }}>HD</Text>

            <View style={{
                flexDirection:'row',
                justifyContent:'space-between',
                         
            }}>
            <View style={{
                backgroundColor:'coral',
                width:60,
                padding:3,
                borderBottomLeftRadius:5,
                borderTopRightRadius:5,
                opacity:0.9
            }}>
            <Text style={{
                color:'white',
                fontWeight:'bold',
                textAlign:'center'
            }}>EP 1/{tEpisodes}</Text>
            </View>
            <View style={{
               backgroundColor:'white',
               paddingHorizontal:7,
               justifyContent:'center',
               borderBottomRightRadius:5,
               opacity:0.8
            }}>
                <Text style={{
                    textTransform:'capitalize',
                    fontWeight:'bold'
                }}>{subOrdub}</Text>
            </View>
            </View>
       
           
        </View>
        <Image source={{ uri: image }} style={{ width: 200, height: 200, resizeMode:'cover',borderRadius:5, }} />
        </View>
        <View style={{width:150, flexDirection:'row', alignSelf:'center'}}> 
          <Text style={{flex: 1, flexWrap: 'wrap', color:'white', textAlign:'center',fontWeight:'bold', opacity:0.7}}> {title}
          </Text>
        </View>
      </View>
    )
  }
}

export default TopAnimeInfo