import React from 'react'
import appwriteService from "../appwrite/config.js"
import authService from '../appwrite/auth.js'
import {Container, Postcard} from "../components"
import { useState } from 'react'
import { useEffect } from 'react'

function Home() {
    const [posts, setPosts] = useState([])
    const [isLoggedIn, setIsLoggedIn] = useState(null)
        useEffect(() => {
          appwriteService.getPosts().then((posts) => {
            if (posts) {
              setPosts(posts.documents);
            }
          });
          setIsLoggedIn(authService.getCurrentUser())
        }, []);
        
        console.log(typeof(isLoggedIn));
        //console.log(isLoggedIn.values);
        if (isLoggedIn === null) {
          return (
            <div className="w-full py-8 mt-4 text-center">
              <Container>
                <div className="flex flex-wrap">
                  <div className="p-2 w-full">
                    <h1 className="text-2xl font-bold hover:text-gray-500">
                      Login to read posts
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
                {posts.map((post) => (
                  <div key={post.$id} className="p-2 w-1/4">
                    <Postcard {...post} />
                  </div>
                ))}
              </div>
            </Container>
          </div>
        );
}

export default Home