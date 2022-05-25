import React from 'react';

class Game extends React.Component {
  componentDidMount() {
    this.fetchQuestions();
  }

  fetchQuestions = async () => {
    const token = localStorage.getItem('token');
    const apiData = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
    const result = await apiData.json();
    if (result.response_code === 0) return '';
  }

  render() {
    return (
      <h2>Tela de Jogo</h2>
    );
  }
}

export default Game;
