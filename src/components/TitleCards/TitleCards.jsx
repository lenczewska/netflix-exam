import React from 'react'
import './TitleCards.css'
import cards_data from '../../assets/cards/Cards_data'

function TitleCards() {
  return (
    <div className='title-cards pr-[50px] mt-[50px] '>
      <h2 className='mb-[8px]'>Popular on Netflix</h2>
      <div className='card-list overflow-x-scroll flex gap-[8px]'>
        {cards_data.map((card, index) =>{
          return <div className='card relative ' key={index}>
            <img src={card.image} className='card-img max-w-[250px] rounded-[5px] ' alt=""/>
            <p className='absolute right-[10px] bottom-[10px]'>{card.name}</p>
          </div>
        })}
      </div>
      
    </div>
  )
}

export default TitleCards
