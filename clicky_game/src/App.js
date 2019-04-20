//imports dependencies and files
import React, { Component } from "react";
import Navbar from "./components/Navbar";
import Jumbotron from "./components/Jumbotron";
import FriendCard from "./components/FriendCard";
import meme from "./meme.json";
import "./App.css";

//sets state to 0 or empty
class App extends Component {
  state = {
    meme,
    clickedMeme: [],
    score: 0
  };

//when you click on a card the meme is taken out of the array
  imageClick = event => {
    const currentMeme = event.target.alt;
    const MemeAlreadyClicked =
      this.state.clickedMeme.indexOf(currentMeme) > -1;

//if you click on a meme that has already been selected, the game is reset and cards reordered
    if (MemeAlreadyClicked) {
      this.setState({
        meme: this.state.meme.sort(function(a, b) {
          return 0.5 - Math.random();
        }),
        clickedMeme: [],
        score: 0
      });
        alert("You lose. Play again?");

//if you click on an available meme, your score is increased and cards reordered
    } else {
      this.setState(
        {
          meme: this.state.meme.sort(function(a, b) {
            return 0.5 - Math.random();
          }),
          clickedMeme: this.state.clickedMeme.concat(
            currentMeme
          ),
          score: this.state.score + 1
        },
//if you get all 10 memes correct you get a congrats message and the game resets        
        () => {
          if (this.state.score === 10) {
            alert("You Win!");
            this.setState({
              meme: this.state.meme.sort(function(a, b) {
                return 0.5 - Math.random();
              }),
              clickedMeme: [],
              score: 0
            });
          }
        }
      );
    }
  };

//the order of components to be rendered: navbar, jumbotron, friendcard
  render() {
    return (
      <div>
        <Navbar 
          score={this.state.score}
        />
        <Jumbotron />
        <div className="wrapper">
          {this.state.meme.map(meme => (
            <FriendCard
              imageClick={this.imageClick}
              id={meme.id}
              key={meme.id}
              image={meme.image}
            />
          ))}
        </div>
      </div>
    );
  }
}
export default App;