import React, {useState, useEffect} from 'react'
import Note from './components/Note';
import noteService from './services/notes'

function App({data}) {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('new note');
  const [showAll, setShowAll] = useState(true);

  useEffect(() => {
    noteService
      .getAll()
      .then(response => {
        setNotes(response)
      })
  }, [])

  const addNote = (event) => {
    event.preventDefault();
    // const id = Math.max.apply(Math, notes.map(function(o) { return o.id; }));
    // setNotes(notes.concat({id: id + 1, content: newNote, date: new Date().toISOString(), important: Math.random() < 0.5,
    
    const noteObject = {
      content: newNote,
      date: new Date(),
      important: Math.random() < 0.5,
    }
    noteService
    .create(noteObject)
    .then(response => {
      setNotes(notes.concat(response))
      setNewNote('')
    })
  }

  const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important)

  const handleNoteChange = (event) => {
    setNewNote(event.target.value);
  }
  const toggleImportance = (id) => {
    const note = notes.find(n => n.id === id)
    const changedNote = { ...note, important: !note.important }

    noteService
      .update(id, changedNote)
      .then(response => {
        setNotes(notes.map(note => note.id !== id ? note : response))
      })
  }

  return (
    <div className="App">
      <h1>Notes</h1>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          {showAll ? 'Show important' : 'Show all'}
        </button>
      </div>
      <ul>
        {notesToShow.map(item => 
          <Note data={item} key={item.id} toggleImportance={() => toggleImportance(item.id)}/>
        )}
      </ul>
      <form onSubmit={addNote}>
        <input 
        value={newNote}
        onChange={handleNoteChange}
        />
        <button type="submit">save</button>
      </form> 
    </div>
  );
}

export default App;
