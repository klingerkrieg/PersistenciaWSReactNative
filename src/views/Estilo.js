import { StyleSheet, Appearance } from 'react-native';

let logoTextBellow = '#000';
const colorScheme = Appearance.getColorScheme();
if (colorScheme == 'dark') {
    logoTextBellow = '#fff'
}

export const styles = StyleSheet.create({
    messages:{
        color:'#000',
        fontSize:global.normalFontSize,
        marginLeft:10,
        textAlignVertical:'center',
    },
    separator:{
        fontSize:global.titleFontSize,
        borderBottomWidth:2,
        fontWeight:'bold',
        borderColor:'#ccc',
    },
    link:{
        color:'#1f90ff',
        fontSize:global.normalFontSize,
        textAlignVertical:'center',
    },
    bold:{
        color:'#000',
        fontSize:global.titleFontSize,
        fontWeight:'bold',
        marginLeft:10
    },
    bigLogo:{
        width:'80%',
        resizeMode: 'contain',
        alignSelf:'center',
    },
    container:{
        flexDirection:'column',
        height:'100%',
    },
    center:{
        alignItems:'center',
    },
    centerMessage:{
        height:'100%',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        
    },
    bottom:{
        flex:1,
        justifyContent:'flex-end',
        marginBottom:30,
    },
    logo:{
        flexDirection:'column',
        alignItems:'center',
        marginTop:40,
        marginBottom:40,
    },
    logoText:{
        fontSize:80,
        color:"#1f90ff",
        fontWeight:'bold',
    },
    logoTextBellow:{
        fontSize:20,
        color:logoTextBellow,
        fontWeight:'bold',
    },
})