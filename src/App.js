import { useEffect, useState } from 'react'
import { nanoid } from 'nanoid'
import NotesList from "./components/NotesList";
import Search from './components/Search';
import Header from './components/header';


//hooks used are useState and useEffect 
const App = () =>{
  const [notes, setNotes] = useState([{
    id:nanoid(),
    text:"This is my first note",
    date: " 15/12/23",
  },
  {
    id:nanoid(),
    text:"This is my second note",
    date: " 15/12/23",
  },
  {
    id:nanoid(),
    text:"This is my third note",
    date: " 15/12/23",
  },
]);

  const [searchText, setSearchText] = useState('');
  
  const [darkMode, setDarkMode]= useState('');
 

  
useEffect(() =>{ 
  const savedNotes = JSON.parse(
    localStorage.getItem('react-notes-app-data')
    );

if(savedNotes){
  setNotes(savedNotes);
}
}, []);
 
//  useEffect(() => {
//   localStorage.setItem(
// 			'react-notes-app-data',
// 			JSON.stringify(notes)
// 		);
// 	}, [notes]);


  const addNote = (text) =>{
     const date=new Date();
     const newNote={
      id: nanoid(),
      text:text,
      date:date.toLocaleDateString()
     }
     const newNotes = [...notes,newNote];
     localStorage.setItem(
			'react-notes-app-data',
			JSON.stringify(newNotes)
		);
     setNotes(newNotes)
  }

  //The filter() method does not change the original array.
  const deleteNote = (id) => {
      const newNotes=notes.filter((note)=> note.id !== id);
      setNotes(newNotes);
  } 
 

  return (
    <div className={`${darkMode && `dark-mode`}`}> 
    <div className="container">
    <Header handleToggleDarkMode={setDarkMode}/>
    <Search handleSearchNote={setSearchText} />
    <NotesList 
      notes={notes.filter((note)=>
      note.text.toLowerCase().includes(searchText)
      )}
     handleAddNote={addNote}
     handleDeleteNote={deleteNote}
     />
  </div>
  </div>
  );
};

export default  App;