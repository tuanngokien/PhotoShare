import React from "react";
import LoadingSVG from "../../assets/img/loading.svg";

export default () => {
    return (<div key={0} style={{textAlign: "center", marginTop: "5px"}}>
        <img style={{verticalAlign: "middle", width: "7vh", "height": "auto"}} src={LoadingSVG}/>
        <span style={{fontSize: "1.2em"}}>Loading ...</span>
    </div>);
};