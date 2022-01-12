import React from 'react'
import Notes from '../components/Notes';
import AddNote from '../components/AddNote';
const Home = (props) => {
  //destructurig props
  const {showAlert} = props
  return (
    <>
    <AddNote showAlert={props.showAlert}/>
    <h1 className='my-3'>All Notes</h1>
     <Notes showAlert={showAlert}/>
     </>
  );
};

export default Home;
