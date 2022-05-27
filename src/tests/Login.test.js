import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import App from '../App.js'
// import { expect } from '@jest/globals';
require('../mocks/fetchSimulator')

const userTokenUrl = 'https://opentdb.com/api_token.php?command=request';

const fetchUserToken = async (url) => {  
  if (url === undefined) {
    throw new Error('You must provide an url');
  }   
  const response = await fetch(url);
  const data = await response.json();
  return data;  
};

const userToken = "44fe45813c8ea2f92f519bac70ae113f4db26c09788deca0879678cf90a1335f";
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
    global.localStorage = jest.fn()
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
    it('Ao clicar em Play a função fetch é chamada', () => {
    renderWithRouterAndRedux(<App/>);

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

    expect(fetch).toHaveBeenCalled();

    })
    // it('Testa endpoint se endpoint da API é o correto', () => {
    //   renderWithRouterAndRedux(<App/>);
  
    //   const nameInput = screen.getByRole('textbox', {name: /nome/i});
    //   expect(nameInput).toBeInTheDocument();
  
    //   const emailInput = screen.getByRole('textbox', {name: /email/i});
    //   expect(emailInput).toBeInTheDocument();
  
    //   userEvent.type(nameInput, 'daniel');
    //   expect(nameInput).toHaveValue('daniel');
  
  
    //   userEvent.type(emailInput, 'daniel@trybe.com');
    //   expect(emailInput).toHaveValue('daniel@trybe.com');
  
    //   const playButton = screen.getByRole('button', {name: /play/i});
    //   expect(playButton).toBeInTheDocument();
  
    //   userEvent.click(playButton);
  
    //   expect(fetch(userTokenUrl)).toHaveBeenCalledWith(userTokenUrl)
  
    //   // // expect(localStorage).toHaveBeenCalled();
    //   // history.push( '/game');
  
    //   // renderWithRouterAndRedux(<App/>, null, '/game');
  
    //   //https://stackoverflow.com/questions/21418580/what-is-the-difference-between-before-and-beforeeach
    //   // expect(window.location.pathname).toBe('/game');
    //   }) 
  

}) 