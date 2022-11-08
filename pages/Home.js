/* eslint-disable*/

import {useEffect, useState} from 'react';
import {View, Image, StyleSheet, Button, Alert, isFocused} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import {openDatabase} from 'react-native-sqlite-storage';

var db = openDatabase({name: 'LogBookExcerciseDatabase.db'});

function Home() {
  const [index, setIndex] = useState(0);
  // const imgList = [
  //   'https://kinsta.com/wp-content/uploads/2020/08/tiger-jpg.jpg',
  //   'https://nationaltoday.com/wp-content/uploads/2021/10/World-Lion-Day-640x514.jpg',
  // ];
  const [imgInput, setImgInput] = useState('');
  const [newArray, setNewArray] = useState([]);

  useEffect(() => {
    db.transaction(function (txn) {
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='Image_Table'",
        [],
        function (tx, res) {
          if (res.rows.length == 0) {
            console.log('item:', res.rows.length);
            if (res.rows.length == 0) {
              txn.executeSql('DROP TABLE IF EXISTS Image_Table', []);
              txn.executeSql(
                'CREATE TABLE IF NOT EXISTS Image_Table(id INTEGER PRIMARY KEY AUTOINCREMENT, image_link VARCHAR(255))',
                [],
              );
            }
          }
        },
      );
    });
  }, []);

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

  // const addImage = input => {
  //   if (input.match(/(http(s?):)([/|.|\w|\s|-])*.(?:jpg|gif|png)/g) === null) {
  //     Alert.alert('Image url is invalid!');
  //     return;
  //   } else {
  //     newArray.push(input);
  //     setImgInput('');
  //     Alert.alert('Image add successfully');
  //     return newArray;
  //   }
  // };
  const addImage = () => {
    if (
      imgInput.match(/(http(s?):)([/|.|\w|\s|-])*.(?:jpg|gif|png)/g) === null
    ) {
      Alert.alert('Image url is invalid!');
      return;
    } else {
      db.transaction(function (tx) {
        tx.executeSql(
          'INSERT INTO Image_Table (image_link) VALUES (?)',
          [imgInput],
          (tx, results) => {
            console.log('Results', results.rowsAffected);
            if (results.rowsAffected > 0) {
              Alert.alert('Image Inserted Successfully....');
            } else Alert.alert('Failed....');
          },
        );
      });
      getData();
    }
  };

  const getData = () => {
    db.transaction(tx => {
      tx.executeSql('SELECT * FROM Image_Table', [], (tx, results) => {
        var temp = [];
        for (let i = 0; i < results.rows.length; ++i)
          temp.push(results.rows.item(i));
        setImgInput('');
        setNewArray(temp);
        console.log('check: ', temp);
      });
    });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <View>
      <TextInput
        style={styles.textInputStyle}
        placeholder="Please type image link to add"
        onChangeText={text => setImgInput(text)}
        value={imgInput}></TextInput>
      <Image
        style={styles.tinyLogo}
        source={{uri: newArray[index]?.image_link}}
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
          <Button title="Add Image" onPress={addImage}></Button>
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
