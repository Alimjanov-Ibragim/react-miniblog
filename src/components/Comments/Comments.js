import React, { Component } from "react";
import "./Comments.css";

export default class Comments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      value: "",
      noteId: this.props.noteId,
      listArray: this.props.comments,
      allNotes: this.props.allNotes
    };

    this.handleInput = this.handleInput.bind(this);
    this.handleInputName = this.handleInputName.bind(this);
    this.handleButton = this.handleButton.bind(this);
  }

  handleInputName = event => {
    this.setState({
      name: event.target.value
    });
  };

  handleInput = event => {
    this.setState({
      value: event.target.value
    });
  };

  handleButton = () => {
    let listCopy = [...this.state.listArray];
    let listId = listCopy.length + 1;
    listCopy.push({
      id: listId,
      name: this.state.name,
      text: this.state.value
    });
    this.setState({
      listArray: listCopy,
      name: "",
      value: ""
    });

    let commentCopyArray = [...this.state.allNotes];
    let comId = this.state.noteId - 1;
    commentCopyArray[comId].comments.push({
      id: listId,
      name: this.state.name,
      text: this.state.value
    });
    commentCopyArray[comId].countComments =
      commentCopyArray[comId].comments.length;

    localStorage.setItem("notesArray", JSON.stringify(commentCopyArray));
  };

  handleDelete = props => {
    let listCopy = this.state.listArray;
    listCopy.splice(props, 1);
    this.setState({
      listArray: listCopy
    });

    let commentCopyArray = [...this.state.allNotes];
    let comId = this.state.noteId - 1;
    commentCopyArray[comId].comments.splice(props, 1);

    commentCopyArray[comId].countComments =
      commentCopyArray[comId].comments.length;

    localStorage.setItem("notesArray", JSON.stringify(commentCopyArray));
  };

  render() {
    return (
      <div className="Comments">
        <div className="Comments-title list">Список комментариев</div>
        <ul className="Comments-ul">
          {this.state.listArray.length > 0 ? (
            this.state.listArray.map((note, index) => (
              <li key={index}>
                <div className="Comments-name">{note.name}</div>
                <div className="Comments-text">{note.text}</div>
                <div
                  className="Comments-delete"
                  onClick={() => this.handleDelete(index)}
                >
                  Удалить
                </div>
              </li>
            ))
          ) : (
            <div>Пусто</div>
          )}
        </ul>
        <div className="Comments-title">Оставить комментарий</div>
        <div className="Comments-elements">
          <label htmlFor="name">Имя</label>
          <input
            id="name"
            type="text"
            className="Comments-input"
            value={this.state.name}
            onChange={this.handleInputName}
          />
          <label htmlFor="comment">Текст</label>
          <textarea
            id="comment"
            className="Comments-textarea"
            value={this.state.value}
            onChange={this.handleInput}
          />
          <input
            type="button"
            className="Comments-button"
            onClick={this.handleButton}
            value="Добавить"
            placeholder="Добавить"
          />
        </div>
      </div>
    );
  }
}
