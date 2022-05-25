import { fireEvent, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import App from '../App.js'

// const INITIAL_STATE = {
//   player: '',
//   assertions: '',
//   score: '',
//   gravatarEmail: '',
// };

describe('Testa a tela de login', () => {
  it('Tem 2 inputs e 2 botões na tela', () => {
    renderWithRouterAndRedux(<App/>)

    const inputs = screen.getAllByRole('textbox');
    expect(inputs).toHaveLength(2);
    
    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(2);  
  })
  it('Botão "Play" está desabilitado ao iniciar a página', () => {
    renderWithRouterAndRedux(<App/>)

    const playButton = screen.getByRole('button', {name: /play/i});
    expect(playButton).toHaveAttribute('disabled');
  })
  it('Jogador pode escrever nome e email e clicar em "Play"', () => {
    renderWithRouterAndRedux(<App/>)

    const nameInput = screen.getByRole('textbox', {name: /nome/i});
    expect(nameInput).toBeInTheDocument();
    
    const emailInput = screen.getByRole('textbox', {name: /email/i});
    expect(emailInput).toBeInTheDocument();
    
    userEvent.type(nameInput, 'daniel');
    expect(nameInput).toHaveValue('daniel');

    userEvent.type(emailInput, 'daniel@trybe.com');
    expect(emailInput).toHaveValue('daniel@trybe.com');

    const playButton = screen.getByRole('button', {name: /play/i});
    expect(playButton).toBeInTheDocument();

    userEvent.click(playButton);
  })
    // it('chave do usuário é enviado ao localStorage ao clicar em Play', () => {
    //   // const setItem = await jest.fn()

    //   const { history } = renderWithRouterAndRedux(<App/>, INITIAL_STATE, '/');

    // const nameInput = screen.getByRole('textbox', {name: /nome/i});
    // expect(nameInput).toBeInTheDocument();
    
    // const emailInput = screen.getByRole('textbox', {name: /email/i});
    // expect(emailInput).toBeInTheDocument();
    
    // userEvent.type(nameInput, 'daniel');
    // expect(nameInput).toHaveValue('daniel');

    
    // userEvent.type(emailInput, 'daniel@trybe.com');
    // expect(emailInput).toHaveValue('daniel@trybe.com');

    // const playButton = screen.getByRole('button', {name: /play/i});
    // expect(playButton).toBeInTheDocument();

    // userEvent.click(playButton);

    // // history.push({ location: '/game'});
    // // // // expect(localStorage).toHaveBeenCalled();
    
    // // // // renderWithRouterAndRedux(<App/>, null, '/game');
    
    // // // //https://stackoverflow.com/questions/21418580/what-is-the-difference-between-before-and-beforeeach
    // // expect(window.location.pathname).toBe('/game');
    // }) 
  
})