import { StyleSheet } from "react-native";
import {
  widthPercentageToDP,
  heightPercentageToDP,
} from "react-native-responsive-screen";

const elementWidth = "90%";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#fff",
    maxWidth: "100%",
  },
  containerLogo: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    maxWidth: "100%",
  },
  containerCart: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#fff",
    maxWidth: "100%",
  },
  containerInner: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
    flexDirection: "column",
    justifyContent: "center",
    maxWidth: "100%",
  },
  recipeContainer: {
    flex: 1,
    maxWidth: "100%",
    backgroundColor: "gray",
  },
  error: {
    textAlign: "left",
    color: "red",
  },
  // Texts
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
    marginLeft: 12,
    marginRight: -5,
  },
  checkbox: {
    width: 25,
    height: 25,
    borderWidth: 1,
    borderColor: "gray",
    marginRight: 5,
    borderRadius: 5,
    marginLeft: 5,
    marginTop: 5,
  },
  checkboxSelected: {
    width: 25,
    height: 25,
    borderWidth: 1,
    backgroundColor: "#6BA0D2",
    borderColor: "#6BA0D2",
    marginRight: 5,
    borderRadius: 5,
    marginLeft: 5,
    marginTop: 5,
  },
  icons: {
    marginTop: 5,
  },
  textTerms: {
    fontSize: 15,
    marginLeft: 5,
  },
  link: {
    paddingHorizontal: 10,
    fontSize: 16,
    color: "#8A8A8A",
    textAlign: "center",
    paddingTop: 10,
    fontSize: 20,
    textDecorationLine: "underline",
    marginTop: 10,
  },
  textLinks: {
    paddingTop: 10,
  },
  textInittial: {
    fontSize: 20,
    textAlign: "center",
    paddingBottom: 15,
  },
  centerInfo: {
    padding: 15,
    marginBottom: 15,
  },
  infoUser: {
    fontSize: 40,
  },
  welcomeUser: {
    fontSize: 20,
  },
  // Buttons
  buttonProfileDiv: {
    flex: 1,
    marginHorizontal: 10,
    minWidth: "40%",
    backgroundColor: "#6BA0D2",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  buttonProfile: {
    minWidth: "40%",
    backgroundColor: "#6BA0D2",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    color: "#fff",
    fontSize: 18,
    textAlign: "center",
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    width: widthPercentageToDP("90%"),
    height: 50,
    backgroundColor: "#6BA0D2",
    borderRadius: 10,
    marginTop: 15,
  },
  recipebutton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#90C444",
    borderRadius: 50,
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
  },
  buttonEnabled: {
    justifyContent: "center",
    alignItems: "center",
    width: widthPercentageToDP("90%"),
    height: 50,
    backgroundColor: "#6BA0D2",
    borderRadius: 10,
    marginTop: 15,
  },
  buttonDisabled: {
    justifyContent: "center",
    alignItems: "center",
    width: widthPercentageToDP("90%"),
    height: 50,
    borderRadius: 10,
    marginTop: 15,
    backgroundColor: "gray",
  },
  btnCenterBottom: {
    marginBottom: 15,
  },
  // Inputs
  input: {
    height: 60,
    borderWidth: 1,
    paddingLeft: 5,
    marginTop: 22,
    width: widthPercentageToDP("90%"),
    backgroundColor: "white",
    borderColor: "#777777",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  inputError: {
    height: 60,
    borderColor: "red",
    borderWidth: 1,
    paddingLeft: 5,
    marginTop: 22,
    width: widthPercentageToDP("90%"),
    backgroundColor: "white",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  textInputContainerIngre: {
    height: 60,
    borderColor: "red",
    borderWidth: 1,
    paddingLeft: 5,
    minWidth: elementWidth,
    backgroundColor: "white",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  textInputContainer: {
    width: widthPercentageToDP("96%"),
    height: heightPercentageToDP("7%"),
    maxWidth: "100%",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    minWidth: "100%",
    marginBottom: 5,
    marginTop: 15,
  },
  inputAddItem: {
    height: 55,
    borderWidth: 1,
    paddingLeft: 10,
    marginBottom: 20,
    minWidth: elementWidth,
    backgroundColor: "white",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  // Item carrinho
  listCart: {
    backgroundColor: "white",
    borderRadius: 10,
    borderColor: "gray",
    marginTop: 15,
    backgroundColor: "gray",
  },
  cart: {
    width: widthPercentageToDP("95%"),
    height: heightPercentageToDP("6%"),
    borderRadius: 10,
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.25)",
    marginTop: 15,
    marginBottom: 15,
    backgroundColor: "#FEFEFE",
    flexDirection: "column",
    maxWidth: "100%",
    justifyContent: "center",
    shadowColor: "black",
    shadowOffset: { width: 10, height: 10 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 10,
    minWidth: "100%",
  },
  cartEnable: {
    width: widthPercentageToDP("95%"),
    height: heightPercentageToDP("6%"),
    borderRadius: 10,
    borderColor: "gray",
    marginTop: 15,
    marginBottom: 15,
    justifyContent: "center",
    backgroundColor: "gray",
    flexDirection: "column",
    maxWidth: "100%",
    shadowColor: "black",
    shadowOffset: { width: 10, height: 10 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 10,
    minWidth: "100%",
  },
  //Receita

  iconsContainer: {
    textAlign: "end",
    textAlignVertical: "end",
  },
  item: {
    backgroundColor: "#E8E8E8",
    padding: 10,
    borderRadius: 8,
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.25)",
    marginBottom: 20,
    marginTop: 20,
    minWidth: elementWidth,
    textAlign: "center",
  },
  itemTextTitle: {
    color: "#000000",
    fontSize: 20,
    textAlign: "center",
    textAlignVertical: "center",
  },
  itemText: {
    color: "#000000",
    fontSize: 20,
    textAlign: "center",
    textAlignVertical: "center",
    marginTop: 18,
  },
  expandedItem: {
    backgroundColor: "#FAFAFA",
    width: "90%",
    marginTop: -15,
    borderRadius: 8,
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.25)",
    overflow: "hidden",
  },

  icon: {
    marginLeft: 10,
    fontSize: 20,
  },
  arrowicon: {
    textAlign: "left",
    textAlignVertical: "left",
    marginRight: 10,
    fontSize: 20,
  },
  ///MODAL
  modalInput: {
    height: 60,
    borderColor: "#ccc",
    borderWidth: 1,
    paddingLeft: 5,
    minWidth: elementWidth,
    backgroundColor: "white",
    borderColor: "#777777",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  ingredientList: {
    width: widthPercentageToDP("95%"),
    height: heightPercentageToDP("5%"),
    marginTop: 10,
    backgroundColor: "#D9D9D9",
  },
  btnModal: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#6BA0D2",
    padding: 15,
    borderRadius: 10,
    marginLeft: 10,
  },
  inputModal: {
    height: 60,
    marginBottom: 10,
    borderColor: "#ccc",
    borderWidth: 1,
    paddingLeft: 5,
    minWidth: elementWidth,
    backgroundColor: "white",
    borderColor: "#777777",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  modalError: {
    minWidth: elementWidth,
    height: 60,
    borderColor: "red",
    borderWidth: 1,
    paddingLeft: 5,
    backgroundColor: "white",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  modalErrorText: {
  textAlign: "left",
  color: "red",
  alignSelf: "flex-start",
  paddingLeft: 25,
  paddingBottom: 20,
  },
  modalBack: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "white",
    maxHeight: "25%",
    minHeight: 200,
    borderRadius: 15,
  },
  emptyCart: {
    textAlign: "center",
    fontSize: 25,
    color: "gray",
    padding: 20,
  },
  // INGREDIENTE E RECEITA
  textInputContainerIngre: {
    width: widthPercentageToDP("90%"),
    height: heightPercentageToDP("5%"),
    flexDirection: "column",
    justifyContent: "center",
    maxWidth: "100%",
    marginBottom: "5%",
  },
  listIngredient: {
    width: widthPercentageToDP("90%"),
    height: heightPercentageToDP("20%"),
    backgroundColor: "white",
    marginTop: 20,
    borderRadius: 10,
    borderColor: "#777777",
    borderWidth: 1,
    flex: 1,
  },
  divInput: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  column: {
    flex: 1,
    alignItems: "center",
  },
  inputDiv: {
    height: 60,
    borderWidth: 1,
    paddingLeft: 5,
    marginTop: 22,
    width: widthPercentageToDP("44%"),
    backgroundColor: "white",
    borderColor: "#777777",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  // INPUT INGREDIENTE
  divIcon: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
    marginTop: 10,
  },
  divIconLeft: {
    flex: 1,
    alignItems: "flex-start",
    fontSize: 20,
  },
  divIconRight: {
    marginLeft: 30,
    alignItems: "flex-end",
  },
  textLeft: {
    textAlign: "left",
  },
  // RECIPE
  cardRecipe: {
    maxWidth: widthPercentageToDP("95%"),
    height: heightPercentageToDP("10%"),
    borderRadius: 10,
    marginHorizontal: 20,
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.25)",
    marginTop: 15,
    marginBottom: 15,
    backgroundColor: "#FEFEFE",
    justifyContent: "center", 
    shadowColor: "black",
    shadowOffset: { width: 10, height: 10 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 10,
  },
});
