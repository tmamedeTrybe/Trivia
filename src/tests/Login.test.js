import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import React from 'react';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import App from '../App.js'

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
  
})