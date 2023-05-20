import { StyleSheet } from "react-native";

const elementWidth = 300 * 1.1;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  error: {
    color: "red",
    marginBottom: 10,
  },
  // Texts
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: 'gray',
    marginRight: 5,
  },
  checkboxSelected: {
    width: 20,
    height: 20,
    backgroundColor: '#6BA0D2',
    marginRight: 5,
  },
  textTerms: {
    fontSize: 20,
    marginLeft: 5,
  },
  link: {
    paddingHorizontal: 10,
    fontSize: 16,
    color: "#8A8A8A",
    textAlign: "center",
    paddingTop: 10,
    fontSize: 20,
    textDecorationLine: 'underline',
    marginTop: 10
  },
  textLinks: {
    paddingTop: 10,
  },
  textInittial: {
    fontSize: 20,
    textAlign: "center",
    paddingBottom: 15,
  },
  // Buttons
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
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#90C444',
    borderRadius: 50,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
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
    borderColor: "gray",
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
    height: 60,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    marginBottom: 20,
    minWidth: elementWidth,
    backgroundColor: "white",
  },
  // Item carrinho
  listCart: {
    backgroundColor: "white",
    minWidth: elementWidth + 50,
    borderRadius: 10,
    borderColor: "gray",
    marginTop: 15,
    backgroundColor: "gray",
  },
  cart: {
    marginTop: 5550,
    borderRadius: 10,
    borderColor: "gray",
    marginTop: 15,
  },
  //Receita
  item: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 8,
    marginBottom: 20,
  },
  itemText: {
    color: 'white',
    fontSize: 16,
  },
  expandedItem: {
    backgroundColor: 'lightblue',
    width: '80%',
    borderRadius: 8,
    overflow: 'hidden',
  },
});
