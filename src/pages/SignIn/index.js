/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/prop-types */
import React, {useRef, useState, useEffect} from 'react';
import {useFocusEffect} from '@react-navigation/native';

import {Image} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import logo from '~/assets/logo.png';

import Background from '~/components/Background';
import {signInRequest} from '~/store/modules/auth/actions';

import {
  Container,
  Form,
  FormInput,
  SubmitButton,
  SignLink,
  SignLinkText,
  Error,
} from './styles';

function SignIn({navigation}) {
  const dispatch = useDispatch();
  const passwordRef = useRef();

  const loading = useSelector(state => state.auth.loading);
  const error = useSelector(state => state.auth.erroLogin);
  console.tron.log(error);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [erroEmail, setErroEmail] = useState('');
  const [erroPassword, setErroPassword] = useState('');

  useEffect(() => {
    setErroEmail(error?.email);
    setErroPassword(error?.password);
  }, [error]);

  useFocusEffect(
    React.useCallback(() => {
      setErroEmail('');
      setErroPassword('');
    }, []),
  );

  function handleSubmit() {
    dispatch(signInRequest(email, password));
  }

  return (
    <Background>
      <Container>
        <Image source={logo} />
        <Form>
          <FormInput
            icon="mail-outline"
            keyboardType="email-address"
            autoCapitalize="none"
            caretHidden={false}
            placeholder="Digite seu e-mail"
            returnKeyType="next"
            onSubmitEditing={() => passwordRef.current.focus()}
            value={email}
            onChangeText={setEmail}
            onFocus={() => setErroEmail('')}
          />
          {erroEmail ? <Error>{erroEmail}</Error> : null}
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
          <SubmitButton loading={loading} onPress={handleSubmit}>
            Acessar
          </SubmitButton>
        </Form>

        <SignLink onPress={() => navigation.navigate('SignUp')}>
          <SignLinkText>Criar conta gratuita</SignLinkText>
        </SignLink>
      </Container>
    </Background>
  );
}

export default SignIn;
