/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-no-bind */
import React, {useState, useRef, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {useFocusEffect} from '@react-navigation/native';

import {updateProfileRequest} from '~/store/modules/user/actions';
import {signOut} from '~/store/modules/auth/actions';

import Background from '~/components/Background';

import {
  Container,
  Title,
  Form,
  FormInput,
  Separator,
  SubmitButton,
  LogoutButton,
  Error,
} from './styles';

function Profile() {
  const dispatch = useDispatch();
  const profile = useSelector(state => state.user.profile);
  const error = useSelector(state => state.user.error);

  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const oldPasswordRef = useRef();

  const [name, setName] = useState(profile.name);
  const [email, setEmail] = useState(profile.email);
  const [oldPassword, setOldPassword] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [erroName, setErroName] = useState('');
  const [erroEmail, setErroEmail] = useState('');
  const [erroOldPassword, setErroOldPassword] = useState('');
  const [erroPassword, setErroPassword] = useState('');
  const [erroConfirmPassword, setErroConfirmPassword] = useState(
    error.confirmPassword,
  );
  useFocusEffect(
    React.useCallback(() => {
      setName(profile.name);
      setEmail(profile.email);
      setOldPassword('');
      setPassword('');
      setConfirmPassword('');
      setErroName('');
      setErroEmail('');
      setErroOldPassword('');
      setErroPassword('');
      setErroConfirmPassword('');
    }, [profile]),
  );

  useEffect(() => {
    setErroName(error?.name);
    setErroEmail(error?.email);
    setErroOldPassword(error?.oldPassword);
    setErroPassword(error?.password);
    setErroConfirmPassword(error?.confirmPassword);
  }, [profile, error]);

  useEffect(() => {
    setOldPassword('');
    setPassword('');
    setConfirmPassword('');
    setErroName('');
    setErroEmail('');
    setErroOldPassword('');
    setErroPassword('');
    setErroConfirmPassword('');
  }, [profile]);

  function handleSubmit() {
    dispatch(
      updateProfileRequest({
        name,
        email,
        oldPassword,
        password,
        confirmPassword,
      }),
    );
  }

  function handleLogout() {
    dispatch(signOut());
  }

  return (
    <Background>
      <Container>
        <Title>Meu Perfil</Title>
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
            ref={emailRef}
            returnKeyType="next"
            onSubmitEditing={() => oldPasswordRef.current.focus()}
            value={email}
            onChangeText={setEmail}
            onFocus={() => setErroEmail('')}
          />
          {erroEmail ? <Error>{erroEmail}</Error> : null}

          <Separator />
          <FormInput
            icon="lock-outline"
            secureTextEntry
            placeholder="Sua senha atual"
            ref={oldPasswordRef}
            returnKeyType="next"
            onSubmitEditing={() => passwordRef.current.focus()}
            value={oldPassword}
            onChangeText={setOldPassword}
            onFocus={() => setErroOldPassword('')}
          />
          {erroOldPassword ? <Error>{erroOldPassword}</Error> : null}
          <FormInput
            icon="lock-outline"
            secureTextEntry
            placeholder="Sua nova senha"
            ref={passwordRef}
            returnKeyType="next"
            onSubmitEditing={() => confirmPasswordRef.current.focus()}
            value={password}
            onChangeText={setPassword}
            onFocus={() => setErroPassword('')}
          />
          {erroPassword ? <Error>{erroPassword}</Error> : null}
          <FormInput
            icon="lock-outline"
            secureTextEntry
            placeholder="Sua senha secreta"
            ref={confirmPasswordRef}
            returnKeyType="send"
            onSubmitEditing={handleSubmit}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            onFocus={() => setErroConfirmPassword('')}
          />
          {erroConfirmPassword ? <Error>{erroConfirmPassword}</Error> : null}
          <SubmitButton onPress={handleSubmit}>Atualizar Perfil</SubmitButton>
          <LogoutButton onPress={handleLogout}>Sair do GoBarber</LogoutButton>
        </Form>
      </Container>
    </Background>
  );
}

export default Profile;
