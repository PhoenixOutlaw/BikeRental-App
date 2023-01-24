import { Platform, StatusBar, StyleSheet } from "react-native";
const GlobalStyle = StyleSheet.create({

  SafeArea: {
    height: '100%',
    width: '100%',
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  headerStyle: {
    // backgroundColor:"blue",
    display: "flex",
    flex:1,
    flexDirection: "row",
    // justifyContent:"center"
  },
  GlobalPaddingx:{
    paddingTop: 5,
    paddingHorizontal:10
  },
  center:{
    display:"flex",
    height: "100%",
    justifyContent:"center",
    gap:100
  },
  textcapitalize:{
    textTransform:"capitalize"
  },
  textcenter:{
    textAlign: "center",
  },
  text_heading:{
    fontSize:22
  },
  text_style1:{
    display: "flex",
    flexDirection: "column",
    justifyItems: "center",
    // justifyContent:"center",
    fontSize:17
  },
  basecolor:{
    color: "#00cc7a"
  },
  // gutter:(x)=>{
  //   isNaN(x)?{}:{return }
  // },
 Xpadding:(padding) => ({paddingHorizontal:padding}),
 Ypadding:(padding) => ({paddingVertical:padding}),
 PaddingTop:(padding) => ({paddingTop:padding}),
 PaddingBottom:(padding) => ({paddingBottom:padding}),

 Xmargin:(margin) => ({marginHorizontal:margin}),
 Ymargin:(margin) => ({marginVertical:margin}),
 MarginTop:(margin) => ({marginTop:margin}),
 MarginBottom:(margin) => ({marginBottom:margin}),
//  xmargin:(padding) => ({marginHorizontal:padding}),
//  ymargin:(padding) => ({marginVertical:padding}),
 BgColor:(color) => ({backgroundColor:`${color}`})
});

export { GlobalStyle as Gbs };
