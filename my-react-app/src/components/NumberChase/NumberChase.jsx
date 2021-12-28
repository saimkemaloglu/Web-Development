import React, {useState} from "react";

//Create target number
var target = String(Math.floor(Math.random()*10000));
if(target.length<4){
  var diff = 4-target.length;
  for(let i=0;i<diff;i++){
    target = "0"+target;
  }
}
const targetNumber = target;
var trial = 0;
console.log("target number: " + targetNumber);



function NumberChase(){

  const[boxVal1,setBox1] = useState('');
  const[boxVal2,setBox2] = useState('');
  const[boxVal3,setBox3] = useState('');
  const[boxVal4,setBox4] = useState('');
  const[resultsItem,setResultsItem] = useState([]);

  function handleSetBox(e){
    e.preventDefault();
    var x = e.target.value;
    if(!isNaN(parseInt(x))){
      if(0 <= parseInt(x) <= 9){
        return x;
      }else{
        return '';
      }
    }else{
      return '';
    }    
  } 
  function handleResults(newItem){
    console.log(newItem);
    setResultsItem(prevItems => {
      return [...prevItems,newItem];
    });
  }

  function handleSubmit(){
    
    var currNumber = boxVal1+boxVal2+boxVal3+boxVal4;      
    var inPlace = 0;
    var exists = 0;
    var notExists = 0;
    console.log("currNumber ="+ currNumber);
      for (let i=0; i<currNumber.length;i++){
        if(targetNumber.indexOf(currNumber[i]) >= 0){
          exists ++;
        }else{
          notExists ++;
        }
      }
      for (let i=0; i<currNumber.length;i++){
      if(targetNumber[i] === currNumber[i]){
        exists --;
        inPlace ++;
      }
    }
    trial ++;
    const parentElement = document.getElementById('resultDiv');
    var element = document.createElement('div');
    if(currNumber === targetNumber){
      
      element.textContent = "You have guessed it correctly in" +trial +"times";
      parentElement.appendChild(element);
      var playAgain = document.createElement('button');
      playAgain.className="checkButton";
      playAgain.innerText="Play Again!";
      playAgain.onclick=e => HandlePlayAgain(e);
      parentElement.appendChild(playAgain)
    }else{
      var newItem = {};
      newItem['key'] = trial;
      newItem['currNumber'] = currNumber;
      newItem['inPlace'] = inPlace;
      newItem['exists'] = exists;
      newItem['notExists'] = notExists;
      handleResults(newItem);
    }
    
    
  }    
  
  function HandlePlayAgain(e){
    e.preventDefault();
    console.log("Came to reload");
    window.location.reload(true);
  }
  

    function SubmitButton(){
      if (boxVal1 && boxVal2 && boxVal3 && boxVal4){
        return <button type="button" className="checkButton" style={{ background: "green"}} onClick={handleSubmit}>Check This!</button>
      } else {
        return <button type="button" className="checkButton" style={{ background: "red"}} disabled>Fill all to Check!</button>
      };
    };

    return (
      <>
      <div style={{position:"sticky"}}  >
      <input className="numberBox" type="text" name="box1" value={boxVal1} onChange={e => setBox1(handleSetBox(e))} maxLength="1"  />
      <input className="numberBox" type="text" name="box2" value={boxVal2} onChange={e => setBox2(handleSetBox(e))} maxLength="1"  />
      <input className="numberBox" type="text" name="box3" value={boxVal3} onChange={e => setBox3(handleSetBox(e))} maxLength="1"  />
      <input className="numberBox" type="text" name="box4" value={boxVal4} onChange={e => setBox4(handleSetBox(e))} maxLength="1"  />
      <SubmitButton/>
      </div>
      <div id="resultDiv"><p className="resultText">Check your first input to see results!</p>
        {resultsItem.map(item => (
          <p className="resultText">Guess : {item.key} | {item.currNumber} | Correct: {item.inPlace} Wrong Place: {item.exists} Does not exists: {item.notExists} </p>
        ))
        }
      </div>
      </>
    )
  
  
}

export default NumberChase;