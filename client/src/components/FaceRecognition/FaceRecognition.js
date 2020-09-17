import React from 'react';
import './FaceRecognition.css';

class FaceRecognition extends React.Component {
  state = {
    boxes: []
  }
  componentDidUpdate(prevProps) {
    if (prevProps.boxes !== this.props.boxes) {
      
      this.setState({
        boxes: this.props.boxes
      }) 
    }
      
  }
  
  displayFaceBoxes = (box) => {
    
        return (
            box.map((dimensions, i) => {
              return (
                <div className='bounding-box' key={i} style={{top: dimensions.topRow, right: dimensions.rightCol, bottom: dimensions.bottomRow, left: dimensions.leftCol}}></div>
              )
            })
        )
      
    
  }
  render() {
    
    const { imageUrl } = this.props;
    return (
      <div className='center ma'>
        <div className='absolute mt2'>
          <img id='inputimage' alt='' src={imageUrl} width='500px' height='auto'/>
          {
             this.displayFaceBoxes(this.state.boxes)
          }
          
        </div>
      </div>
    );
  }
  
}

export default FaceRecognition;