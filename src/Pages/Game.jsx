import React from 'react';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import propTypes from 'prop-types';

class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      questions: [],
      questionIndex: 0,
    };
  }

  async componentDidMount() {
    await this.fetchQuestions();
  }

  fetchQuestions = async () => {
    const token = localStorage.getItem('token');
    const apiData = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
    const data = await apiData.json();
    const code = 3;
    if (data.response_code === code) {
      localStorage.removeItem('token');
      window.location.href = '/';
      return '';
    }
    this.setState({ questions: data.results });
  }

  getUserPicture = (email) => {
    const hash = md5(email).toString();
    return `https://www.gravatar.com/avatar/${hash}`;
  }

  renderQuestion = () => {
    const { questions, questionIndex } = this.state;
    const alternatives = questions[questionIndex].incorrect_answers
      .concat(questions[questionIndex].correct_answer).sort();
    return (
      <div className="question">
        <h3 data-testid="question-category">{questions[questionIndex].category}</h3>
        <p data-testid="question-text">{questions[questionIndex].question}</p>
        <div className="answers">
          {alternatives.map((item, index) => (
            <button
              type="button"
              key={ index }
              data-testid={ item === questions[questionIndex].correct_answer
                ? 'correct-answer' : `wrong-answer-${index}` }
            >
              {item}
            </button>
          ))}
        </div>
      </div>
    );
  }

  render() {
    const { questions } = this.state;
    const { name, score, email } = this.props;
    return (
      <>
        <header>
          <img
            src={ this.getUserPicture(email) }
            data-testid="header-profile-picture"
            alt={ `gravatar img of ${name}` }
          />
          <h2 data-testid="header-player-name">{ name }</h2>
          <h2 data-testid="header-score">{ score }</h2>
        </header>
        <main>
          { questions.length !== 0 && this.renderQuestion()}
        </main>
      </>
    );
  }
}

Game.propTypes = {
  name: propTypes.string.isRequired,
  email: propTypes.string.isRequired,
  score: propTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  name: state.player.name,
  email: state.player.gravatarEmail,
  score: state.player.score,
});

export default connect(mapStateToProps, null)(Game);
