import React, { useState, useEffect }  from 'react'
import appwriteService from "../appwrite/config.js";
import { Container, Postcard } from "../components";
import authService from '../appwrite/auth.js';

function MyPost() {

    const [userPost, setUserPost] = useState([])

    useEffect(() => {
      const fetchUserPost = async () => {
        try {
            const user = await authService.getCurrentUser();
            console.log(user.$id);
            const posts = await appwriteService.getPosts([]).then()
            console.log(typeof(posts.documents));
            const UPost = posts.documents.filter(post=>post.userId === user.$id)
            setUserPost(UPost)
        } catch (error) {
            console.log("No Post Found", error);
        }
        
      };
      fetchUserPost();
    },[]);
    if(userPost.length===0){
        return (
          <div className="w-full py-8 mt-4 text-center">
            <Container>
              <div className="flex flex-wrap">
                <div className="p-2 w-full">
                  <h1 className="text-2xl font-bold hover:text-gray-500">
                    You haven't posted anything, Post what's on your mind.
                  </h1>
                </div>
              </div>
            </Container>
          </div>
        );
    }
  return (
    <div className="w-full py-8">
      <Container>
        <div className="flex flex-wrap">
          {userPost.map((post) => (
            <div key={post.$id} className="p-2 w-1/4">
              <Postcard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default MyPost