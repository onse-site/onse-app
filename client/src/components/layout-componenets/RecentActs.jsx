import React from "react";
import PostCard from "../posts-componenets/PostCard";
import { MapPinIcon } from "@heroicons/react/20/solid";
import api from "../../api/axios";

const Carousel = () => {
  const post = {
    title: " ",
    description: "",
    image: "b",
  };

  const [posts, setPosts] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await api.get("api/post");
        if (response.status !== 200) {
          throw new Error("Failed to fetch posts");
        }

        const shuffledPosts = response.data.sort(() => 0.5 - Math.random());
        const randomPosts = shuffledPosts.slice(0, 10);
        setPosts(randomPosts);
      } catch (error) {
        setPosts([post, post, post, post, post]);
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-10">
        <div className="loader">Loding...</div>
      </div>
    );
  }

  const circularPosts = [...posts, ...posts];
  return (
    <div className="py-10 lg:mx-10" id="RecentActs">
      <div className="flex items-center justify-end px-4 py-10 gap-x-2 bg-white">
        <h3 className="text-3xl font-bold text-right   text-tertiary">
          آخر الانشطة والاحداث
        </h3>
        <MapPinIcon className="text-sm w-5 text-tertiary" />
      </div>

      <div className="carousel">
        <div className="group">
          {circularPosts.map((post, index) => (
            <PostCard key={index} post={post} />
          ))}
        </div>
        <style>
          {`
          .carousel {
            margin: 0 auto;
            padding: 30px 0;
            max-width: 100vh;
            overflow:hidden ;
            display: flex;
          }

          .carousel > * {
            flex: 0 0 100%;
          }

          .group {
            display: flex;
            gap: 20px;
            padding-right: 20px;
            will-change: transform;
            animation: scrolling 100s linear infinite;
          }

          @keyframes scrolling {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-100%);
            }
          }

          .carousel:hover .group {
            animation-play-state: paused;
          }
        `}
        </style>
      </div>
    </div>
  );
};

export default Carousel;
