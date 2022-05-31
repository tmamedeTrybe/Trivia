// import React from 'react';
// import PropTypes from 'prop-types';
// import { Link } from 'react-router-dom';
// import { connect } from 'react-redux';
// import md5 from 'crypto-js/md5';

// class Ranking extends React.Component {
//   constructor() {
//     super();
//     this.state = {
//       ranking: [localStorage.getItem('ranking')],
//     };
//   }

//   componentDidMount() {
//     this.saveLocalStorage();
//     console.log();
//   }

//   saveLocalStorage = () => {
//     const { players } = this.props;
//     localStorage.setItem('ranking', players);
//   }

//   createGravatarImage = (email) => {
//     const image = md5(email).toString();
//     return image;
//   }

//   render() {
//     const { ranking } = this.state;
//     const { email } = this.props;
//     return (
//       <div>
//         <h2 data-testid="ranking-title">Ranking</h2>
//         {
//           ranking.map((player, index) => (
//             <div key={ player.name }>
//               <p
//                 data-testid={ `player-name-${index}` }
//               >
//                 {player.name}
//               </p>
//               <p
//                 data-testid={ `player-score-${index}` }
//               >
//                 {player.score}
//               </p>
//               <img src={ `https://www.gravatar.com/avatar/${this.createGravatarImage(email)}` } alt={ player.name } />
//             </div>
//           ))
//         }
//         <Link to="/">
//           <button
//             type="button"
//             data-testid="btn-go-home"
//           >
//             Login
//           </button>
//         </Link>
//       </div>

//     );
//   }
// }

// const mapStateToProps = (state) => ({
//   players: state.player,
//   email: state.player.gravatarEmail,
// });

// Ranking.propTypes = {
//   players: PropTypes.shape(PropTypes.any).isRequired,
//   email: PropTypes.string.isRequired,
// };

// export default connect(mapStateToProps)(Ranking);

// import { connect } from 'react-redux';
// import propTypes from 'prop-types';
// import md5 from 'crypto-js/md5';
import { Link } from 'react-router-dom';
import React from 'react';
import { getRanking } from '../LocalStorage/rankingStorage';
import styles from './Ranking.module.css';

class Ranking extends React.Component {
  constructor() {
    super();
    this.state = {
      ranking: [],
    };
  }

  componentDidMount() {
    this.getRankingToState();
  }

  getRankingToState = () => {
    const ranking = getRanking();
    ranking.sort((a, b) => b.userScore - a.userScore);
    this.setState({ ranking });
  }

  render() {
    const { ranking } = this.state;
    console.log('from state', ranking);
    return (
      <div className={ styles.container }>
        <header className={ styles.header }>
          <h1>Trivia</h1>
        </header>
        <main className={ styles.main }>
          <hr />
          <h2 data-testid="ranking-title">Ranking</h2>
          <hr />
          <Link to="/">
            <button
              type="button"
              data-testid="btn-go-home"
            >
              Login
            </button>
          </Link>
          <ol className={ styles.list }>
            {
              ranking.map((player, index) => (
                <li
                  key={ index }
                >
                  <img
                    src={ player.gravatar }
                    alt="Avatar do jogador"
                  />
                  <p
                    data-testid={ `player-name-${index}` }
                  >
                    { player.userName }
                  </p>
                  <p
                    data-testid={ `player-score-${index}` }
                  >
                    { player.userScore }
                  </p>
                </li>
              ))
            }
          </ol>
        </main>
      </div>
    );
  }
}

export default Ranking;
