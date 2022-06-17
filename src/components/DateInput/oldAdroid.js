/* eslint-disable no-shadow */
import React, {useState, useMemo} from 'react';
import DatePicker from 'react-native-date-picker';
import {format} from 'date-fns';
import pt from 'date-fns/locale/pt';

import Icon from 'react-native-vector-icons/MaterialIcons';
import PropsType from 'prop-types';

import colors from '~/styles/colors';
import {Container, DateButton, DateText} from './styles';

export default function DateInput({date, onChange}) {
  const [open, setOpen] = useState(false);

  const dateFormatted = useMemo(
    () => format(date, "dd 'de' MMMM 'de' yyyy", {locale: pt}),
    [date],
  );

  return (
    <Container>
      <DateButton title="Open" onPress={() => setOpen(true)}>
        <Icon name="event" size={20} color={colors.light} />
        <DateText>{dateFormatted}</DateText>
      </DateButton>
      <DatePicker
        modal
        mode="date"
        minimumDate={new Date()}
        textColor={colors.primary}
        open={open}
        date={date}
        onConfirm={date => {
          setOpen(false);
          onChange(date);
        }}
        onCancel={() => {
          setOpen(false);
        }}
      />
    </Container>
  );
}

DateInput.propTypes = {
  date: PropsType.instanceOf(Date).isRequired,
  onChange: PropsType.func.isRequired,
};
