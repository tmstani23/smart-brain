import React from 'react';

class Rank extends React.Component {
  state = {
    emoji: ''
  }
  
  generateEmoji = (entries) => {
    //Get the emoji from aws serverless api
    fetch(`https://mgni27510g.execute-api.us-east-1.amazonaws.com/prod/rank?rank=${entries}`)
      .then(res => res.json())
      // add emoji to component state
      .then(data => this.setState({emoji: data.input}))
      .catch(console.log)
  }

  componentDidMount() {
    //Get the emoji
    this.generateEmoji(this.props.entries);
  }

  componentDidUpdate(prevProps, prevState) {
    //Update the emoji if the image count is updated
    if(prevProps !== this.props) {
      return null
    }
    this.generateEmoji(this.props.entries);
  }

  render () {
    const { name, entries, pet, age } = this.props;
    
    return (
      <div>
        <div className='white f3'>
          {`${name}, your current entry count is...`}
        </div>
        <div className='white f1'>
          {entries}
        </div>
        <div className='white f3'>
          {`Rank Emoji: ${this.state.emoji}`}
        </div>
        {pet !== null && age !== null
          ? [
              <div className='white f3'>
                {`Your current pet is ${pet}`}
              </div>
            , <div className='white f3'>
                {`Your age is ${age}`}
              </div>
            ]
          : null

        }
      </div>
    );
  }
}

export default Rank;