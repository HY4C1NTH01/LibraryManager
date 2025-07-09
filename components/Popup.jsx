import './Popup.css'

function Popup ({showPopup, closePopup, children}){
    if(showPopup == false){
        return "";
    } else{
return (
    <div className="popup"> 
     <div className='div'>
        <button className="close-btn" onClick={closePopup}>X</button>
        </div>
        {children}
    
    </div>
  )
    }
  
}

export default Popup
