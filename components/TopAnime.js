import { Text, View , Image, ScrollView, Dimensions} from 'react-native'
import React, { Component } from 'react'
import axios from 'axios'
import TopAnimeInfo from './topAnimeInfo'

export class TopAnime extends Component {

    
  state = {
    animeMovie: [],
  }

  getMovie = async () => {  
    try {
      const url = "https://consumet-api-funk.onrender.com/anime/gogoanime/top-airing";
      const { data } = await axios.get(url, { params: { page: 1 } });
      this.setState({ animeMovie: data.results });
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
        height:290,
       }}>
        <Text style={{
          color:'white',
          opacity:0.5,
          fontSize:15,
          marginTop:10,
          marginLeft:10,
        }}>Top animes</Text>
        <ScrollView horizontal>
        {this.state?.animeMovie.map((itm, index) => {
          return (
            <View key={index}>
              <TopAnimeInfo {...itm}/>
            </View>
          )
        })}
        </ScrollView>
            
       </View>
            
    )
  }
}

export default TopAnime