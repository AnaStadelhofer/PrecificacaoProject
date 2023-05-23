import { StyleSheet } from "react-native";

const elementWidth = "90%";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    maxWidth: "100%",
  },
  containerInner: {
    flex: 1,
    minWidth: elementWidth,
    paddingHorizontal: 20,
    paddingVertical: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  error: {
    color: "red",
    marginBottom: 10,
  },
  // Texts
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
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
    marginBottom: 15
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
    minWidth: elementWidth,
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
    minWidth: elementWidth,
    height: 50,
    backgroundColor: "#6BA0D2",
    borderRadius: 10,
    marginTop: 15,
  },
  buttonDisabled: {
    justifyContent: "center",
    alignItems: "center",
    minWidth: elementWidth,
    height: 50,
    borderRadius: 10,
    marginTop: 15,
    backgroundColor: "gray",
  },
  // Inputs
  input: {
    height: 60,
    borderColor: "#ccc",
    borderWidth: 1,
    paddingLeft: 5,
    marginBottom: 22,
    minWidth: elementWidth,
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
    minWidth: elementWidth,
    backgroundColor: "white",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  textInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  inputAddItem: {
    height: 55,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    marginBottom: 20,
    minWidth: elementWidth,
    backgroundColor: "white",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderColor: "#777777",
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
    borderRadius: 10,
    borderColor: "gray",
    marginTop: 15,
    marginBottom: 15,
    justifyContent: "space-between",
    backgroundColor: "#E8E8E8",

    shadowColor: "black",
    shadowOffset: { width: 10, height: 10 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 10,
    minWidth: "100%",
  },
  cartEnable: {
    borderRadius: 10,
    borderColor: "gray",
    marginTop: 15,
    marginBottom: 15,
    justifyContent: "space-between",
    backgroundColor: "gray",

    shadowColor: "black",
    shadowOffset: { width: 10, height: 10 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 10,
    minWidth: "100%",
  },
  //Receita
  item: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 8,
    marginBottom: 20,
  },
  itemText: {
    color: "white",
    fontSize: 16,
  },
  expandedItem: {
    backgroundColor: "lightblue",
    width: "80%",
    borderRadius: 8,
    overflow: "hidden",
  },
});
