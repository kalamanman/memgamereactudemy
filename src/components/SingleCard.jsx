import React from 'react'

import './singleCard.css'

const SingleCard = ({card,handleChoice,flipped,disabled}) => {

    

  return (
    <div className='card ' >

                  <div className={flipped?"flipped":""}>
        
                <img src={card.src} 
                alt="front card" className="front" />
                
                <img src="/img/cover.png" 
                alt="back card" className="back" 
                onClick={()=> !disabled && handleChoice(card)}
                />

                 </div>

              </div>
  )
}

export default SingleCard