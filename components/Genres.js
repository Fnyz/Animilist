import { ScrollView, Text, TouchableOpacity, View } from 'react-native'
import React, { Component } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { AntDesign } from '@expo/vector-icons';
import { EvilIcons } from '@expo/vector-icons';

const genres = ['Action', 'Adventure', 'Cars', 'Comedy', 'Crime', 'Dementia', 'Demons','Drama', 'Dub', 'Ecchi', 'Family',
'Fantasy', 'Game', 'Harem', 'Historica', 'Horror', 'Josei', 'Kids', 'Magic', 'Martial-Arts', 'Mecha','Military', 'Mmusic', 'Mystery', 'Parody', 'Police',
'Pyschological', 'Romance', 'Samurai', 'School', 'Sci-fi','Seinen', 'Shoujo', 'Shoujo-ai', 'Shounen', 'Slice-of-Life', 'Space','Sports','Super-Power','Supernatural', 'Suspence', 'Thriller', 'Vampire', 'Yaoi','Yuri'];



export class Genres extends Component {
    state = {
        genres,
        selected: 0
    }
  render() {
    return (
      <SafeAreaView style={{
        flex:1,
        backgroundColor:'rgba(0, 0, 0, .8)'
      }}>
        <View style={{
            flexDirection: 'row',
            justifyContent:'space-between',
            alignItems:'center',
            marginHorizontal:20,
            marginVertical:15,
        }}>
        <Text style={{
           
            fontSize: 30,
            fontWeight:'bold',
            color:'white',
            opacity:0.7
        }}>Select Genres</Text>
        <TouchableOpacity onPress={()=> this.props.navigation.navigate('Home')}>
        <AntDesign name="back" size={24} color="white" style={{
            opacity:0.7
        }} />

        </TouchableOpacity>

        </View>
        <ScrollView style={{
          flex:1,
          marginBottom:15,
        }}>
        {this.state.genres.map((genre, index) =>{
            return (
                <TouchableOpacity key={index} style={{
                   marginHorizontal:20,
                   marginTop:10,
                   opacity:0.8
                }}  onPress={()=>{
                    this.setState({selected:index})
                    this.props.navigation.navigate('GenresDetails', {
                        genres:genre
                    });
                }}>
                    <View style={{
                        flexDirection:'row',
                        borderWidth:1,
                        justifyContent:'space-between',
                        padding:20,
                        borderColor:this.state.selected === index ? null : 'coral',
                        borderRadius:10,
                        backgroundColor:this.state.selected === index ? 'coral': null,
                    }}>
                    <Text style={{
                        color:this.state.selected === index ? 'white' : 'coral',
                        fontSize:20,
                    }}>{genre}</Text>
                    <EvilIcons name="arrow-down" size={30} color={this.state.selected === index ? 'white' : 'coral'} />
                    </View>
                </TouchableOpacity>
            )
            })}

        </ScrollView>
            
        </SafeAreaView>
    )
  }
}

export default Genres