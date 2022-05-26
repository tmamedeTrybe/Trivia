import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';

class Ranking extends React.Component {
  constructor() {
    super();
    this.state = {
      ranking: [localStorage.getItem('ranking')],
    };
  }

  componentDidMount() {
    this.saveLocalStorage();
  }

  saveLocalStorage = () => {
    const { players } = this.props;
    localStorage.setItem('ranking', players);
  }

  createGravatarImage = (email) => {
    const image = md5(email).toString();
    return image;
  }

  render() {
    const { ranking } = this.state;
    const { email } = this.props;
    return (
      <div>
        <h2>Ranking</h2>
        {
          ranking.map((player, index) => (
            <div key={ player.name }>
              <p
                data-testid={ `player-name-${index}` }
              >
                {player.name}
              </p>
              <p
                data-testid={ `player-score-${index}` }
              >
                {player.score}
              </p>
              <img src={ `https://www.gravatar.com/avatar/${this.createGravatarImage(email)}` } alt={ player.name } />
            </div>
          ))
        }
        <Link to="/">
          <button
            type="button"
            data-testid="btn-go-home"
          >
            Login
          </button>
        </Link>
      </div>

    );
  }
}

const mapStateToProps = (state) => ({
  players: state.player,
  email: state.player.gravatarEmail,
});

Ranking.propTypes = {
  players: PropTypes.objectOf.isRequired,
  email: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Ranking);
