import { Text, View, TouchableOpacity , ScrollView} from 'react-native'
import React, { Component } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { EvilIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';


export class Episode extends Component {

    state = {
        selected:0,
    }
    handleViewEpisodes = (id, i, title, number, alleposodes, subOrDub) => {
        this.setState({
         selected:i
        })
        this.props.navigation.navigate('View', {
            episodeId:id,
            titlePage:title,
            epNumber:number,
            allepp:alleposodes,
            sOrD: subOrDub,
            type:'episode'
        })
        
    }
  render() {

    const episodes = this.props.route.params.epData
    const title = this.props.route.params.title
    const subOrDub = this.props.route.params.subOrDub
  
    return (
      <SafeAreaView style={{
        flex:1,
        backgroundColor: 'rgba(0, 0, 0, .8)',
      }}>
        <View style={{
            flexDirection:'row',
            justifyContent:'space-between',
            alignItems:'center',
            marginHorizontal:15,
            marginTop:20,
            marginBottom:10,
        }}>
        <View style={{
            width: title.length > 20 ? 120 : null,
        }}>
        <Text numberOfLines={1} ellipsizeMode="tail" style={{
            color:'coral',
            fontSize:25,
            fontWeight:'bold',
            opacity:0.8,
            overflow: 'hidden',
        }}>{title}</Text>

        </View>
        <AntDesign name="back" size={25} color="white" onPress={()=> this.props.navigation.navigate('Home')} style={{
        opacity:0.7,
      }}/>
        </View>

        <ScrollView>

        {!episodes.length ? (
            <View style={{
                justifyContent:'center',
                alignItems:'center',
                flex:1,
            }}>
                <Text style={{
                    color:'white'
                }}>Episode not released yet.</Text>
            </View>
        ): 
        episodes?.map((ep, i)=>{
            return (
                <TouchableOpacity key={i}  onPress={()=> this.handleViewEpisodes(ep.id, i, title, ep.number, episodes, subOrDub)}>

            <View style={{
                width:373,
                borderWidth:1,
                margin:10,
                flexDirection:'row',
                justifyContent:'space-between',
                padding:15, 
                borderRadius:10,
                fontsize:30,
                borderColor:this.state.selected === i? null : 'coral',
                backgroundColor:this.state.selected === i? 'coral' : null,
            }}> 
            <Text style={{
                color:this.state.selected === i? 'white' : 'coral',
            }}>Episode {ep.number}</Text>
            <View style={{
                flexDirection:'row',
                gap:5,
            }}>
                <Text style={{
                    color:this.state.selected === i? 'white' : 'coral',
                
                }}>/ {subOrDub}</Text>
                <EvilIcons name="arrow-down" size={25} color={this.state.selected === i? 'white' : 'coral'} />
            </View>
            </View>
        </TouchableOpacity>
            )
        })
        }

       
  
        </ScrollView>
      </SafeAreaView>
    )
}
}

export default Episode