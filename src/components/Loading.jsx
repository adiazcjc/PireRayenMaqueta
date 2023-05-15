import React from 'react'
import imagen from "../images/cooking.gif"

export default function LoadingPage() {
    return (
        // <div>
        //     <div class="d-flex justify-content-center position-absolute top-50 start-50 translate-middle">
        //         <img src={imagen} style={{ height: "100%", width: "100%" }}></img>
        //     </div>
        // </div>
        <div class="containerLoading">

            <div class="text-center justify-content-center position-absolute top-50 start-50 translate-middle" >
                <div class="spinner-border" role="status" >
                    <span class="visually-hidden">Loading...</span>
                </div>
            </div>
        </div>
    )
}