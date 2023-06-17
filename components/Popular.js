import { Text, View , ScrollView, TouchableOpacity} from 'react-native'
import React, { Component } from 'react'
import axios from 'axios'
import GoTopAnimeInfo from './GoTopAnimeInfo'

export class Popular extends Component {

    
  state = {
    animeMovie: [],
  }

  getMovie = async () => {  
    try {
      const url = "https://webdis-jthh.onrender.com/popular";
      const { data } = await axios.get(url,{
        headers: {
            "Content-Type":'application/json',
            "Accept":'application/json',
        }
      }
        );
      this.setState({
        animeMovie: data,
      })
  } catch (err) {
      throw new Error(err.message);
  }
  }

  GotoDetails = ( id, navigation ) => {
    navigation.navigate('AnimeDetail', {
      animeId:id
    })
  }
  
  

  componentDidMount(){

    this.getMovie();

  }
  render() {


    
    return (
       <View style={{
        height:280,
       }}>
        <Text style={{
          color:'white',
          opacity:0.5,
          fontSize:15,
          marginTop:10,
          marginLeft:10,
        }}>Popular animes</Text>
        <ScrollView horizontal>
        {!this.state?.animeMovie.length ? (
         <View style={{
            justifyContent:'center',
            alignItems:'center',
            width:400,
         }}>
            <Text style={{
                color:'white',
                textAlign:'center',
            }}>Fetching anime please wait!</Text>
         </View>
        ) : this.state?.animeMovie.map((itm, index) => {
          return (
            <TouchableOpacity key={index} onPress={()=>this.GotoDetails(itm.animeId, this.props.navigation)}>
            <View>
              <GoTopAnimeInfo {...itm}/>
            </View>

            </TouchableOpacity>
          )
        })}
        </ScrollView>
            
       </View>
            
    )
  }
}

export default Popular