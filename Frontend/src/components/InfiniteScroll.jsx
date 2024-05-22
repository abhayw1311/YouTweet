import React from "react";
import { useEffect, useRef } from "react";

function InfiniteScroll({ children, fetchMore, hasNextPage }) {
    const loader = useRef(null); // Create a ref for the loader element
 // useEffect hook to observe the loader element for intersection
    useEffect(() => {
        const elementRef = loader.current;// Get a reference to the loader element
        const observer = new IntersectionObserver((entries) => {
            const target = entries[0];// Get the first entry in the intersection observer
            if (target.isIntersecting && hasNextPage) {
                // If the loader element is intersecting the viewport and there are more pages to fetch
                fetchMore();//Fetch more data
            }
        });

        if (elementRef) observer.observe(elementRef);

        return () => observer.unobserve(elementRef);
    }, [fetchMore, hasNextPage]);

    return (
        <>
            {children}
            <div
                ref={loader}
                className="h-2"
            ></div>
        </>
    );
}

export default InfiniteScroll;
