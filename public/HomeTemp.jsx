import React from "react";
import appwriteService from "../src/appwrite/config.js";

import { Container, Postcard } from "../src/components/index.js";
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function Home() {
  const [posts, setPosts] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  //const navigation = useNavigation();
  //const isPageLoading = navigation.state === "loading";
  const userAvailable = useSelector((state) => state.auth.status);

  useEffect(
    () => {
      // (async () => {
      //   try {
      //     setIsLoggedIn(await authService.getCurrentUser());
      //   } catch (error) {
      //     console.log("No user Found", error);
      //   }
      // })();
      appwriteService.getPosts().then((posts) => {
        if (posts) {
          setPosts(posts.documents);
          console.log(posts.documents);
        }
      });

      // setIsLoggedIn(authService.isLoggedIn())
    },
    // [setPosts, setIsLoggedIn]
    [setPosts]
  );

  // (async()=>{
  //   try{
  //     setIsLoggedIn(await authService.getCurrentUser())
  //   }
  //   catch(error){
  //     console.log("No user Found", error);
  //   }
  // })();
  // // console.log(typeof(isLoggedIn));

  // console.log(isLoggedIn);

  if (userAvailable === false) {
    return (
      <div className="w-full py-8 mt-4 text-center">
        <Container>
          <div className="m-10 p-20 flex flex-wrap  ">
            <div className="p-4 w-full">
              <h1 className="text-2xl font-bold hover:text-gray-500">
                Login or Signup to read posts&nbsp;
              </h1>
              <Link
                to="/login"
                className="font-medium text-primary transition-all duration-200 hover:underline slate-200"
              >
                Sign In
              </Link>
              <span> / </span>
              <Link
                to="/signup"
                className="font-medium text-primary transition-all duration-200 hover:underline slate-200"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </Container>
      </div>
    );
  }
  return (
    <>
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
    </>
  );
}

export default Home;
