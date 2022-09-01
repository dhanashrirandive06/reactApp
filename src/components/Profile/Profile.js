import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../utilities/Auth';
import Tweet from '../Tweet/Tweet';
import axios from 'axios';
import './Profile.css';
import TweetAppService from '../../utilities/TweetAppService';
import profileimg from '../../asset/user.png';

export function Profile() {
  const auth = useAuth();
  const navigate = useNavigate();
  const service = new TweetAppService();
  const [tweetdata, setTweetdata] = useState([]);
  const pr = {
    contactNumber: "",
    emailId: "",
    firstName: "",
    lastName: "",
    username: ""

  };
  const [profile, setProfile] = useState(pr);
  const [refreshKey, setRefreshKey] = useState(0);


  useEffect(() => {
    async function fetchTweets() {

      const response = await axios.get(`http://localhost:29769/api/v1.0/tweets/user/search/${auth.user}`, {
        "method": "GET",
        "headers": {
          "Accept": "application/json"
        }
      });
      setTweetdata(response.data);
      console.log(tweetdata);
    }
    fetchTweets();
  }, [refreshKey]);


  useEffect(() => {

    async function fetchProfile() {
      // const response = await axios.get(`http://localhost:29769/api/v1.0/tweets/user/${auth.user}`, {
      //            "method": "GET",
      //            "headers": {
      //               "Accept":"application/json"
      //           }});
      const response = await service.getUserProfile(auth.user);
      setProfile(response);
    }

    fetchProfile();

    console.log(profile);
  }, []);




  function refreshUpdate() {
    setTimeout(() => {

      setRefreshKey(old => old + 1);
    }, 1000);
  }
  return (
    <div className="back p-2">

      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
      />


      <div className="card h-100 w-25 mx-auto p-3 my-4" id="bg1">

        <span><img src={profileimg} alt="profile" width="70" height="70" /></span>
        <h2>{profile.username}</h2>
        <p className="title">{profile.firstName} {profile.lastName}</p>
        <p className="title">{profile.emailId}</p>
        <p className="title">{profile.contactNumber}</p>
      </div>



      <div className="container mx-auto">
        <hr className="mt-5 mx-auto text-primary" style={{ width: "7%" }} />
        <h3 className="h3 mt-3 mb-5 text-center text-secondary">My Tweets</h3>
        {tweetdata.length > 0 ? [...tweetdata].reverse().map((dataPoint, index) => (
          <Tweet dataPoint={dataPoint} key={index} refreshUpdate={refreshUpdate} />
        )) : ""}


      </div>


    </div>


  )
}

