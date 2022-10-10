import { useState,useEffect } from 'react'
//import stylyes
import './App.css'
//import components
import SingleCard from './components/SingleCard'

const cardImages=[
{src:'/img/helmet-1.png'},{src:'/img/potion-1.png'},
{src:'/img/sword-1.png'},{src:'/img/ring-1.png'},{src:'/img/scroll-1.png'},
{src:'/img/shield-1.png'}

    ]

function App() {
    //initial State at the start of the game
  const [cards,setCards]=useState([])
  const [turns,setTurns]= useState(0)
  const[choiceOne,setChoiceOne]=useState(null)
  const[choiceTwo,setChoiceTwo]=useState(null)
  const[disabled,setDisabled]=useState(false)
  //shuffle cards
  const shuffleCards=()=>{
  const shuffledCards =[...cardImages,...cardImages]
   .sort(()=> Math.random()-0.5)
   .map((card)=>({...card,matched:false,id:Math.random()}))
   setCards(shuffledCards)
   setTurns(0)
   setChoiceOne(null)
   setChoiceTwo(null)
   setDisabled(false)
   
   //handleChoice function
   
   }//end shuffleCards

   const handleChoice=(card)=>{
    
      choiceOne?setChoiceTwo(card):setChoiceOne(card)
      //you cannot compare values here because it will fire up before the state is updated

   }

   const  resetTurns=()=>{
    setChoiceOne(null)
    setChoiceTwo(null)
    setDisabled(false)
    setTurns((prevState)=>prevState+1)
   }

   useEffect(() => {
    
    if(choiceOne && choiceTwo){
      setDisabled(true)
      if(choiceOne.src == choiceTwo.src){
         setCards((prevCards)=>{
          return prevCards.map((card)=>{
            if(card.src == choiceOne.src){
              return {...card,matched:true}
            }else{
              return card
            }
          })
         })
         
         resetTurns()
      }else
      setTimeout(()=>resetTurns(),1000)
    }
    
   }, [choiceOne,choiceTwo]);

     //we want to start the game automatically

     useEffect(()=>{
         shuffleCards()

     },[])



    return (
        <div className="App"> 
        <h1>Memory Game</h1>  
        <button onClick={shuffleCards}>New Game</button>
          <div className="cards-grid">
            {cards.map((card)=>(
              <SingleCard 
              key={card.id}
              card={card}
              flipped={(card === choiceOne || card === choiceTwo || card.matched)} 
              handleChoice={handleChoice}
              disabled={disabled}
              />
            ))}
            
            
      
          </div>
          <div className="numTurns">
            <h2>Number of turns : {turns}</h2>
          </div>
        </div>
      )
  }

export default App
