/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable radix */
import React, {Component} from 'react';
import {
  Text,
  View,
  Appearance,
  SafeAreaView,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import {musicData} from './MusicData';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import Icons from 'react-native-vector-icons/AntDesign';
import Icon from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

interface IProps {
  navigation?: any;
}
interface IState {
  isDarkMode: boolean;
  songIndex: string;
}
export class MusicHome extends Component<IProps, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      isDarkMode: Appearance.getColorScheme() === 'dark' ? true : false,
      songIndex: '1',
    };

    Appearance.addChangeListener(theme => {
      theme.colorScheme === 'dark'
        ? this.setState({isDarkMode: true})
        : this.setState({isDarkMode: false});
    });
  }
  render() {
    const {songIndex} = this.state;
    const Clr: string = this.state.isDarkMode ? '#000' : '#fff';
    const clr: string = this.state.isDarkMode ? '#fff' : '#000';
    return (
      <SafeAreaView
        style={{
          backgroundColor: this.state.isDarkMode
            ? Colors.darker
            : Colors.lighter,
          flex: 1,
        }}>
        <View style={styles.mainContainer}>
          <View style={styles.headerCrad}>
            <View style={styles.musicPlayerCard}>
              <Icons name="barschart" size={25} color={clr} />
              <Text style={{...styles.musicPlayerText, color: `${clr}`}}>
                Music Player
              </Text>
            </View>
            <Icons name="search1" size={25} color={clr} />
          </View>
          <View style={styles.subHeadCard}>
            <Text style={{color: `${clr}`}}>Songs</Text>
            <Text style={{color: `${clr}`}}>Artists</Text>
            <Text style={{color: `${clr}`}}>Playlist</Text>
            <Text style={{color: `${clr}`}}>Albums</Text>
            <Text style={{color: `${clr}`}}>Folder</Text>
            <Icon name="shuffle" size={15} color={clr} />
            <Icons name="bars" size={20} color={clr} />
          </View>
          <FlatList
            data={musicData}
            renderItem={({item}: {item: any}) => (
              <View style={styles.flatListCrad}>
                <TouchableOpacity
                  style={styles.flatImagCrad}
                  onPress={() => {
                    this.setState({songIndex: item.id});
                    this.props.navigation.navigate('detailMusic', {
                      ...item,
                    });
                  }}>
                  <Image
                    style={{...styles.songImg}}
                    source={{uri: `${item.artwork}`}}
                  />
                  <View>
                    <Text style={{...styles.titleText, color: `${clr}`}}>
                      {item.title}
                    </Text>
                    <Text style={{color: `${clr}`}}>{item.artist}</Text>
                  </View>
                </TouchableOpacity>
                {item.id === this.state.songIndex && (
                  <Icons name="sound" size={25} color={clr} />
                )}
              </View>
            )}
            keyExtractor={item => item.id}
          />
          <View style={{...styles.songPopup, backgroundColor: `${Clr}`}}>
            <Image
              style={styles.songImg}
              source={{uri: `${musicData[parseInt(songIndex) - 1].artwork}`}}
            />
            <View>
              <Text style={{...styles.titleText, color: `${clr}`}}>
                {musicData[parseInt(songIndex) - 1].title}
              </Text>
              <Text style={{color: `${clr}`}}>
                {musicData[parseInt(songIndex) - 1].artist}
              </Text>
            </View>
            <View style={styles.musicIconCrad}>
              <FontAwesome name="step-backward" size={20} color={clr} />
              <FontAwesome name="pause" size={20} color={clr} />
              <FontAwesome name="step-forward" size={20} color={clr} />
            </View>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: 15,
  },
  headerCrad: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: 20,
    paddingTop: 10,
  },
  musicPlayerCard: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  musicPlayerText: {
    fontSize: 25,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  subHeadCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 25,
  },
  flatListCrad: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: 15,
    alignItems: 'center',
    marginBottom: 15,
  },
  flatImagCrad: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  songImg: {
    height: 70,
    width: 70,
    borderRadius: 10,
    marginRight: 15,
  },
  titleText: {
    fontSize: 18,
    fontWeight: '500',
  },
  songPopup: {
    borderRadius: 15,
    position: 'absolute',
    width: '100%',
    bottom: 0,
    padding: 20,
    flexDirection: 'row',
    marginBottom: 20,
    marginLeft: 15,
  },
  musicIconCrad: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    marginLeft: 10,
    width: 100,
  },
});
export default MusicHome;
