import { Text, View, Image, TouchableOpacity} from 'react-native'
import React, { Component } from 'react'
export class RecentRelease extends Component {

  
  render() {
    const {image, title, id, episodeId, episodeNumber} = this.props;
  
   
    return (
       <>
       
      
       <View style={{
        height:250,
        borderColor:'red'
       }}>
        
        <Image source={{uri:image}} style={{
          width:400,
          height:'100%',
          resizeMode:'cover'
        }}/>
       </View>
       <View style={{
        width:'100%',
        padding:10,
        height:50,
        alignItems:'center',
        flexDirection:'row',
        gap:10,
        backgroundColor:'#4b4b4b'
       }}>
        <View style={{
          width:title.length > 20 ? 120 : null,
        }}>
        <Text numberOfLines={1} ellipsizeMode="tail"  style={{
          color:'white',
          fontSize:15,
          fontWeight:'bold',
          overflow: 'hidden',
        }}>{!title ? id: title}</Text>
        </View>
       
        <Text style={{
          color:'white'
        }}>/  Episode <Text style={{
          fontWeight:'bold'
        }}>{episodeNumber}</Text></Text>
        <TouchableOpacity onPress={()=>this.props.navigation.navigate('View',{
          titlePage: title,
          epNumber: episodeNumber,
          episodeId,
          type:'release'
        })}>

      
     
        <View style={{
          paddingHorizontal:15,
          paddingVertical:5,
          borderRadius:5,
          backgroundColor:'coral',
          opacity:0.9
        }}>
         
          <Text style={{
            color:'white',
            
          }}>Watch now</Text>
          </View>
        </TouchableOpacity>

       </View>

       </>
    )
  }
}

export default RecentRelease