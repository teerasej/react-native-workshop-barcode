import React from "react";
import { StyleSheet, View, Alert } from "react-native";
import {
  Container,
  Header,
  Title,
  Content,
  Footer,
  FooterTab,
  Button,
  Left,
  Right,
  Body,
  Icon,
  Text,
  Form,
  Item,
  Input,
  Label
} from "native-base";
import { BarCodeScanner, Permissions } from 'expo';

export default class ScannerPage extends React.Component {

    static navigationOptions = {
        header: null
    };


  state = {
    loading: true,
    hasCameraPermission: null,
  };


  constructor(props) {
    super(props);

  }

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  async componentWillMount() {
    await Expo.Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      Ionicons: require("@expo/vector-icons/fonts/Ionicons.ttf")
    });
    this.setState({ loading: false });
  }

  
  render() {
    if (this.state.loading) {
      return <Expo.AppLoading />;
    }

    const { hasCameraPermission } = this.state;

    if (hasCameraPermission === null) {
      return <Text>Requesting for camera permission</Text>;
    }
    if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    }
    return (
      <View style={{ flex: 1 }}>
        <BarCodeScanner
          onBarCodeScanned={this.handleBarCodeScanned}
          style={StyleSheet.absoluteFill}
        />
        <Button block style={styles.button} onPress={()=>{this.cancel()}}>
              <Text>
                  Cancel
              </Text>
        </Button>
      </View>
    );
  }

  cancel = () => {
    this.props.navigation.goBack();
  }

  handleBarCodeScanned = ({ type, data }) => {
    console.log(`Bar code with type ${type} and data ${data} has been scanned!`);
    this.props.navigation.goBack();
    this.props.navigation.state.params.onGotBarcode(data);
  }
}

const styles = StyleSheet.create({
    button: {
        position: 'absolute',
        bottom:0,
        right:0,
        left: 0,
    }
})