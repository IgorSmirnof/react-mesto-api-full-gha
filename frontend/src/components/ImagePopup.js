import React from "react";
import Popup from "./Popup";

function ImagePopup({ card, onClose, isOpen, name }) {
  // console.log(isOpen, card, name);

  return (
    
    
    <Popup
      isOpen={card}
      name={name}
      onClose={onClose}
      card={card}
      container='figure'
    >
      {/* <figure className="popup__figure"> */}
         <img
           src={card ? card.link : ""}
           alt={card ? card.name : ""}
           className="popup__full"
         />
         <figcaption className="popup__caption">
           {card ? card.name : ""}
         </figcaption>
      {/* </figure> */}
      
    </Popup>
  );
}

export default ImagePopup;
