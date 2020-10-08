import React from 'react';

const Rank = ({ name, entries, pet, age }) => {
  
  return (
    <div>
      <div className='white f3'>
        {`${name}, your current entry count is...`}
      </div>
      <div className='white f1'>
        {entries}
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

export default Rank;