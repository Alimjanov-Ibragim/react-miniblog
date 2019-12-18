import React, { Component } from "react";
import Comments from "./../Comments/Comments";
import "./Note.css";

export default class Note extends Component {
  constructor(props) {
    super(props);
    const data = JSON.parse(localStorage.getItem("notesArray"));
    let noteId = this.props.match.params.id;
    let noteArray = data.splice(noteId - 1, 1);
    this.state = {
      allNotes: JSON.parse(localStorage.getItem("notesArray")),
      copyNoteArray: noteArray
    };
  }
  render() {
    return (
      <div className="Note">
        <h1 className="Note-title">{this.state.copyNoteArray[0].title}</h1>
        <div className="Note-description">
          {this.state.copyNoteArray[0].description}
        </div>
        <Comments
          comments={this.state.copyNoteArray[0].comments}
          noteId={this.state.copyNoteArray[0].id}
          allNotes={this.state.allNotes}
        />
      </div>
    );
  }
}
