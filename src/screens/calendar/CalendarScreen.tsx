import {Text, View, SafeAreaView} from 'react-native';
import {Calendar, LocaleConfig} from 'react-native-calendars';
import React from 'react';

LocaleConfig.locales['fr'] = {
  monthNames: [
    'Janvier',
    'Février',
    'Mars',
    'Avril',
    'Mai',
    'Juin',
    'Juillet',
    'Août',
    'Septembre',
    'Octobre',
    'Novembre',
    'Décembre',
  ],
  monthNamesShort: [
    'Jan.',
    'Fév.',
    'Mar.',
    'Avr.',
    'Mai',
    'Juin',
    'Juil.',
    'Août',
    'Sept.',
    'Oct.',
    'Nov.',
    'Déc.',
  ],
  dayNames: [
    'Dimanche',
    'Lundi',
    'Mardi',
    'Mercredi',
    'Jeudi',
    'Vendredi',
    'Samedi',
  ],
  dayNamesShort: ['Dim.', 'Lun.', 'Mar.', 'Mer.', 'Jeu.', 'Ven.', 'Sam.'],
  today: "Aujourd'hui",
};
LocaleConfig.defaultLocale = 'fr';

export const CalendarScreen = ({navigation}): JSX.Element => {
  const handleDayPress = (day: {dateString: string}) => {
    const date = new Date(day.dateString);
    navigation.navigate('Day', {date});
  };

  return (
    <SafeAreaView>
      <Text style={{textAlign: 'center', fontSize: 35}}>Kyiv Weather</Text>
      <Calendar
        onDayPress={handleDayPress}
        // Ваши настройки здесь
      />
    </SafeAreaView>
  );
};
