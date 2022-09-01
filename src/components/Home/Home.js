import { useState, useEffect } from 'react';
import Tweet from '../Tweet/Tweet';
import axios from "axios";
import './Home.css';

import TweetAppService from '../../utilities/TweetAppService';
export function Home() {
  const service = new TweetAppService();


  const [tweetdata, setTweetdata] = useState([]);
  const [updateLike, setUpdateLike] = useState();
  const [refreshKey, setRefreshKey] = useState(0);
  useEffect(() => {
      async function fetchTweets() {
      const response = await axios.get(`http://localhost:29769/api/v1.0/tweets/all`, {
        "method": "GET",
        "headers": {
          "Accept": "application/json"
        }
      });
    setTweetdata(response.data);
    }
    fetchTweets();
  }, [refreshKey]);
    
  
  function refreshUpdate(){
   
    setTimeout(()=>{
          
      setRefreshKey(old => old+1);
      },500);
    
  }
  return (
    <div className="heading">
      <div className="comp mx-auto" >
        <div className="bg">
        {[...tweetdata].reverse().map((dataPoint, index) => (
            <Tweet dataPoint={dataPoint} key={index} refreshUpdate={refreshUpdate} />
            
        ))}
        </div>
      </div>
  
    </div>
  )
}