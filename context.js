
import { createContext, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect} from 'react';
import { db } from './firebase';
import { where, query, and, onSnapshot, collection, addDoc, doc ,orderBy, serverTimestamp, updateDoc} from 'firebase/firestore';

const myContext = createContext();


const GlobalProvider = ({children}) => {

    const [userData, setUserData] = useState(null);
    const [likesData, setLikesData] = useState([]);
    const [allLikeData, setAllLikeData] = useState([]);
    const [episodeId, setEpisodeId] = useState(null);
    const [userWatchList, setUserWatch] = useState([]);
    const [allComments, setAllComments] = useState([]);
    const [historyRecords , setHistoryRecords] = useState([]);
    const [profile, setProfile] = useState(null);


 const setUserIdhere = async (id, user) => {
      try {
        const userData = {
          user,
          id,
        }
        setUserData(userData);
        fetchHistory(userData.id);
        getUserWatchList(userData.id);
        getUserProfile(userData.id);
        await AsyncStorage.setItem('profile', JSON.stringify(userData));
      } catch (e) {
       console.log('error fetching user')
      }
};


const getEpisodeIdbyDefault = (id, num) => {
   let dt = {
    id,
    num,
   }
   setEpisodeId(dt);
}
const getUserlikes = (epID) => {
    try {
      const docs = collection(db, 'likes');
    const ref = query(docs,where('animeId', '==', epID));
    onSnapshot(ref, (list)=>{
      let value = [];
    list.docs.forEach(element => {
      value.push({data: element.data(), id: element.id});
    });
    
  setLikesData(value);

})

    } catch (error) {
      console.log('error fetching userlikes')
    }
}

const getUserWatchList = (id) => {
  try {
    const docs = collection(db, 'watchList');
  const ref = query(docs, where('userId', '==', id));
  onSnapshot(ref, (list)=>{
    let value = [];
  list.docs.forEach(element => {
    value.push({data: element.data(), id: element.id});
  });
  
  setUserWatch(value);

})

  } catch (error) {
    console.log('error fetching userwatch')
  }
}


const getAllLikes = (epID) => {

  try {

    const docs = collection(db, 'likes');
    const ref = query(docs,where('animeId', '==', epID));
    onSnapshot(ref, (list)=>{
      let value = [];
    list.docs.forEach(element => {
      value.push({data: element.data(), id: element.id});
    });
  
    setAllLikeData(value)
    
  })
    
  } catch (error) {
    console.log('error fetching alllikes')
  }
    
}

const getAllComments = async (epId) => {

  try {
    const docs = collection(db, 'comments');
    const ref = query(docs,where('animeId', '==', epId), orderBy('createdAt', 'asc'));
    onSnapshot(ref, (list)=>{
      let value = [];
    list.docs.forEach(element => {
      value.push({data: element.data(), id: element.id});
    });
  
    setAllComments(value);
  })
    
  } catch (error) {
    console.log('error fetching comments')
  }
}






 


 
const fetchHistory = (id) => {

  
  const docs = collection(db, 'history');
  const ref = query(docs,where('userId', '==', id));
  onSnapshot(ref, async (list)=>{
    let value = [];
  list.docs.forEach(element => {
    value.push({data: element.data(), id: element.id});
  });
  setHistoryRecords(value);
 })
  
 }





const getUserProfile = (id) => {

  const docs = collection(db, 'users');
  const ref = query(docs,where('userId', '==', id));
  onSnapshot(ref, async (list)=>{
    let value = [];
  list.docs.forEach(element => {
    value.push({data: element.data(), id: element.id});
  });
  setProfile(value);
 })
}







  return (
    <myContext.Provider value={{
     userData: userData,
     getUserlikes,
     likesData,
     getAllLikes,
     allLikeData,
     getUserWatchList,
     userWatchList,
     getAllComments,
     allComments,
     historyRecords,
     setUserIdhere,
     episodeId,
     getEpisodeIdbyDefault,
     fetchHistory,
     profile,
    }}>
    {children}
  </myContext.Provider>
  )
}



export {GlobalProvider, myContext};