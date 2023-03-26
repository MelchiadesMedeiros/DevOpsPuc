import React, {Component} from 'react';
import './style.scss';

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      loginType: '',
      loginMessage: ''
    };

    this.Login = this.Login.bind(this);
  }

  Login(event) {
    event.preventDefault();

    const {email, password} = this.state;
    const credentials = [
        {id: 1, email: 'eduardo.lino@pucpr.br', password: '123456'}
    ]

    if (email === '' || password === '') {
        this.setState({loginType: 'alert-warning', loginMessage: 'Preencha todos os campos!'});
        return false;
    } else {
        const user = credentials.find((user) => user.email === email && user.password === password);
        if (user) {
            this.setState({loginType: 'alert-success', loginMessage: 'Acessado com sucesso!'});
            return true;
        } else {
            this.setState({loginType: 'alert-danger', loginMessage: 'Usuário ou senha inválidos!'});
            return false;
        }
    }
  }

  handleChange = (event) => {
    this.setState({[event.target.name]: event.target.value});
  }

  render() {
    return (
      <div className='login-component'>
        <h1>Login</h1>
        <form id='login-form'>
          <input type="text" id='email' name="email" placeholder="Email" onChange={(event) => this.handleChange(event)} />
          <input type="password" id='password' name="password" placeholder="Password" onChange={(event) => this.handleChange(event)} />
          <button type="submit" id='login-button' onClick={(event) => this.Login(event)}>Acessar</button>
        </form>
        {this.state.loginType && (
         <div className='alert-div'>
          <span className={this.state.loginType}>{this.state.loginMessage}</span>
         </div>)}
      </div>
    );
  }
}

export default LoginForm;