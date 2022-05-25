import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import md5 from 'crypto-js/md5';

class Feedback extends React.Component {
  createGravatarImage = (email) => {
    const image = md5(email).toString();
    return image;
  }

  render() {
    const { userName, userScore, userImage } = this.props;
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
      </div>);
  }
}

const mapStateToProps = (state) => ({
  userName: state.player.name,
  userImage: state.player.gravatarEmail,
  userScore: state.player.score,
});

Feedback.propTypes = {
  userName: propTypes.string.isRequired,
  userImage: propTypes.string.isRequired,
  userScore: propTypes.string.isRequired,
};

export default connect(mapStateToProps)(Feedback);
