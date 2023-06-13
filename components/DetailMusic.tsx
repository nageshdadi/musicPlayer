/* eslint-disable radix */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  Text,
  View,
  Appearance,
  SafeAreaView,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import Slider from '@react-native-community/slider';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import SoundPlayer from 'react-native-sound-player';
import TrackPlayer, {Capability} from 'react-native-track-player';
import {musicData} from './MusicData';
// import Sound from 'react-native-sound';
import Icons from 'react-native-vector-icons/AntDesign';
import Icon from 'react-native-vector-icons/Feather'
import FontAwesome from 'react-native-vector-icons/FontAwesome';

interface IProps {
  navigation?: any;
  route?: any;
}
interface IState {
  isDarkMode: boolean;
  isSongPlay: boolean;
  currenIndex: number;
  progress: number;
  duration: number;
}
class DetailMusic extends Component<IProps, IState> {
  progressInterval: number | undefined;
  constructor(props: any) {
    super(props);
    this.state = {
      isDarkMode: Appearance.getColorScheme() === 'dark' ? true : false,
      isSongPlay: false,
      currenIndex: parseInt(this.props.route.params.id),
      progress: 0,
      duration: 0,
    };

    Appearance.addChangeListener(theme => {
      theme.colorScheme === 'dark'
        ? this.setState({isDarkMode: true})
        : this.setState({isDarkMode: false});
    });
  }
  onPressBackSong = async () => {
    await TrackPlayer.skipToPrevious();
    const {currenIndex} = this.state;
    if (currenIndex > 1) {
      this.setState({
        currenIndex: this.state.currenIndex - 1,
        isSongPlay: true,
      });
    }
  };
  onPressForwardSong = async () => {
    await TrackPlayer.skipToNext();
    const {currenIndex} = this.state;
    if (currenIndex < musicData.length) {
      this.setState({
        currenIndex: this.state.currenIndex + 1,
        isSongPlay: true,
      });
    }
  };

  getPosition = async () => {
    const position = await TrackPlayer.getPosition();
    console.log(position);
    this.setState({progress: position});
  };

  onSliderValueChange = async (value: number) => {
    await TrackPlayer.seekTo(value);
  };

  componentDidMount() {
    this.setupPlayer();
  }

  setupPlayer = async () => {
    const {currenIndex} = this.state;
    try {
      await await TrackPlayer.setupPlayer();
      await TrackPlayer.updateOptions({
        // Media controls capabilities
        capabilities: [
          Capability.Play,
          Capability.Pause,
          Capability.SkipToNext,
          Capability.SkipToPrevious,
          Capability.Stop,
        ],

        // Capabilities that will show up when the notification is in the compact form on Android
        compactCapabilities: [Capability.Play, Capability.Pause],
      });
      await TrackPlayer.add(musicData);
      await TrackPlayer.getDuration().then(duration =>
        this.setState({duration: duration}),
      );
      this.progressInterval = setInterval(this.getPosition, 1000);
    } catch (e) {}
  };
  render() {
    const {currenIndex} = this.state;
    const musicDetails = musicData[currenIndex - 1];
    console.log(this.state.duration);
    const clr: string = this.state.isDarkMode ? '#fff' : '#000';
    const lineClr: string = this.state.isDarkMode ? '#000' : '#fff';
    return (
      <SafeAreaView
        style={{
          backgroundColor: this.state.isDarkMode
            ? Colors.darker
            : Colors.lighter,
          flex: 1,
        }}>
        <View style={styles.mainMusicCrad}>
          <View style={styles.headerCrad}>
            <Icons name="down" size={30} color={clr} />
            <Text style={{...styles.mainHeadText, color: `${clr}`}}>
              Music Player
            </Text>
            <Icon name="more-vertical" size={30} color={clr} />
          </View>
          <View style={styles.bottomCrad}>
            <Text style={{...styles.songheadText, color: `${clr}`}}>
              <Text style={{color: `${clr}`, fontWeight: '700'}}>Song</Text> |{' '}
              <Text>Lyrics</Text>
            </Text>
            <Image
              style={styles.songImg}
              source={{uri: `${musicDetails.artwork}`}}
            />
            <Text style={{color: `${clr}`, fontSize: 25, fontWeight: '600'}}>
              {musicDetails.title}
            </Text>
            <Text style={{color: `${clr}`}}>{musicDetails.artist}</Text>
            <View style={styles.iconCrad}>
              <Icon name="volume-2" size={25} color={clr} />
              <Icons name="menuunfold" size={25} color={clr} />
              <Icon name="shuffle" size={25} color={clr} />
              <Icon name="repeat" size={25} color={clr} />
              <Icon name="heart" size={25} color={clr} />
            </View>
            <View style={styles.sliderView}>
              <Slider
                minimumValue={0}
                maximumValue={80}
                value={this.state.progress}
                onSlidingComplete={this.onSliderValueChange}
              />
            </View>
            {/* <View style={{backgroundColor: `${lineClr}`, ...styles.lineSong}}>
              <View
                style={{
                  backgroundColor: `${clr}`,
                  width: 100,
                  height: 2,
                }}>
                <Text>.</Text>
              </View>
            </View> */}
            <View style={styles.songLineCrad}>
              <Text style={{color: `${clr}`}}>1:20</Text>
              <Text style={{color: `${clr}`}}>4:00</Text>
            </View>
            <View style={styles.musicIconCrad}>
              <TouchableOpacity onPress={this.onPressBackSong}>
                <FontAwesome name="step-backward" size={50} color={clr} />
              </TouchableOpacity>
              {this.state.isSongPlay ? (
                <TouchableOpacity
                  onPress={async () => {
                    await TrackPlayer.pause();
                    this.setState({isSongPlay: false});
                  }}>
                  <FontAwesome name="pause" size={50} color={clr} />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={async () => {
                    await TrackPlayer.skip(1);
                    await TrackPlayer.play();
                    this.setState({isSongPlay: true});
                  }}>
                  <FontAwesome name="play" size={50} color={clr} />
                </TouchableOpacity>
              )}
              <TouchableOpacity onPress={this.onPressForwardSong}>
                <FontAwesome name="step-forward" size={50} color={clr} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  mainMusicCrad: {
    flex: 1,
    padding: 15,
  },
  headerCrad: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  mainHeadText: {
    fontSize: 23,
    fontWeight: 'bold',
  },
  bottomCrad: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  songheadText: {
    fontSize: 20,
    marginBottom: 15,
  },
  songImg: {
    height: 250,
    width: 250,
    borderRadius: 35,
    marginBottom: 20,
  },
  iconCrad: {
    marginTop: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '90%',
  },
  songLineCrad: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '90%',
  },
  lineSong: {
    marginTop: 15,
    height: 3,
    width: '90%',
    borderRadius: 10,
  },
  musicIconCrad: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '70%',
    padding: 10,
    margin: 20,
  },
  sliderView: {
    marginTop: 20,
    alignSelf: 'center',
    width: '100%',
  },
});

export default DetailMusic;
