import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllVideos, makeVideosNull } from "../store/Slices/videoSlice";
import { VideoList, Container, InfiniteScroll } from "../components";
import HomeSkeleton from "../skeleton/HomeSkeleton";

function HomePage() {
    const dispatch = useDispatch(); // Initialize the dispatch function
    const videos = useSelector((state) => state.video?.videos?.docs); // Get videos from the Redux store
    const loading = useSelector((state) => state.video?.loading); // Get loading state from the Redux store
    const hasNextPage = useSelector((state) => state.video?.videos?.hasNextPage); // Check if there are more videos to fetch
    const [page, setPage] = useState(1); // State to keep track of the current page number

    // useEffect hook to fetch all videos when the component mounts and clear videos when unmounted
 
    useEffect(() => {
        dispatch(getAllVideos({}));
        // Dispatch action to fetch all videos

        return () => dispatch(makeVideosNull());// Cleanup function to clear videos when the component unmounts
    }, [dispatch]);
        // useCallback hook to memoize the fetchMoreVideos function
    const fetchMoreVideos = useCallback(() => {
         // Check if there are more pages to fetch
        if (hasNextPage) {
             // Dispatch action to fetch videos for the next page
            dispatch(getAllVideos({ page: page + 1 }));
              // Update the page state
            setPage((prev) => prev + 1);
        }
    }, [page, hasNextPage, dispatch]);
    return (
        <Container>
             {/* InfiniteScroll component for infinite scrolling behavior */}
            <InfiniteScroll
                fetchMore={fetchMoreVideos}
                hasNextPage={hasNextPage}
            >
                 {/* VideoList components to display videos */}
                <div className="text-white mb-20 sm:m-0 max-h-screen w-full grid xl:grid-cols-3 sm:grid-cols-2 grid-cols-1 overflow-y-scroll">
                      {/* Map through the videos array and render VideoList component for each video */}
                    {videos?.map((video) => (
                        <VideoList
                            key={video._id}
                            avatar={video.ownerDetails?.avatar.url}
                            duration={video.duration}
                            title={video.title}
                            thumbnail={video.thumbnail?.url}
                            createdAt={video.createdAt}
                            views={video.views}
                            channelName={video.ownerDetails?.username}
                            videoId={video._id}
                        />
                    ))}
                </div>
                  {/* Render HomeSkeleton component when loading */}
                {loading && <HomeSkeleton />}
            </InfiniteScroll>
        </Container>
    );
}

export default HomePage;