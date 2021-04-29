import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#4183A8'
    },
    title: {
        textAlign: 'center',
        fontSize: 25,
        color: '#fff',
        fontWeight: 'bold',
        padding: 20
    },
    description: {
        textAlign: 'center',
        color: '#fff',
        fontSize: 17,
        padding: 5
    },
    sub: {
        color: '#fff',
        fontSize: 17,
        textAlign: 'center'
    },
    arrow: {
        right: 140,
        top: -150,
    },
    btnWhats: {
        backgroundColor:'#34af23',
        width: '32%',
        height: '8%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius:30,
        marginTop:10,
        flexDirection:'row',
    },
    btnText:{
        color:'#fff',
        textTransform:'uppercase',
        paddingLeft:5,
        fontWeight:'bold'
    }
});
export default styles;