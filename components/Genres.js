import { ScrollView, Text, TouchableOpacity, View } from 'react-native'
import React, { Component } from 'react'

const genres = ['Action', 'Adventure', 'Cars', 'Comedy', 'Crime', 'Dementia', 'Demons','Drama', 'Dub', 'Ecchi', 'Family',
'Fantasy', 'Game', 'Harem', 'Historica', 'Horror', 'Josei', 'Kids', 'Magic', 'Martial-Arts', 'Mecha','Military', 'Mmusic', 'Mystery', 'Parody', 'Police',
'Pyschological', 'Romance', 'Samurai', 'School', 'Sci-fi','Seinen', 'Shoujo', 'Shoujo-ai', 'Shounen', 'Slice-of-Life', 'Space','Sports','Super-Power','Supernatural', 'Suspence', 'Thriller', 'Vampire', 'Yaoi','Yuri'];



export class Genres extends Component {
    state = {
        genres,
        selected: 0
    }
    handleGenre = (genre,index, navigation) => {

        this.setState({selected: index});
        navigation.navigate('GenresDetails', {
            genres:genre
        })

    }
  render() {
    
    return (

        <View style={{
            marginTop:10,
            marginBottom:5,
        }}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {this.state?.genres.map((item, i)=>{
                    return (
                        <TouchableOpacity key={i} onPress={()=> this.handleGenre(item, i, this.props.navigation)}>
                        <View  style={{
                            marginLeft:10,
                            marginBottom:10,
                            padding:5,
                            width:100,
                            height:40,
                            alignItems:'center',
                            justifyContent:'center',
                            borderRadius:5,
                            borderColor:'coral',
                            borderWidth:1,
                            backgroundColor: this.state.selected === i? 'coral' : null,
                            opacity:0.7
                        }}>
                            <Text style={{
                                color:this.state.selected === i? 'white' : 'coral',
                                fontSize:15,
                            }}>{item}</Text>
                        </View>

                        </TouchableOpacity>
                    )
                })}
            </ScrollView>
        </View>
        
      
    )
  }
}

export default Genres