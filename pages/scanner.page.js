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



    return (
      <View style={{ flex: 1 }}>
        
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