import { Text, View, Button } from 'react-native'
import React, { Component } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import axios from 'axios'


export class GenresDetails extends Component {


    getAllDetailsGenre = async () => {
      const gn = this.props.route.params.genres.trim().toLowerCase();
      const genre = await axios.get(`https://webdis-jthh.onrender.com/genre/${gn}`,{
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }
      })
      console.log(genre.data);
      
    }


  componentDidMount(){
    this.getAllDetailsGenre();

  }

  render() {
    return (
      <SafeAreaView>
        <Text>GenresDetails</Text>
        <Button title ='back'onPress={()=>{
            this.props.navigation.goBack();
        }}/>
      </SafeAreaView>
    )
  }
}

export default GenresDetails