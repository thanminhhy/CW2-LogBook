/* eslint-disable*/

import {useEffect, useState} from 'react';
import {View, Image, StyleSheet, Button, Alert} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';

function Home() {
  const [index, setIndex] = useState(0);
  // const imgList = [
  //   'https://kinsta.com/wp-content/uploads/2020/08/tiger-jpg.jpg',
  //   'https://nationaltoday.com/wp-content/uploads/2021/10/World-Lion-Day-640x514.jpg',
  // ];
  const [imgInput, setImgInput] = useState('');
  const [newArray, setNewArray] = useState([]);

  const preImage = () => {
    if (index == 0) {
      return;
    } else {
      setIndex(index - 1);
      return newArray[index];
    }
  };

  const nextImage = () => {
    if (index >= newArray.length - 1) {
      return;
    } else {
      console.log(newArray);
      setIndex(index + 1);
      return newArray[index];
    }
  };

  const addImage = input => {
    if (input.match(/(http(s?):)([/|.|\w|\s|-])*.(?:jpg|gif|png)/g) === null) {
      Alert.alert('Image url is invalid!');
      return;
    } else {
      newArray.push(input);
      setImgInput('');
      Alert.alert('Image add successfully');
      return newArray;
    }
  };

  return (
    <View>
      <TextInput
        style={styles.textInputStyle}
        placeholder="Please type image link to add"
        onChangeText={text => setImgInput(text)}
        value={imgInput}></TextInput>
      <Image
        style={styles.tinyLogo}
        source={{
          uri: newArray[index],
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
      <View
        style={{
          marginTop: '10%',
          justifyContent: 'center',
          flexDirection: 'row',
        }}>
        <View style={{width: '40%'}}>
          <Button title="Add Image" onPress={() => addImage(imgInput)}></Button>
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
  textInputStyle: {
    height: 45,
    width: '90%',
    textAlign: 'center',
    borderWidth: 1,
    borderColor: '#00B8D4',
    borderRadius: 7,
    marginTop: 15,
    marginBottom: 5,
    marginLeft: 20,
  },
});

export default Home;
