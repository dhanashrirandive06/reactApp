import { useState } from 'react';
import './NewTweet.css';
import { useNavigate } from 'react-router-dom';
import TweetAppService from '../../utilities/TweetAppService';

export default function NewTweet() {
  const [tweetdata, setTweetdata] = useState("");
  const data = JSON.parse(localStorage.getItem("user-data"));
  const service = new TweetAppService();
  const navigate = useNavigate();

  const handlePosttweet = (e) => {
    e.preventDefault();
    let tweet = {
      username: data.username,
      tweets: tweetdata,
      firstName: data.firstname,
    };

    service.postTweet(tweet);
    setTimeout(() => {

      navigate("/");
    }, 1000);

  }


  return (
    <div className="out">
      
        <div className="text h5">Enter your TWEET</div>
        <div className="form-outline  ">
          <textarea className="form-control" id="textAreaExample1" rows="4" onChange={e => setTweetdata(e.target.value)}></textarea>
          <br />
          <button type="button" class="btn btn-primary" onClick={handlePosttweet} >Submit</button>
        </div>

    </div>
  )
}
