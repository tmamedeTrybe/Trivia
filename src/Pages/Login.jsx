import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { fetchToken } from '../redux/actions';
import styles from './Login.module.css';

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

  getUserToken = async (state) => {
    const { getPlayerToken, history } = this.props;
    const apiData = await fetch('https://opentdb.com/api_token.php?command=request');
    const result = await apiData.json();
    localStorage.setItem('token', result.token);
    getPlayerToken(state);
    history.push('/game');
  }

  render() {
    const checkStatus = this.buttonStatus();

    const {
      name,
      email,
    } = this.state;
    return (
      <div className={ styles.container }>
        <header className={ styles.logo }>
          <h1>Trivia</h1>
        </header>
        <form className={ styles.form }>
          <div>
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
          </div>
          <div className={ styles.buttons }>
            <button
              type="button"
              disabled={ !checkStatus }
              data-testid="btn-play"
              onClick={ () => this.getUserToken(this.state) }
              className={ styles.buttonPlay }
            >
              Play
            </button>
            <Link to="/settings">
              <button
                type="button"
                data-testid="btn-settings"
                className={ styles.buttonSettings }
              >
                Settings
              </button>
            </Link>
          </div>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  getPlayerToken: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  getPlayerToken: (state) => dispatch(fetchToken(state)),
});

export default connect(null, mapDispatchToProps)(Login);
