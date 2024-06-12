import { useContext, useState } from 'react';
import { CssVarsProvider } from '@mui/joy/styles';
import GlobalStyles from '@mui/joy/GlobalStyles';
import CssBaseline from '@mui/joy/CssBaseline';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Divider from '@mui/joy/Divider';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Link from '@mui/joy/Link';
import Input from '@mui/joy/Input';
import Typography from '@mui/joy/Typography';
import Stack from '@mui/joy/Stack';
import GoogleIcon from './googleIcon';
import FormHelperText from '@mui/joy/FormHelperText';
import InfoOutlined from '@mui/icons-material/InfoOutlined';

import { GlobalContext } from '../../main';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Auth({ path = "login", }) {
    const navigate = useNavigate();

    const { setEmail, setLoggedIn, setIsRegistered, getState } = useContext(GlobalContext)
    const { email, isRegistered } = getState()

    const [triesEnterPassword, setTriesEnterPassword] = useState(0)

    const handleLogin = (e) => {
        e.preventDefault();

        const formElements = e.currentTarget.elements;
        const data = {
            email: formElements.email.value,
            password: formElements.password.value
        };

        axios
            .post('http://localhost:8080/api/sessions/login', data)
            .then((res) => {
                if (res.data.statusCode == 200) {
                    setLoggedIn()
                    navigate("/")
                } else if (res.data.message.includes("Not verified")) {
                    setEmail(data.email)
                    setIsRegistered(true)
                    navigate("/register")
                }
                else {
                    setTriesEnterPassword(triesEnterPassword + 1)
                }
            })
            .catch((err) => console.log(err));
    }

    const handleRegister = (e) => {
        e.preventDefault();

        const formElements = e.currentTarget.elements;
        const data = {
            name: formElements.name.value,
            email: formElements.email.value,
            password: formElements.password.value
        };

        axios.post('http://localhost:8080/api/sessions/register', data)
            .then((res) => {
                if (res.data.statusCode == 201) {
                    setIsRegistered(true)
                    setEmail(data.email)
                }
                else alert(res.data.message);
            })
            .catch((err) => console.log(err));

        e.target.reset();
    };

    const handleVerification = (e) => {
        e.preventDefault();
        const formElements = e.currentTarget.elements;
        const data = {
            email,
            verifyCode: formElements.verify.value
        };

        axios.post('http://localhost:8080/api/sessions/', data, { withCredentials: true })
            .then((res) => {
                if (res.data.statusCode == 200) navigate('/login');
                else alert(res.data.message);
            })
            .catch((err) => console.log(err));

        e.target.reset();
    };


    return (<CssVarsProvider defaultMode="light" disableTransitionOnChange>
        <CssBaseline />
        <GlobalStyles
            styles={{
                ':root': {
                    '--Form-maxWidth': '800px',
                    '--Transition-duration': '0.4s', // set to `none` to disable transition
                },
            }}
        />
        <Box
            sx={(theme) => ({
                width: { xs: '100%', md: '50vw' },
                transition: 'width var(--Transition-duration)',
                transitionDelay: 'calc(var(--Transition-duration) + 0.1s)',
                position: 'relative',
                zIndex: 1,
                display: 'flex',
                justifyContent: 'flex-end',
                backdropFilter: 'blur(12px)',
                backgroundColor: 'rgba(255 255 255 / 0.2)',
                [theme.getColorSchemeSelector('light')]: {
                    backgroundColor: 'rgba(19 19 24 / 0.4)',
                },
            })}
        >
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    minHeight: '100dvh',
                    width: '100%',
                    px: 2,
                }}
            >
                <Box
                    component="main"
                    sx={{
                        my: 'auto',
                        py: 2,
                        pb: 5,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2,
                        width: 400,
                        maxWidth: '100%',
                        mx: 'auto',
                        borderRadius: 'sm',
                        '& form': {
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 2,
                        },
                        [`& .MuiFormLabel-asterisk`]: {
                            visibility: 'hidden',
                        },
                    }}
                >
                    <Stack gap={4} sx={{ mb: 2 }}>
                        <Stack gap={1}>
                            <Typography component="h1" level="h3">
                                {path == "login" ? "Iniciar sesión" : "Registrarse"}
                            </Typography>
                            <Typography level="body-sm">
                                {path == "login" ? "No tienes cuenta?" : "Ya tienes cuenta?"}
                                {' '}
                                <Link href={path == "login" ? "register" : "login"} level="title-sm">
                                    {path == "login" ? "Registrarse" : "Iniciar sesión"}
                                </Link>
                            </Typography>
                        </Stack>
                        <Button
                            variant="soft"
                            color="neutral"
                            fullWidth
                            startDecorator={<GoogleIcon />}
                        >
                            Continue with Google
                        </Button>
                    </Stack>
                    <Divider
                        sx={(theme) => ({
                            [theme.getColorSchemeSelector('light')]: {
                                color: { xs: '#FFF', md: 'text.tertiary' },
                            },
                        })}
                    >
                        ó
                    </Divider>
                    <Stack gap={4} sx={{ mt: 2 }}>
                        <form onSubmit={(event) => (path == "login") ? handleLogin(event) : !isRegistered ? handleRegister(event) : handleVerification(event)}>
                            {!isRegistered ?
                                <>
                                    {path == "register" ?
                                        <FormControl required>
                                            <FormLabel>Nombre completo</FormLabel>
                                            <Input type="text" name="name" />
                                        </FormControl>
                                        :
                                        ""
                                    }

                                    <FormControl error={path == "login" && triesEnterPassword > 0} required>
                                        <FormLabel>Email</FormLabel>
                                        <Input type="email" name="email" />
                                        {
                                            triesEnterPassword > 0 ?
                                                <FormHelperText>
                                                    <InfoOutlined />
                                                    Revisa tus datos.
                                                </FormHelperText>
                                                :
                                                ""
                                        }
                                    </FormControl>

                                    <FormControl error={path == "login" && triesEnterPassword > 0} required>
                                        <FormLabel>Contraseña</FormLabel>
                                        <Input type="password" name="password" />
                                        {
                                            triesEnterPassword > 0 ?
                                                <FormHelperText>
                                                    <InfoOutlined />
                                                    Revisa tus datos.
                                                </FormHelperText>
                                                :
                                                ""
                                        }
                                    </FormControl>
                                </>

                                :

                                <FormControl error={triesEnterPassword > 0} required>
                                    <FormLabel>Verificación por mail</FormLabel>
                                    <Input type="text" name="verify" />
                                    {
                                        triesEnterPassword > 0 ?
                                            <FormHelperText>
                                                <InfoOutlined />
                                                Revisa tus datos.
                                            </FormHelperText>
                                            :
                                            ""
                                    }
                                </FormControl>
                            }
                            <Stack gap={4} sx={{ mt: 2 }}>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                    }}
                                >
                                    {path == "login" ? <Link level="title-sm" href="#replace-with-a-link">
                                        Olvidaste tu contraseña?
                                    </Link> : ""}
                                </Box>
                                <Button type="submit" fullWidth>
                                    {path == "register" ? console.log(isRegistered) : ""}
                                    {path == "login" ? "Iniciar sesión" : !isRegistered ? "Registrarse" : "Verificar código"}
                                </Button>
                            </Stack>
                        </form>
                    </Stack>
                </Box>
                <Box component="footer" sx={{ py: 3 }}>
                    <Typography level="body-xs" textAlign="center">
                        © Proteo Software
                    </Typography>
                </Box>
            </Box>
        </Box>
        <Box
            sx={(theme) => ({
                height: '100%',
                position: 'fixed',
                right: 0,
                top: 0,
                bottom: 0,
                left: { xs: 0, md: '50vw' },
                transition:
                    'background-image var(--Transition-duration), left var(--Transition-duration) !important',
                transitionDelay: 'calc(var(--Transition-duration) + 0.1s)',
                backgroundColor: 'background.level1',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                backgroundImage:
                    'url(https://images.unsplash.com/photo-1527181152855-fc03fc7949c8?auto=format&w=1000&dpr=2)',
                [theme.getColorSchemeSelector('light')]: {
                    backgroundImage:
                        'url(https://images.unsplash.com/photo-1572072393749-3ca9c8ea0831?auto=format&w=1000&dpr=2)',
                },
            })}
        />
    </CssVarsProvider>
    );
}

export default Auth

