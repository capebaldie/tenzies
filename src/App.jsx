import './App.css'
import { useState } from 'react'
import { useEffect } from 'react'
import Game from './game'
import NavBar from './nav'
import { nanoid } from 'nanoid' //for generating random id
import Confetti from 'react-confetti'

function App() {

const [value,setValue] = useState(generateValue())  
//pushing properties into an array as objects, because it will be easy for upcomig functions  
const [gameWon,setGameWon] = useState(false)
//for checking if the game has won or not
useEffect(()=>{
  const allHeld = value.every(item=>item.isHeld)// if all the items are selected
  const num = value[0].die
  const finished = value.every(item=>item.die === num) //if all the values are same
  if(allHeld && finished){ // then gamewon === true
    setGameWon(true)
  }
})

function newNumber(){
  return{
    die:Math.ceil(Math.random()*6),
    isHeld:false,
    id:nanoid()
    } //writing generating function as a seperate function for more reusability
}

function generateValue(){
  const arr = []
  for(let i=0; i<10; i++){
    arr.push(newNumber())
  }
  return arr
} 

function randomDice(){ //function for changing dice based on if it id selceted or not selected==true
  if(!gameWon){
    setValue(value=>value.map(item=>{
      return item.isHeld ? item : newNumber()
    })) //if gamewon is false this function will run
  }else{
    setGameWon(false) // if it is true then thisll run starting a new game
    setValue(generateValue())
  }

}

function holdDice(id){ // id is proving for determining the clicked box or else every box will be selected
  setValue(value=>value.map(item=>{
    // if the id of the selected item is same as the clicked id then convert it isheld property to opposite or return the item as it is
    return item.id === id ? {...item,isHeld:!item.isHeld} : item
  }))
}

const eachDice = value.map(item=>{
  return <Game die ={item.die} 
  key ={item.id} 
  isHeld ={item.isHeld}
  handleClick={()=> holdDice(item.id)}/>})
// onclick is actuall defined on game component
  return (
    <div>
    {gameWon && <Confetti/>}
     <NavBar/>
      <main>
      <h1 className="title">Tenzies</h1>
      <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
       <div className="container">
       {eachDice} 
       </div>
       <button onClick={randomDice}>{gameWon ? 'New Game' : 'Roll'}</button>
       {/*change button according to gamewon or not*/}
      </main>
    </div>
  )
}
export default App
