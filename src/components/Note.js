import React from 'react';

const Note = ({data, toggleImportance}) => {
    const label = data.important
    ? 'make not important' : 'make important'
    return (
        <li>{data.content}<button onClick={toggleImportance}>{label}</button></li>
    )
}

export default Note;