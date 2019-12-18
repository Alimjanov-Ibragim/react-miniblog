import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import "./Notes.css";

export default class Notes extends Component {
  constructor(props) {
    super(props);
    const data = JSON.parse(localStorage.getItem("notesArray"));

    this.state = {
      title: "",
      shortDesc: "",
      description: "",
      notesArray: data
        ? data
        : [
            {
              id: 1,
              title: "Как выучить React 1",
              shortDesc: "Тестовое краткое описание",
              description: "Тестовое полное описание",
              countComments: 2,
              comments: [
                {
                  id: 1,
                  name: "Ibragim",
                  text: "sdfsdfls liemre lsdsf albdsbn"
                },
                {
                  id: 2,
                  name: "Kobe",
                  text: "gthfdfdgdfls liemre lsdsf albdsbn"
                }
              ]
            },
            {
              id: 2,
              title: "Как выучить React 2",
              shortDesc: "Тестовое краткое описание",
              description: "Тестовое полное описание",
              countComments: 2,
              comments: [
                {
                  id: 1,
                  name: "Ibragim 2",
                  text: "sdfsdfls liemre lsdsf albdsbn"
                },
                {
                  id: 2,
                  name: "Kobe 2",
                  text: "gthfdfdgdfls liemre lsdsf albdsbn"
                }
              ]
            },
            {
              id: 3,
              title: "Как выучить React 3",
              shortDesc: "Тестовое краткое описание",
              description: "Тестовое полное описание",
              countComments: 2,
              comments: [
                {
                  id: 1,
                  name: "Ibragim 3",
                  text: "sdfsdfls liemre lsdsf albdsbn"
                },
                {
                  id: 2,
                  name: "Kobe 3",
                  text: "gthfdfdgdfls liemre lsdsf albdsbn"
                }
              ]
            }
          ]
    };

    this.handleInputTitle = this.handleInputTitle.bind(this);
    this.handleInputShort = this.handleInputShort.bind(this);
    this.handleInputDesc = this.handleInputDesc.bind(this);
    this.handleButton = this.handleButton.bind(this);

    localStorage.setItem("notesArray", JSON.stringify(this.state.notesArray));
  }

  handleInputTitle = event => {
    this.setState({
      title: event.target.value
    });
  };

  handleInputShort = event => {
    this.setState({
      shortDesc: event.target.value
    });
  };

  handleInputDesc = event => {
    this.setState({
      description: event.target.value
    });
  };

  handleButton = () => {
    let notesArrayCopy = [...this.state.notesArray];
    let notesArrayId = this.state.notesArray.length + 1;
    notesArrayCopy.push({
      id: notesArrayId,
      title: this.state.title,
      shortDesc: this.state.shortDesc,
      description: this.state.description,
      countComments: 0,
      comments: [
        {
          id: 0,
          name: "Пусто",
          text: ""
        }
      ]
    });
    this.setState({
      notesArray: notesArrayCopy,
      title: "",
      shortDesc: "",
      description: ""
    });
    localStorage.setItem("notesArray", JSON.stringify(notesArrayCopy));
  };

  handleDelete = props => {
    let listCopy = this.state.notesArray;
    listCopy.splice(props, 1);
    this.setState({
      notesArray: listCopy
    });

    // let commentCopyArray = [...this.state.allNotes];
    // let comId = this.state.noteId - 1;
    // commentCopyArray[comId].comments.splice(props, 1);

    localStorage.setItem("notesArray", JSON.stringify(listCopy));
  };

  render() {
    return (
      <div className="Notes">
        <h1>Добро пожаловать на мой Мини блог</h1>
        <div className="Notes-lists">
          {this.state.notesArray.map((note, index) => (
            <div className="Notes-col" key={note.title}>
              <div className="Notes-list">
                <NavLink to={"/" + note.id}>
                  <div className="Notes-title">{note.title}</div>
                </NavLink>
                <div className="Notes-shortDesc">{note.shortDesc}</div>
                <div className="Notes-countComments">
                  Число комментариев: <span>{note.countComments}</span>
                </div>
                <div
                  className="Notes-delete"
                  onClick={() => this.handleDelete(index)}
                >
                  Удалить
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="Notes-add">
          <div className="Notes-add-title">Добавить запись</div>
          <div className="Notes-add-elements">
            <label htmlFor="title">Заголовок</label>
            <input
              id="title"
              type="text"
              className="Notes-add-input"
              value={this.state.title}
              onChange={this.handleInputTitle}
            />
            <label htmlFor="shortDesc">Короткое описание</label>
            <textarea
              id="shortDesc"
              className="Notes-add-textarea"
              value={this.state.shortDesc}
              onChange={this.handleInputShort}
            />
            <label htmlFor="description">Полное описание</label>
            <textarea
              id="description"
              className="Notes-add-textarea"
              value={this.state.description}
              onChange={this.handleInputDesc}
            />
            <input
              type="button"
              className="Notes-add-button"
              onClick={this.handleButton}
              value="Добавить"
              placeholder="Добавить"
            />
          </div>
        </div>
      </div>
    );
  }
}
