import React from "react";
import appwriteService from "../appwrite/config.js";
import { Container, Postcard } from "../components";
import { useState } from "react";
import { useEffect } from "react";

function AllPost() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    appwriteService.getPosts([]).then((posts) => {
      if (posts) {
        setPosts(posts.documents);
        console.log(typeof(posts.documents));
        console.log({ ...posts });
      }
    });
  }, []);

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

export default AllPost;
