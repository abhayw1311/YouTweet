import React, { useEffect } from "react"; // Importing React and useEffect hook
import { useDispatch, useSelector } from "react-redux"; // Importing hooks from react-redux for state management
import { getLikedVideos } from "../store/Slices/likeSlice"; // Importing action to fetch liked videos
import HomeSkeleton from "../skeleton/HomeSkeleton"; // Importing a skeleton component for loading state
import { Container, NoVideosFound, VideoList } from "../components"; // Importing components
import { makeVideosNull } from "../store/Slices/videoSlice"; // Importing action to reset video state

// LikedVideos component definition
function LikedVideos() {
    const dispatch = useDispatch();// Hook to dispatch actions
    const likedVideos = useSelector((state) => state.like?.likedVideos);// Hook to access liked videos from state
    const loading = useSelector((state) => state.like.loading);// Hook to access loading state
    window.scrollTo(0, 0);// Scroll to top of the page when the component is rendered
    useEffect(() => {
        dispatch(getLikedVideos());// Fetch liked videos when the component is mounted


        return () => dispatch(makeVideosNull())// Reset videos state when the component is unmounted
    }, [dispatch]);

    if (loading) {
        return <HomeSkeleton />;
    }

    if (likedVideos?.length == 0) {
        return <NoVideosFound />;
    }

    return (
        <>
            <Container>
                <div className="grid max-h-screen overflow-y-scroll lg:grid-cols-3 sm:grid-cols-2 text-white mb-20 sm:mb-0">
                    {likedVideos?.map((video) => (
                        <VideoList
                            key={video.likedVideo._id}
                            avatar={video.likedVideo.ownerDetails?.avatar?.url}
                            duration={video.likedVideo.duration}
                            title={video.likedVideo.title}
                            thumbnail={video.likedVideo.thumbnail?.url}
                            createdAt={video.likedVideo.createdAt}
                            views={video.likedVideo.views}
                            channelName={
                                video.likedVideo.ownerDetails?.username
                            }
                            videoId={video.likedVideo._id}
                        />
                    ))}
                </div>
            </Container>
        </>
    );
}

export default LikedVideos;
