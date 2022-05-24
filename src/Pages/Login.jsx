import { React, Component } from 'react';
import { Link } from 'react-router-dom';

class Login extends Component {
  state = {
    name: '',
    email: '',
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
          >
            Play
          </button>
        </Link>
      </form>
    );
  }
}

export default Login;
