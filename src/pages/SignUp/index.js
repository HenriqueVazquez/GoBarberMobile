/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/prop-types */
import React, {useRef, useState, useEffect} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {Image} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {signUpRequest} from '~/store/modules/auth/authState';

import logo from '~/assets/logo.png';

import Background from '~/components/Background';

import {
  Container,
  Form,
  FormInput,
  SubmitButton,
  SignLink,
  SignLinkText,
  Error,
  Separator,
} from './styles';

function SignUp({navigation}) {
  const loading = useSelector(state => state.auth.loading);
  const error = useSelector(state => state.auth.error);

  const dispatch = useDispatch();

  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [erroName, setErroName] = useState('teste');
  const [erroEmail, setErroEmail] = useState('');
  const [erroPassword, setErroPassword] = useState('');
  const [erroConfirmPassword, setErroConfirmPassword] = useState('');

  useEffect(() => {
    setErroName(error?.name);
    setErroEmail(error?.email);
    setErroPassword(error?.password);
    setErroConfirmPassword(error?.confirmPassword);
  }, [error]);

  useFocusEffect(
    React.useCallback(() => {
      setErroName('');
      setErroEmail('');
      setErroPassword('');
      setErroConfirmPassword('');
    }, []),
  );

  function handleSubmit() {
    dispatch(signUpRequest({name, email, password, confirmPassword}));
  }

  return (
    <Background>
      <Container>
        <Image source={logo} />
        <Form>
          <FormInput
            icon="person-outline"
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="Digite seu nome completo"
            returnKeyType="next"
            onSubmitEditing={() => emailRef.current.focus()}
            value={name}
            onChangeText={setName}
            onFocus={() => setErroName('')}
          />
          {erroName ? <Error>{erroName}</Error> : null}
          <FormInput
            icon="mail-outline"
            keyboardType="email-address"
            caretHidden={false}
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="Digite seu e-mail"
            returnKeyType="next"
            ref={emailRef}
            onSubmitEditing={() => passwordRef.current.focus()}
            value={email}
            onChangeText={setEmail}
            onFocus={() => setErroEmail('')}
          />
          {erroEmail ? <Error>{erroEmail}</Error> : null}

          <Separator />
          <FormInput
            icon="lock-outline"
            secureTextEntry
            placeholder="Sua senha secreta"
            ref={passwordRef}
            returnKeyType="send"
            onSubmitEditing={handleSubmit}
            value={password}
            onChangeText={setPassword}
            onFocus={() => setErroPassword('')}
          />
          {erroPassword ? <Error>{erroPassword}</Error> : null}

          <FormInput
            icon="lock-outline"
            secureTextEntry
            placeholder="Confirme sua senha secreta"
            ref={confirmPasswordRef}
            returnKeyType="send"
            onSubmitEditing={handleSubmit}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            onFocus={() => setErroConfirmPassword('')}
          />
          {erroConfirmPassword ? <Error>{erroConfirmPassword}</Error> : null}
          <SubmitButton loading={loading} onPress={handleSubmit}>
            Cadastrar
          </SubmitButton>
        </Form>
        <SignLink onPress={() => navigation.navigate('SignIn')}>
          <SignLinkText>Já possuo conta</SignLinkText>
        </SignLink>
      </Container>
    </Background>
  );
}

export default SignUp;
