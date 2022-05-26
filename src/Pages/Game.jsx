import React from 'react';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import propTypes from 'prop-types';
import '../Css/Game.css';
import { updateScore } from '../redux/actions/index';

const correctAnswer = 'correct-phase-1';
const wrongAnswer = 'wrong-phase-1';

class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      questions: [],
      questionIndex: 0,
      alternatives: [],
      timer: 30,
      nextBtnIsOn: false,
    };
  }

  async componentDidMount() {
    await this.fetchQuestions();
    this.startTimer();
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
    this.renderQuestion();
  }

  getUserPicture = (email) => {
    const hash = md5(email).toString();
    return `https://www.gravatar.com/avatar/${hash}`;
  }

  changeButtonColor = () => {
    const buttons = document.querySelectorAll('#answer-button');
    buttons.forEach((button) => {
      if (button.className === correctAnswer) {
        button.className = 'correct-phase-2';
      } else if (button.className === wrongAnswer) {
        button.className = 'wrong-phase-2';
      }
      button.disabled = true;
    });
    this.setState({ nextBtnIsOn: true });
  }

  rechangeButtonColor = () => {
    const buttons = document.querySelectorAll('#answer-button');
    buttons.forEach((button) => {
      if (button.className === 'correct-phase-2') {
        button.className = correctAnswer;
      } else if (button.className === 'wrong-phase-2') {
        button.className = wrongAnswer;
      }
      button.disabled = false;
    });
    this.setState({ nextBtnIsOn: false });
  }

  onClickCorrectAnswer = (difficulty) => {
    const { timer } = this.state;
    const { updatePlayerScore } = this.props;
    const points = 10;
    const hard = 3;
    const medium = 2;
    const easy = 1;
    if (difficulty === 'hard') {
      updatePlayerScore(points + (timer * hard));
    } else if (difficulty === 'medium') {
      updatePlayerScore(points + (timer * medium));
    } else if (difficulty === 'easy') {
      updatePlayerScore(points + (timer * easy));
    }
    this.changeButtonColor();
  }

  onClickIncorrectAnswer = () => {
    this.changeButtonColor();
  }

  startTimer = () => {
    const second = 1000;
    setInterval(this.updateTimer, second);
  }

  updateTimer = () => {
    const { timer } = this.state;
    this.setState((prevState) => ({ timer: prevState.timer - 1 }), () => {
      if (timer === 0) {
        this.onClickIncorrectAnswer();
        this.setState({ timer: 30 });
      }
    });
  }

  renderQuestion = () => {
    const number = 0.5;
    const { questions, questionIndex } = this.state;
    const alternatives = questions[questionIndex].incorrect_answers
      .concat(questions[questionIndex].correct_answer).sort(() => Math.random() - number);
    this.setState({ alternatives });
  }

  onClickNextButton = () => {
    const { questionIndex } = this.state;
    const { history } = this.props;
    const length = 4;
    return questionIndex < length
      ? (
        this.setState((prevState) => ({ questionIndex: prevState.questionIndex + 1 }),
          () => {
            this.renderQuestion();
            this.rechangeButtonColor();
          })
      )
      : history.push('/feedback');
  }

  render() {
    const { questions, alternatives, questionIndex, nextBtnIsOn } = this.state;
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
          { questions.length !== 0 && (
            <div className="question">
              <h3 data-testid="question-category">{questions[questionIndex].category}</h3>
              <p data-testid="question-text">{questions[questionIndex].question}</p>
              <div className="answers" data-testid="answer-options">
                {alternatives.map((item, index) => (
                  <button
                    id="answer-button"
                    type="button"
                    key={ index }
                    data-testid={ item === questions[questionIndex].correct_answer
                      ? 'correct-answer' : `wrong-answer-${index}` }
                    className={ item === questions[questionIndex].correct_answer
                      ? correctAnswer : wrongAnswer }
                    onClick={ item === questions[questionIndex].correct_answer
                      ? () => this.onClickCorrectAnswer(questions[questionIndex]
                        .difficulty)
                      : () => this.onClickIncorrectAnswer() }
                  >
                    {item}
                  </button>
                ))}
                { nextBtnIsOn && (
                  <button
                    type="button"
                    data-testid="btn-next"
                    onClick={ () => this.onClickNextButton() }
                  >
                    Next
                  </button>
                )}
              </div>
            </div>
          )}
        </main>
      </>
    );
  }
}

Game.propTypes = {
  name: propTypes.string.isRequired,
  email: propTypes.string.isRequired,
  score: propTypes.number.isRequired,
  updatePlayerScore: propTypes.func.isRequired,
  history: propTypes.shape(propTypes.any).isRequired,
};

const mapStateToProps = (state) => ({
  name: state.player.name,
  email: state.player.gravatarEmail,
  score: state.player.score,
});

const mapDispatchToProps = (dispatch) => ({
  updatePlayerScore: (score) => dispatch(updateScore(score)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);
