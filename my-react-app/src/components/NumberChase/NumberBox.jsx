import React from "react";



function NumberBox(props){

    return (
        <input className="numberBox" type="text" name="box{props.id}" maxLength="1" onKeyPress={(event) => {
            if (!/[0-9]/.test(event.key)) {
              event.preventDefault();
            }
          }}  />
    )
}

export default NumberBox;