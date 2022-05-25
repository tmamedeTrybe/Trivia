import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { fetchTokenThunk } from '../redux/actions';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
    };
  }

  onChange = ({ target }) => {
    this.setState({
      [target.name]: target.value,
    });
  }

  buttonStatus = () => {
    const { name, email } = this.state;

    return (name.length > 0) && (email.length > 0);
  }

  render() {
    const checkStatus = this.buttonStatus();

    const {
      name,
      email,
    } = this.state;

    const {
      getPlayerToken,
    } = this.props;
    return (
      <form>
        <label htmlFor="nameInput">
          Nome do Jogador:
          <input
            type="text"
            id="nameInput"
            data-testid="input-player-name"
            name="name"
            value={ name }
            onChange={ this.onChange }
          />
        </label>

        <label htmlFor="emailInput">
          Email do Gravatar:
          <input
            type="email"
            id="emailInput"
            data-testid="input-gravatar-email"
            name="email"
            value={ email }
            onChange={ this.onChange }
          />
        </label>

        <Link to="/game">
          <button
            type="button"
            disabled={ !checkStatus }
            data-testid="btn-play"
            onClick={ () => getPlayerToken(this.state) }
          >
            Play
          </button>
        </Link>
        <Link to="/settings">
          <button
            type="button"
            data-testid="btn-settings"
          >
            Settings
          </button>
        </Link>
      </form>
    );
  }
}

Login.propTypes = {
  getPlayerToken: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  getPlayerToken: (state) => dispatch(fetchTokenThunk(state)),
});

export default connect(null, mapDispatchToProps)(Login);
