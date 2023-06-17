import { Text, View, TouchableOpacity, ScrollView, ActivityIndicator, StyleSheet} from 'react-native'
import React, {useEffect, useState } from 'react'
import axios from 'axios'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Video, ResizeMode, Fullscreen  } from 'expo-av';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Modal, Portal, PaperProvider } from 'react-native-paper';
import { EvilIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';





const ViewPage = ({route, navigation}) => {

  const [visible, setVisible] = React.useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);


const video = React.useRef(null);
const [EpisodeData, setData] = useState([]);
const [status, setStatus] = React.useState({});
const [quality, setQuality] = useState(null);
const [url, setUrl] = useState(null); 
const [choose, setChoose] = useState(null);
const [isLoading, setIsLoading] = useState(true);
const [isVideoPaused, setIsVideoPaused] = useState(false); 
const [isFullscreen, setIsFullscreen] = useState(false);


useEffect(() => {
  checkVideoStatus();
}, [isVideoPaused]);

const checkVideoStatus = async () => {
  if (!isVideoPaused) return; 

  const status = await video.getStatusAsync();
  if (status.isLoaded && !status.isPlaying) {
    setIsLoading(true); 
  }
};


const handleFullscreenToggle = async () => {
  if (isFullscreen) {
    await Fullscreen?.exitFullscreenAsync();
  } else {
    await Fullscreen?.requestFullscreenAsync(video.current);
  }
  setIsFullscreen(!isFullscreen);
};



const handleVideoLoad = () => {
  setIsLoading(false); // 
};




const handleBack = (alldata, title, subOrDub, type) => {

  if(type === 'episode') {
    navigation.navigate('Episodes',{
      epData:alldata,
      title,
      subOrDub,
    } )

    return;
  }
  navigation.navigate('Home');

  
}
const handleBackward = async () => {
  if (video.current) {
    const status = await video.current.getStatusAsync();
    const currentPosition = status.positionMillis || 0;
    const backwardTime = 5000; // 5 seconds
    
    let newPosition = currentPosition - backwardTime;
    if (newPosition < 0) {
      newPosition = 0;
    }
    
    await video.current.setPositionAsync(newPosition);
  }
};

const handlePlaybackStatusUpdate = (status) => {
  if (status.isLoaded && !status.isPlaying) {
    setIsLoading(true); 
   setStatus(status);
   return;
  
  }
  setStatus(status);
  setIsLoading(false); 
};


const handleForward = async () => {
  if (video.current) {
    const status = await video.current.getStatusAsync();
    const currentPosition = status.positionMillis || 0;
    const duration = status.durationMillis || 0;
    const forwardTime = 5000; // 5 seconds
    
    let newPosition = currentPosition + forwardTime;
    if (newPosition > duration) {
      newPosition = duration;
    }
    
    await video.current.setPositionAsync(newPosition);
  }
};
const handleVideoPress = () => {
  setIsVideoPaused(!isVideoPaused); // Toggle video pause status
  setIsLoading(false);
};



const  vidQuality = (quality) => {
   let {url} =  EpisodeData.find(item => item.quality === quality);
   setQuality(quality);
   setUrl(url);
  
}
 const getPlayEpisode = async () => {

    try {
      const epId =  route.params.episodeId;
      const url = `https://consumet-api-funk.onrender.com/anime/gogoanime/watch/${epId}`;
      const { data } = await axios.get(url, { params: { server: "vidstreaming" } });
     setData(data.sources);
     setUrl(data.sources[0].url);
    
  } catch (err) {
      throw new Error(err.message);
  }  
  }

  useEffect(()=>{
    getPlayEpisode();
  }, [])

  
    const title = route.params.titlePage;
    const number = route.params.epNumber;
    const alldata = route.params.type === 'episode' ? route.params.allepp :  null;
    const subOrDub = route.params.sOrD;
    const qualy = EpisodeData?.filter(item => item.quality.match(/\d+/g));
    const listEpisode = alldata?.filter(item => item.number !== number);


   
  

    

    
    if(!EpisodeData.length) {
      return (
        <SafeAreaView>
          <Text>Please wait fetching video!</Text>
        </SafeAreaView>
      )
    }
    
   
  
    return (
      <PaperProvider>
      <SafeAreaView style={{
       flex:1,
        borderWidth:1,
        alignItems:'center',
        backgroundColor:'rgba(0, 0, 0, .8)'
      }}>

        <View style={{
          flexDirection:'row',
          justifyContent:'center',
          marginTop:60,
          marginBottom:25
        }}>
        <MaterialIcons name="live-tv" size={40} color="coral" />
        <Text style={{
          fontSize:40,
          fontWeight:'bold',
          color:'coral',
          opacity:0.8,
          color:'white'
        }}> Ani<Text style={{
          color:'coral',
          textAlign:'center',
          fontWeight:'bold',
        }}>mist</Text></Text>
        </View>

    
    <View style={{
    justifyContent: 'center',
    borderRadius:10,
    paddingHorizontal:10,
    }}>
      <Text style={{
        color:'white',
        marginLeft:20,
        marginBottom:5,
        opacity:0.5
      }}>Watching: </Text>
      <Text style={{
        marginLeft:20,
        fontSize:title.length > 20? 10:20,
        marginBottom:10,
        fontWeight:'bold',
        width:300,
        color:'white',
        opacity:0.8
      }}><Text style={{
        color:'coral',
        fontWeight:'bold',
      }}>/</Text> {title}</Text>

      <Text style={{
        color:'white',
        marginBottom:5,
        alignSelf:'flex-end',
        marginRight:15,
        opacity:0.7
      }}>
      You are watching / <Text style={{
        color:'coral',
        fontWeight:'bold',
        opacity:1,
      }}>Episode {number}.</Text> 
      </Text>
     


      {!url ? (
        <Text>Loading video.</Text>
      ): (

        <View style={{
          position:'relative',
        }}>

      {isLoading ? (
        <ActivityIndicator size="large" color="coral" style={{
          position:'absolute',
          zIndex:1,
          left:0,
          right:0,
          top:0,
          bottom:0
        }} /> 
      ) : null}

    
            <Video
            ref={video}
            rate={1.0}
            volume={1.0}
            isMuted={false}
            shouldPlay={!isVideoPaused}
            style={isFullscreen ? styles.videoFullscreen : styles.video}
             source={{
               uri: url
             }}
             onLoad={handleVideoLoad}
             useNativeControls
             resizeMode={ResizeMode.CONTAIN}
             isLooping
             onPlaybackStatusUpdate={handlePlaybackStatusUpdate}
             onPress={handleVideoPress}
           />  


      <TouchableOpacity onPress={handleFullscreenToggle} style={styles.fullscreenButton}>
        <Ionicons name={isFullscreen ? 'md-contract' : 'md-expand'} size={24} color="white" />
      </TouchableOpacity>

          

        </View>

      )}

      <View style={{
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        marginVertical:10,
        marginHorizontal:10,
      }}>

        
    <TouchableOpacity onPress={() =>
            handleBackward()}>
    <View style={{
       padding:15,
       justifyContent:'center',
       alignItems:'center',
       margin:10,
       borderRadius:10,
       backgroundColor:'coral',
       width:100,
       opacity:0.8
    }}>
   
      <Text style={{
          fontSize:20,
          color:'white'
      }}><FontAwesome5 name="backward" size={24} color="white" /></Text>
    </View>
    </TouchableOpacity>

    

         
       <TouchableOpacity onPress={() =>
            status.isPlaying ? video.current.pauseAsync() : video.current.playAsync()}>
    <View style={{
       padding:15,
       justifyContent:'center',
       alignItems:'center',
       margin:10,
       borderRadius:10,
       backgroundColor:'coral',
       width:100,
       opacity:0.8
    }}>
   
      <Text style={{
          fontSize:20,
          color:'white'
      }}>{status.isPlaying ? <FontAwesome name="pause" size={24} color="white" /> : <AntDesign name="caretright" size={24} color="white" />}</Text>
    </View>
    </TouchableOpacity>



    <TouchableOpacity onPress={() =>
            handleForward()}>
    <View style={{
       padding:15,
       justifyContent:'center',
       alignItems:'center',
       margin:10,
       borderRadius:10,
       backgroundColor:'coral',
       width:100,
       opacity:0.8
    }}>
   
      <Text style={{
          fontSize:20,
          color:'white'
      }}><AntDesign name="forward" size={24} color="white" /></Text>
    </View>
    </TouchableOpacity>

      </View>
      

    


     <Text style={{
      marginLeft:15,
      opacity:0.5,
      marginTop:10,
      marginBottom:5,
      color:'white'
     }}>Choose quality:</Text>
      <View style={{
        flexDirection:'row',
        gap:10,
        marginTop:10,
        justifyContent:'center',
        alignItems:'center'
      }}>
      {!qualy?.length ? (
          <Text style={{
            color:'white',
            fontSize:15,
            opacity:0.7
          }}>No quality found!</Text>
        ): qualy?.map((item, i)=>{
          return (

            <TouchableOpacity key={i} onPress={()=> vidQuality(item.quality)}>
            <View  style={{
              borderWidth:1,
              padding:5,
              borderRadius:3,
              width:50,
              justifyContent:'center',
              alignItems:'center',
              borderColor:'coral',
              backgroundColor: item.quality === quality? 'coral' : null,
            }}>
              <Text style={{
                color:item.quality === quality? 'white' : 'coral',
              }}>{item.quality}</Text>
            </View>
              </TouchableOpacity>
          )
        })}
      </View>

      <View style={{
        marginTop:30,
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        marginVertical:10,
        marginHorizontal:10,
        gap:10,
        

      }}>
        <TouchableOpacity onPress={showModal}>

        <View style={{
          padding:15,
          backgroundColor:'coral',
          borderTopLeftRadius:20,
          borderBottomLeftRadius:20,
          opacity:0.7
      
        }}>
          <Text style={{
            color:'white',
            fontSize:15,
          
          }}>See more episodes</Text>
        </View>

        </TouchableOpacity>

        
      <TouchableOpacity onPress={()=> handleBack(alldata, title, subOrDub, route.params.type) } style={{
        borderWidth:1,
        padding:12,
        borderTopRightRadius:20,
        borderBottomRightRadius:20,
        borderColor:'coral'

      }}>
      <AntDesign name="back" size={24} color="coral" style={{
              opacity:0.8
      }}/>

      </TouchableOpacity>
      </View>

      <Portal>
        <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={{
          backgroundColor:'#4b4b4b',
          padding:20,
          margin:20,
          height:400,
          borderRadius:5,
        }}>
          <ScrollView showsHorizontalScrollIndicator={false}>

          {listEpisode?.map((item, i)=> {
            return (
              <TouchableOpacity key={i} onPress={()=> setChoose(i)}>

              <View  style={{
                borderWidth:1,
                padding:15,
                borderRadius:5,
                marginBottom:10,
                borderColor:'coral',
                backgroundColor:choose === i? 'coral' : null,
              }}>
                <View style={{
                  flexDirection:'row',
                  alignItems:'center',
                  justifyContent:'space-between'
                }}>
                <Text style={{
                  fontWeight:'bold',
                  color:choose === i? 'white' : 'coral',
                }}>Episode {item.number}</Text>
                <View style={{
                  flexDirection:'row',
                  justifyContent:'center',
                  gap:5,
                }}>

                <Text style={{
                  color:choose === i? 'white' : 'coral',
                  fontSize:15,
                  fontWeight:'bold'
                  
                }}>/ {subOrDub}</Text>
                <EvilIcons name="arrow-down" size={25} color={choose === i? 'white' : 'coral'} />
                </View>

                </View>
        
              </View>
                </TouchableOpacity>
            )
          })}

          </ScrollView>
          
          
        </Modal>
      </Portal>
   
     
   
       
  
    
    </View>

    
      </SafeAreaView>
      </PaperProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  video: {
               
    alignSelf: 'center',
    width: 350,
    height: 210,
    
  },
  videoFullscreen: {
    width: '100%',
    height: '100%',
  },
  fullscreenButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1,
  },
});

export default ViewPage;