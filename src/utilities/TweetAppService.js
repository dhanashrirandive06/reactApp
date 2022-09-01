
import axios from "axios";

class TweetAppService{
   token = "tokens";

    
    login(username, password){
     fetch(`http://localhost:29769/api/v1.0/tweets/login/${username},${password}`, {
    
    method: "GET",
    header: {
        Accept:"application/json",
        Authorization:this.token
    }
    }).then(response => response.json())
    .then((data) => {
    //console.log('Success:', data);
    localStorage.setItem("user-data",JSON.stringify(data));
    })
    .catch((error) => {
    console.error('Error:', error);
    });

  }

  register(userdata){
    fetch("http://localhost:29769/api/v1.0/tweets/register", {
        "method": "POST",
        "headers": {
            "Content-Type": "application/json",
            "Authorization":this.token
        },
        "body": JSON.stringify({
            firstName: userdata.firstname,
            lastName: userdata.lastname,
            contactNumber: userdata.contact,
            username: userdata.username,
            emailId: userdata.emailid,
            password: userdata.password
        })
      })
      .then(response => response.json())
      .then(response => {
        //console.log(response)
      })
      .catch(err => {
        console.log(err);
      });
  }


  async getAllTweet() {

    

    try {
        const response = await axios.get(`http://localhost:29769/api/v1.0/tweets/all`, {
                  "method": "GET",
                  "headers": {
                     "Accept":"application/json",
                     "Authorization":this.token
                
                 }});
        //console.log(response.data);
        return response.data;
      } catch (err) {
        console.log(err);
      }
  }
  
  postTweet(tweet){
    fetch("http://localhost:29769/api/v1.0/tweets/tweet", {
        "method": "POST",
        "headers": {
            "Content-Type": "application/json",
            "Authorization":this.token
        },
        "body": JSON.stringify({
            username: tweet.username,
            tweets: tweet.tweets,
            firstName: tweet.firstName
        
        })
      })
      .then(response => response.json())
      .then(response => {
       // console.log(response)
      })
      .catch(err => {
        console.log(err);
      });
  }

   deleteTweet(data){
    // deletes entities
    axios.delete(`http://localhost:29769/api/v1.0/tweets/tweetdelete/${data.userName},${data.tweetId}`,
    {
      headers:{
      "Authorization":this.token
      }
    }
    )
    .then(response => {
      // console.log(response);
       return response;
    })
    .catch(err => {
        console.log(err);
        return err;
    });

  }

  deleteUser(userName){
    // deletes entities
    axios.delete(`http://localhost:29769/api/v1.0/tweets/user/${userName}`,
    {
      headers:{
      "Authorization":this.token
      }
    }
    )
    .then(response => {
       console.log(response);
       return response;
    })
    .catch(err => {
        console.log(err);
        return err;
    });

  }  

  async getAllUser(){
    

    try {
      const response = await axios.get("http://localhost:29769/api/v1.0/tweets/users/all", {
                "method": "GET",
                "headers": {
                   "Accept":"application/json",
                    "Authorization":this.token
                    
                  }});
      console.log(response.data);
      return response.data;
    } catch (err) {
      console.log(err);
    }
  }

  async getTweetByUser(username){
    

    try {
      const response = await axios.get(`http://localhost:29769/api/v1.0/tweets/user/search/${username}`, {
                "method": "GET",
                "headers": {
                   "Accept":"application/json",
                   "Authorization":this.token
               }});
      console.log(response.data);
      return response.data;
    } catch (err) {
      console.log(err);
    }
  }

  async getAllComents(username, tweetid){
    

    try {
      const response = await axios.get(`http://localhost:29769/api/v1.0/tweets/allcomments/${username},${tweetid}`, {
                "method": "GET",
                "headers": {
                   "Accept":"application/json",
                   "Authorization":this.token
               }});
      console.log(response.data);
      return response.data;
    } catch (err) {
      console.log(err);
    }
  }

    async getUserProfile(username){
       
    let result = await fetch(`http://localhost:29769/api/v1.0/tweets/user/${username}`, {
         "method": "GET",
         "headers": {
            "Accept":"application/json",
            "Authorization":this.token
         }
     });
     result = await result.json();
     console.log('Success:', result);
    
    try {
        const response = await axios.get(`http://localhost:29769/api/v1.0/tweets/user/${username}`, {
                  "method": "GET",
                  "headers": {
                     "Accept":"application/json",
                     "Authorization":this.token
                 }});
        console.log(response.data);
        return response.data;
      } catch (err) {
        console.log(err);
      }

   }

  forgotPassword(data){

    fetch(`http://localhost:29769/api/v1.0/tweets/forgot/${data.emailid},${data.password}`, {
        "method": "PUT",
        "headers": {
          "Authorization":this.token
        }
    })
    .then(response => response.json())
    .then(response => { console.log(response);
    })
    .catch(err => { console.log(err); });

  }

  postComment(commentdata){
    fetch(`http://localhost:29769/api/v1.0/tweets/reply/${commentdata.comment},${commentdata.username},${commentdata.name},${commentdata.tweetid}`, {
        "method": "POST",
        "headers": {
            "content-type": "application/json",
            "Authorization":this.token
        }
      });

  }

  putLikes(tweetid,flag){
    fetch(`http://localhost:29769/api/v1.0/tweets/likes/${tweetid},${flag}`, {
        "method": "PUT",
        "headers": {
          "Authorization":this.token
        }
    })
    .then(response => response.json())
    .then(response => {
       
    })
    .catch(err => { console.log(err); 
    });
  }
}

export default TweetAppService