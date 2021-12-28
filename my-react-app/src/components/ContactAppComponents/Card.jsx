import React from "react";


function Card(props){

    return (
        <div class="card">
        <div>
        <img src={props.pic} alt="" />
        <div class="textsOfCard">
        <h1>{props.name}</h1>
        <p>Phone: {props.phone}</p>
        <p>Email: {props.email}</p></div>
        
        </div>
        </div>
    )
}

export default Card;