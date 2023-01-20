import React from "react"
import "./loader.css"

function Loader(){
    return(
        <div>
            {/* <div class="lds-hourglass"></div> */}
        <div class="wrapper">
        <div class="circle"></div>
        <div class="circle"></div>
        <div class="circle"></div>
        <div class="shadow"></div>
        <div class="shadow"></div>
        <div class="shadow"></div>
        <span>Loading</span>
        </div>
        </div>
    )
}

export default Loader