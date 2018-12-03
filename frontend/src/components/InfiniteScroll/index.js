import InfiniteScroll from "react-infinite-scroller";
import React from "react";
import LoadingSVG from "../../assets/img/loading.svg";

const loader = <div key={0} style={{textAlign: "center", marginTop: "5px"}}>
    <img style={{verticalAlign: "middle"}} src={LoadingSVG}/>
    <span style={{fontSize: "1.5em"}}>Loading ...</span>
</div>;

export default function ({pageStart, initialLoad, loadMore, hasMore, children}) {
    return (
        <InfiniteScroll
            pageStart={pageStart}
            initialLoad={initialLoad}
            loadMore={loadMore}
            hasMore={hasMore}
            loader={loader}>
            {children}
        </InfiniteScroll>
    )
}