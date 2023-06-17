import { Text, View , Image, ScrollView, Dimensions} from 'react-native'
import React, { Component } from 'react'
import axios from 'axios'
import GoTopAnimeInfo from './GoTopAnimeInfo'

export class TopMovies extends Component {

    
  state = {
    animeMovie: [],
  }

  getMovie = async () => {  
    try {
      const url = "https://webdis-jthh.onrender.com/anime-movies";
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
  

  componentDidMount(){

    this.getMovie();

  }
  render() {

    
    return (
       <View style={{
        height:300,
       }}>
        <Text style={{
          color:'white',
          opacity:0.5,
          fontSize:15,
          marginTop:10,
          marginLeft:10,
        }}>Anime movies</Text>
        <ScrollView horizontal>
        {!this.state?.animeMovie.length? (
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
        ):this.state?.animeMovie.map((itm, index) => {
          return (
            <View key={index}>
              <GoTopAnimeInfo {...itm}/>
            </View>
          )
        })}
        </ScrollView>
            
       </View>
            
    )
  }
}

export default TopMovies