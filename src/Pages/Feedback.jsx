import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import md5 from 'crypto-js/md5';
import { Link } from 'react-router-dom';
import { resetScore } from '../redux/actions';
import { addToRanking, getRanking } from '../LocalStorage/rankingStorage';

class Feedback extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      assertions: 0,
      score: 0,
      gravatarEmail: '',
    };
  }

  componentDidMount() {
    getRanking();
    this.saveRank();
  }

  // COMPONENT WILL AMOUNT > DISPATCH PRA ZERAR GAME
  componentWillUnmount() {
    const { resetPlayerScore } = this.props;
    resetPlayerScore(this.state);
  }

  saveRank = () => {
    const { userName, userScore, userImage } = this.props;
    const gravatar = `https://www.gravatar.com/avatar/${this.createGravatarImage(userImage)}`;
    const player = { gravatar, userName, userScore };
    addToRanking(player);
  }

  createGravatarImage = (email) => {
    const image = md5(email).toString();
    return image;
  }

  render() {
    const { userName, userScore, userImage, userAssertions } = this.props;
    const minScore = 3;
    return (
      <div>
        <header>
          <img
            src={ `https://www.gravatar.com/avatar/${this.createGravatarImage(userImage)}` }
            alt="Foto de jogador"
            data-testid="header-profile-picture"
          />
          <p data-testid="header-player-name">{ userName }</p>
          <p data-testid="header-score">{ userScore }</p>
        </header>
        <div>
          {
            userAssertions < minScore
              ? (
                <p data-testid="feedback-text">
                  Could be better...
                </p>)
              : (
                <p data-testid="feedback-text">
                  Well Done!
                </p>)
          }
        </div>
        <div>
          Placar final:
          <p data-testid="feedback-total-score">{Number(userScore)}</p>
          Número de acertos
          <p data-testid="feedback-total-question">{ Number(userAssertions) }</p>
        </div>
        <Link to="/">
          <button
            type="button"
            data-testid="btn-play-again"
            id="playAgain"
          >
            Play Again
          </button>
        </Link>

        <Link to="/ranking">
          <button
            type="button"
            data-testid="btn-ranking"
          >
            Ranking
          </button>
        </Link>
      </div>);
  }
}

const mapStateToProps = (state) => ({
  userName: state.player.name,
  userAssertions: state.player.assertions,
  userImage: state.player.gravatarEmail,
  userScore: state.player.score,
});

const mapDispatchToProps = (dispatch) => ({
  resetPlayerScore: (state) => dispatch(resetScore(state)),
});

Feedback.propTypes = {
  userName: propTypes.string.isRequired,
  userAssertions: propTypes.number.isRequired,
  userImage: propTypes.string.isRequired,
  userScore: propTypes.number.isRequired,
  resetPlayerScore: propTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Feedback);
