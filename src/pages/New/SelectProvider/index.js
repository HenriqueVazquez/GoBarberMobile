/* eslint-disable react/prop-types */
import React, {useEffect, useState} from 'react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

import api from '~/services/api';

import Background from '~/components/Background';
import Proptypes from 'prop-types';

import {
  Container,
  ProviderList,
  Provider,
  ProviderAvatar,
  Name,
} from './styles';

export default function SelectProvider({navigation}) {
  const [providers, setProviders] = useState([]);

  useEffect(() => {
    async function loadProviders() {
      const response = await api.get('providers');

      setProviders(response.data);
    }

    loadProviders();
  }, []);

  return (
    <Background>
      <Container>
        <ProviderList
          data={providers}
          keyExtractor={provider => String(provider.id)}
          renderItem={({item: provider}) => (
            <GestureHandlerRootView
              style={{
                flex: 1,
              }}>
              <Provider onPress={() => navigation.navigate('Date', {provider})}>
                <ProviderAvatar
                  source={{
                    uri: provider.avatar
                      ? provider.avatar.url
                      : `https://robohash.org/${provider.name}?set=set3&size=100x100`,
                  }}
                />
                <Name>{provider.name}</Name>
              </Provider>
            </GestureHandlerRootView>
          )}
        />
      </Container>
    </Background>
  );
}

SelectProvider.propTypes = {
  navigation: Proptypes.shape({
    push: Proptypes.func.isRequired,
  }).isRequired,
};
