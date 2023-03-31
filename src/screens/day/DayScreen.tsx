import {Button, SectionList, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {getWeatherForecast} from '../../services/weather';
import {useQuery} from 'react-query';

const DayScreen = ({navigation, route}): JSX.Element => {
  const [selectedDate, setSelectedDate] = useState('');

  const {isLoading, error, data} = useQuery(
    ['weatherForecast', selectedDate],
    () => getWeatherForecast(selectedDate),
    {
      onSuccess: () => {},
    },
  );

  const {date} = route.params;

  useEffect(() => {
    setSelectedDate(date);
  }, [date]);

  const weatherData = React.useMemo(() => {
    if (!data) {
      return [];
    }

    return data.list.reduce((acc, curr) => {
      const date = curr.dt_txt.split(' ')[0];

      if (!acc[date]) {
        acc[date] = [];
      }

      acc[date].push(curr);

      return acc;
    }, {});
  }, [data]);

  const sections = React.useMemo(() => {
    return Object.entries(weatherData).map(([date, data]) => ({
      title: new Date(date).toLocaleDateString(),
      data,
    }));
  }, [weatherData]);

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>Error: {error.message}</Text>;
  }

  return (
    <View style={styles.container}>
      <Button title="Back" onPress={() => navigation.goBack()} />
      <Text style={styles.title}>Kiev Weather</Text>
      <SectionList
        sections={sections}
        keyExtractor={item => item.dt}
        renderItem={({item}) => (
          <View style={styles.itemContainer}>
            <Text style={styles.itemTitle}>
              {new Date(item.dt * 1000).toLocaleTimeString()}
            </Text>
            <Text style={styles.itemSubtitle}>
              {item.weather[0].description}
            </Text>
            <Text style={styles.itemSubtitle}>{item.main.temp} &#8451;</Text>
          </View>
        )}
        renderSectionHeader={({section: {title}}) => (
          <Text style={styles.sectionHeader}>{title}</Text>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 35,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 15,
    textAlign: 'center',
  },
  sectionHeader: {
    backgroundColor: '#f2f2f2',
    padding: 8,
    fontSize: 18,
    fontWeight: 'bold',
  },
  itemContainer: {
    padding: 16,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  itemSubtitle: {
    fontSize: 14,
  },
});

export default DayScreen;
