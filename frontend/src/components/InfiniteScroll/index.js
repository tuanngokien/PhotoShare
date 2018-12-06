import InfiniteScroll from "react-infinite-scroller";
import React from "react";
import Loader from "./loader";

export default function ({pageStart, initialLoad, loadMore, hasMore, children}) {
    return (
        <InfiniteScroll
            pageStart={pageStart}
            initialLoad={initialLoad}
            loadMore={loadMore}
            hasMore={hasMore}
            loader={<Loader/>}>
            {children}
        </InfiniteScroll>
    )
}