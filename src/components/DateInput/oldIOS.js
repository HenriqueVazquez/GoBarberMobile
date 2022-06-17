import React, {useState, useMemo} from 'react';
import {DatePickerIOS} from 'react-native';
import {format} from 'date-fns';
import pt from 'date-fns/locale/pt';

import Icon from 'react-native-vector-icons/MaterialIcons';
import PropsType from 'prop-types';

import colors from '~/styles/colors';
import {Container, DateButton, DateText, Picker} from './styles';

export default function DateInput({date, onChange}) {
  const [opended, setOpened] = useState(false);

  const dateFormatted = useMemo(
    () => format(date, "dd 'de' MMMM 'de' yyyy", {locale: pt}),
    [date],
  );

  return (
    <Container>
      <DateButton onPress={() => setOpened(!opended)}>
        <Icon name="event" size={20} color={colors.light} />
        <DateText>{dateFormatted}</DateText>
      </DateButton>

      {opended && (
        <Picker>
          <DatePickerIOS
            date={date}
            onDateChange={onChange}
            minimumDate={new Date()}
            minuteInterval={60}
            locale="pt"
            mode="date"
          />
        </Picker>
      )}
    </Container>
  );
}

DateInput.propTypes = {
  date: PropsType.instanceOf(Date).isRequired,
  onChange: PropsType.func.isRequired,
};
