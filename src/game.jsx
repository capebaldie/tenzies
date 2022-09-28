import './App.css'

function Game(props){
  const color = {backgroundColor: props.isHeld ? '#06d6a0' : 'white' }
  return (
    <div className='box' style={color} onClick={props.handleClick}>
      <h2>{props.die}</h2>
    </div>)
}
export default Game
/*
background color is changed by manipu dom
onclick function is defined here
*/
