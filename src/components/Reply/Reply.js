import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router';
import TweetAppService from '../../utilities/TweetAppService';
import { useAuth } from '../../utilities/Auth';
import axios from 'axios';
import profileimg from '../../asset/user.png';


function Reply() {
  const [refreshKey, setRefreshKey] = useState(0);
  const [comments, setComments] = useState();
  const [commentss, setCommentss] = useState([]);

  const [Tweets, setTweets] = useState("");
  const current = new Date();
  const date = `${current.getDate()}/${current.getMonth() + 1}/${current.getFullYear()}`;
  const service = new TweetAppService();
  const navigate = useNavigate();
  const data = JSON.parse(localStorage.getItem("user-data"));
  const dataPoint = JSON.parse(localStorage.getItem("tweet"));
  const auth = useAuth();
  useEffect(() => {
    async function fetchTweets() {
      const response = await axios.get(`http://localhost:29769/api/v1.0/tweets/allcomments/${dataPoint.userName},${dataPoint.tweetId}`, {
        "method": "GET",
        "headers": {
          "Accept": "application/json",
        }
      });
      console.log(response.data);
      setCommentss(response.data);
    }
    fetchTweets();
  }, [refreshKey]);


  const handleComment = (e) => {

    e.preventDefault();
    let comment = {
      tweetid: dataPoint.tweetId,
      comment: comments,
      username: dataPoint.userName,
      name: data.username
    }
    service.postComment(comment);

    setComments(old => old = "");

    setTimeout(() => {

      setRefreshKey(old => old + 1);
    }, 1000);

  }
  function fetchTweet() {

    setTweets(data);
  }

  function DateTweets(data) {
    var date = new Date(data);
    const date1 = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`;
    return date1;
  }
  return (
    <div className="container">
      <div className="card w-25 mx-auto h-auto my-5 p-3 replyCard" >
        <div className="tweet card-body">
          <h4 className="" id="uname">@{dataPoint.userName}</h4>
          {'\n'}
          <h4 className="date">{DateTweets(dataPoint.tweetDate)}</h4>
          {'\n'}
          <h4 className="tweetdata">{dataPoint.tweets}</h4>
        </div>
      </div>
      <div className="row text-center my-5">
          <h4 className="">Reply to the tweet</h4>
     
        <div className="form-outline mx-auto">
          <textarea class="form-control mx-auto" id="textAreaExample1" rows="4" onChange={e => setComments(e.target.value)} value={comments}></textarea>
          <br />
        </div>
        <button type="button" class="btn btn-primary w-25 mx-auto" onClick={handleComment}>Submit</button>
      </div>

      {commentss.map((dataP, index) => (
        <div className="card w-25 h-auto p-4 mx-auto"   key={index}>
          <img src={profileimg} alt="profile" width="70" height="70" />
          <div className="tweet ">
            <h4 className="card-title">{dataP.firstName}</h4>
            <h5 className="date"> replying to @{dataP.username}</h5>
            <h5 className="tweetdata card-text">{dataP.comments}</h5>
          </div>

        </div>))}

    </div>

  )
}

export default Reply