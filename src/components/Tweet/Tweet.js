import React from 'react'
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Tweet.css';
import userIcon from '../../asset/user.png';
import replyIcon from '../../asset/reply.png';
import likeIcon from '../../asset/like.png';
import dislikeIcon from '../../asset/dislike.png';
import deleteIcon from '../../asset/delete.png';
import axios from 'axios';

import { BrowserRouter as router } from 'react-router-dom';
import Reply from '../Reply/Reply';
import TweetAppService from '../../utilities/TweetAppService';
import { useAuth } from '../../utilities/Auth';
//import { useHistory } from "react-router-dom";

function Tweet(props) {
  const auth = useAuth();
  const service = new TweetAppService();
  const [like, setLike] = useState(true);

  const current = new Date();
  const date = `${current.getDate()}/${current.getMonth() + 1}/${current.getFullYear()}`;
  const navigate = useNavigate();


 

  function DateTweets(data) {
    var date = new Date(data);
    // var current = date.getTime(); 
    const date1 = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`;
    return date1;
  }




  return (
   
        <div className="row tweetRow mb-5 p-3 mx-auto" >
        <div className="col-3 iconImg">
          <img src={userIcon} className="m-1" width="70" height="70" />
        </div>
        <div className="col-9">
          <div className="row my-3">
            <span id="uname" className="h5 handleName col-6">@{props.dataPoint.userName}</span>
            <span className="time col-6">{DateTweets(props.dataPoint.tweetDate)}</span>
          </div>
          <div className="row  ">
            <div className=" tweetMsg text-justify">{props.dataPoint.tweets} </div>
          </div>
          <div className="actions">
            <img src={replyIcon} className="m-2 " width="20" height="20" onClick={() => {
              
              localStorage.setItem("tweet", JSON.stringify(props.dataPoint));
              navigate('/reply');
            }} />
            <img src={like ? dislikeIcon:likeIcon} className="m-2" width="20" height="20" onClick={()=>{
              service.putLikes(props.dataPoint.tweetId,like);
                if(like)
                    setLike(false);
                else
                    setLike(true);
                props.refreshUpdate();
            }}/>
            <span>{props.dataPoint.likes}</span>
            {auth.user==props.dataPoint.userName ? <img src={deleteIcon} className="my-2 mx-3" width="20" height="20" onClick={async()=>{
             
             const response=  service.deleteTweet(props.dataPoint);
            
            props.refreshUpdate();
            }}/> : ""}
          </div>
        </div>

      </div>
        
   

  
  )
}

export default Tweet;
{/* <div className="card" key={index}>
          <div className="tweet card-body">
            <h6 className="card-title">{dataPoint.userName}</h6>
            {'\n'}
            <p className="date">{DateTweets(dataPoint.tweetDate)}</p>
            {'\n'}
            <p className="tweetdata card-text">{dataPoint.tweets}</p>

            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" onClick={() => {
              auth.tweet(dataPoint.tweetId);
              localStorage.setItem("tweet", JSON.stringify(dataPoint));
              navigate('/reply');
            }}
              fill="currentColor" class="bi bi-reply reply" viewBox="0 0 16 16">
              <path d="M6.598 5.013a.144.144 0 0 1 .202.134V6.3a.5.5 0 0 0 .5.5c.667 0 2.013.005 3.3.822.984.624 1.99 1.76 2.595 3.876-1.02-.983-2.185-1.516-3.205-1.799a8.74 8.74 0 0 0-1.921-.306 7.404 7.404 0 0 0-.798.008h-.013l-.005.001h-.001L7.3 9.9l-.05-.498a.5.5 0 0 0-.45.498v1.153c0 .108-.11.176-.202.134L2.614 8.254a.503.503 0 0 0-.042-.028.147.147 0 0 1 0-.252.499.499 0 0 0 .042-.028l3.984-2.933zM7.8 10.386c.068 0 .143.003.223.006.434.02 1.034.086 1.7.271 1.326.368 2.896 1.202 3.94 3.08a.5.5 0 0 0 .933-.305c-.464-3.71-1.886-5.662-3.46-6.66-1.245-.79-2.527-.942-3.336-.971v-.66a1.144 1.144 0 0 0-1.767-.96l-3.994 2.94a1.147 1.147 0 0 0 0 1.946l3.994 2.94a1.144 1.144 0 0 0 1.767-.96v-.667z" />
            </svg>

            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-heart heart" viewBox="0 0 16 16">
              <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" />
            </svg>

          </div>
        </div> */}
