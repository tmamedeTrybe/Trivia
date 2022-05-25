import { fireEvent, screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import React from 'react';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import App from '../App.js'
import userEvent from '@testing-library/user-event';


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
  it('Jogador pode escrever nome e email', () => {
    renderWithRouterAndRedux(<App/>)

    const nameInput = screen.getByRole('textbox', {name: /nome/i});
    expect(nameInput).toBeInTheDocument();
    
    const emailInput = screen.getByRole('textbox', {name: /email/i});
    expect(emailInput).toBeInTheDocument();
    
    fireEvent.change(nameInput, {target: {value: 'daniel'}})
    // userEvent.type(nameInput, 'daniel');
    expect(nameInput).toHaveValue('daniel');

    fireEvent.change(emailInput, {target: {value: 'daniel@trybe.com'}})
    // userEvent.type(emailInput, 'daniel');
    expect(emailInput).toHaveValue('daniel@trybe.com');
    it('Informações do usuário são enviados ao localStorage ao clicar em Play', () => {
      renderWithRouterAndRedux(<App/>)

    const nameInput = screen.getByRole('textbox', {name: /nome/i});
    expect(nameInput).toBeInTheDocument();
    
    const emailInput = screen.getByRole('textbox', {name: /email/i});
    expect(emailInput).toBeInTheDocument();
    
    fireEvent.change(nameInput, {target: {value: 'daniel'}})
    // userEvent.type(nameInput, 'daniel');
    expect(nameInput).toHaveValue('daniel');

    fireEvent.change(emailInput, {target: {value: 'daniel@trybe.com'}})
    // userEvent.type(emailInput, 'daniel');
    expect(emailInput).toHaveValue('daniel@trybe.com');

    const playButton = screen.getByRole('button', {name: /play/i});
    // userEvent.click(playButton)
    fireEvent.click(playButton);
    })
  })
  
})