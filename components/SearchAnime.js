import { Text, View } from 'react-native'
import React, { Component } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Searchbar } from 'react-native-paper';
import axios from 'axios';

export class SearchAnime extends Component {

  state = {
    searchQuery: '',
    queryData: [],
  }
  onChangeSearch = async (val) => {
    this.setState({searchQuery: val})

    try {   
        const url = `https://consumet-api-funk.onrender.com/anime/gogoanime/${val}?page=1`;
        const { data } = await axios.get(url);
        this.setState({queryData: data.results})
    } catch (err) {
        throw new Error(err.message);
    }

  }

 
  

  render() {
    return (
      <SafeAreaView style={{
        flex: 1,
        backgroundColor:'rgba(0, 0, 0, 0.8)'
      }}>
        
        <Searchbar
      
      placeholder="Search"
      onChangeText={this.onChangeSearch}
      placeholderTextColor='white'
      value={this.state.searchQuery}
      traileringIconColor='white'
      style={{
        margin:10,
        backgroundColor:'coral',
        opacity:0.8,
       
      }}
      inputStyle= {{
        color:'white'
      }}
      iconColor='white'
      
    />
    <Text style={{
        color:'white',
        opacity:0.7,
        marginLeft:20,
        marginTop:10,
    }}>
        Search results:
    </Text>
     {!this.state.queryData.length ? (
        <View>
            <Text>Please wait searching!</Text>
        </View>
     ): this.state?.queryData.map((item, index) => (
        <View key={index}>
            <Text>results!</Text>
        </View>
     ))}
      </SafeAreaView>
    )
  }
}

export default SearchAnime