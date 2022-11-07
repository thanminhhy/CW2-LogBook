/* eslint-disable*/

import {useEffect, useState} from 'react';
import {View, Image, StyleSheet, Button} from 'react-native';

function Home() {
  const [index, setIndex] = useState(0);
  const imgList = [
    'https://kinsta.com/wp-content/uploads/2020/08/tiger-jpg.jpg',
    'https://nationaltoday.com/wp-content/uploads/2021/10/World-Lion-Day-640x514.jpg',
  ];

  const preImage = () => {
    if (index == 0) {
      return;
    } else {
      setIndex(index - 1);
      return imgList[index];
    }
  };

  const nextImage = () => {
    if (index >= imgList.length - 1) {
      return;
    } else {
      setIndex(index + 1);
      return imgList[index];
    }
  };

  return (
    <View>
      <Image
        style={styles.tinyLogo}
        source={{
          uri: imgList[index],
        }}
      />
      <View style={styles.container}>
        <View style={{width: '40%'}}>
          <Button title="Previous" onPress={() => preImage()}></Button>
        </View>
        <View style={{width: '40%'}}>
          <Button title="Next" onPress={() => nextImage()}></Button>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  tinyLogo: {
    margin: 30,
    width: 350,
    height: 350,
  },
});

export default Home;
