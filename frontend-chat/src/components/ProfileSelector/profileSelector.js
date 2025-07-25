import React from 'react'
import './profileSelector.css'
import boyImage from './boysImages.json';
import girlsImage from './girlsImage.json' ;
const ProfileSelector = ({ handleProfileModalClose ,handleSetImage}) => {
    const handleCloseButton = () => {
        handleProfileModalClose()
    }
    const handleClickImage = (link) =>{
         handleSetImage(link);
         handleProfileModalClose();
    }
    return (
        <div className='profileSelector'>
            <div className='profileCard'>
                <div className='profile-selector-header'>
                    <div style={{color:"var(--text-primary)"}}>Select Profile Image</div>
                    <div style={{ cursor: "pointer", color:"var(--text-primary)"}} onClick={handleCloseButton}> X  </div>
                </div>


                <div className='profile-section'>
                    <div className='profile-section-gender'>
                        {
                            boyImage.map((item,index)=>{
                                return(
                                    <div className='profile-section-gender-div' onClick={()=>handleClickImage(item.link)}>
                                      <img className='profile-section-image ' src={item.link} alt=''/>
                                    </div>
                                );
                            })
                        }
                    </div>
                    <div className='profile-section-gender'>
                        {
                            girlsImage.map((item,index)=>{
                                return(
                                    <div className='profile-section-gender-div' onClick={()=>handleClickImage(item.link)}>
                                      <img className='profile-section-image ' src={item.link} alt=''/>
                                    </div>
                                );
                            })
                        }
                    </div>
                    
                </div>
            </div>
        </div>
    )
}

export default ProfileSelector
