import React from "react";
import LoadingSVG from "../../assets/img/loading.svg";

export default () => {
    return (<div style={{textAlign: "center"}} className={"infinite-scroll"}>
        <img style={{verticalAlign: "middle", width: "7vh", "height": "auto"}} src={LoadingSVG}/>
        <span style={{fontSize: "1.2em"}}>Loading ...</span>
    </div>);
};