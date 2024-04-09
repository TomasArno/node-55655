import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import buildReqData from '../../utils/buildRequestData.js';

import './index.css';

function Login() {
	const navigate = useNavigate();

	const handleSubmit = (e) => {
		e.preventDefault();

		let data = buildReqData();

		axios
			.post('http://localhost:8080/api/sessions/login', data)
			.then((res) => {
				if (res.data.statusCode == 200) navigate('/');
				else alert(res.data.message);
			})
			.catch((err) => console.log(err));

		e.target.reset();
	};

	return (
		<>
			<h2 className='main_title'>INCIAR SESION</h2>

			<form id='loginForm' className='form' onSubmit={handleSubmit}>
				<div className='field_container'>
					<label htmlFor='email' className='label'>
						Email
					</label>
					<input type='email' className='input' id='email' required />
				</div>
				<div className='field_container'>
					<label htmlFor='password' className='label'>
						Contraseña
					</label>
					<input
						type='password'
						className='input'
						id='password'
						required
					/>
				</div>
				<button id='login' type='submit' className='btn'>
					ACCEDER
				</button>
				<button id='loginGoogle' type='submit' className='btn'>
					ACCEDER CON GOOGLE
				</button>
			</form>
		</>
	);
}

export default Login;