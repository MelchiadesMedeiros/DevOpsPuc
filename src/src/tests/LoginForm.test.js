import React from 'react';
import {render, fireEvent} from '@testing-library/react';
import LoginForm from '../components/LoginForm';

describe('LoginForm', () => {

  it('Renderizando o componente', () => {
    const {getByText, getByPlaceholderText} = render(<LoginForm />);
    const emailInput = getByPlaceholderText('Email');
    const passwordInput = getByPlaceholderText('Password');
    const loginButton = getByText('Acessar');

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();
  });

  it('Preenchendo os campos de email e senha', () => {
    const {getByPlaceholderText} = render(<LoginForm />);
    const emailInput = getByPlaceholderText('Email');
    const passwordInput = getByPlaceholderText('Password');

    fireEvent.change(emailInput, {target: {value: 'eduardo.lino@pucpr.br'}});
    fireEvent.change(passwordInput, {target: {value: '123456'}});

    expect(emailInput.value).toBe('eduardo.lino@pucpr.br');
    expect(passwordInput.value).toBe('123456');
  });

  it('Verificando alerta de campos vazios', () => {
    const {getByText} = render(<LoginForm />);
    const loginButton = getByText('Acessar');

    fireEvent.click(loginButton);

    expect(getByText('Preencha todos os campos!')).toBeInTheDocument();
  });

  it('Verificando alerta de usuário ou senha incorretos', () => {
    const {getByPlaceholderText, getByText} = render(<LoginForm />);
    const emailInput = getByPlaceholderText('Email');
    const passwordInput = getByPlaceholderText('Password');
    const loginButton = getByText('Acessar');

    fireEvent.change(emailInput, {target: {value: 'eduardo.lino@pucpr.br'}});
    fireEvent.change(passwordInput, {target: {value: 'wrong_password'}});
    fireEvent.click(loginButton);

    expect(getByText('Usuário ou senha inválidos!')).toBeInTheDocument();
  });

  it('Verificando alerta de login com sucesso', () => {
    const {getByPlaceholderText, getByText} = render(<LoginForm />);
    const emailInput = getByPlaceholderText('Email');
    const passwordInput = getByPlaceholderText('Password');
    const loginButton = getByText('Acessar');

    fireEvent.change(emailInput, {target: {value: 'eduardo.lino@pucpr.br'}});
    fireEvent.change(passwordInput, {target: {value: '123456'}});
    fireEvent.click(loginButton);

    expect(getByText('Acessado com sucesso!')).toBeInTheDocument();
  });
});
