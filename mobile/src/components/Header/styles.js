import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: 90,
    backgroundColor: '#4183A8',
    borderBottomWidth: 5,
    borderBottomColor: '#FBB03B',
    alignItems: 'center',
    justifyContent: 'center'
  },
  logo: {
    width: 100,
    height: 30
  },
  notification: {
    position: 'absolute',
    right: 20
  },
  notificationImage: {
    width: 30,
    height: 35
  },
  notificationText: {
    fontWeight: 'bold',
    color: '#FBB03B'
  },
  circle: {
    width: 25,
    height: 25,
    backgroundColor: '#FFF',
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    left: 13,
    bottom: 13
  },
  leftIcon: {
    position: 'absolute',
    left: 20
  },
  leftIconImage: {
    width: 30,
    height: 30
  }
});

export default styles;