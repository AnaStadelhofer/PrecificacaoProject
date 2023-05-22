import { StyleSheet } from "react-native";

const elementWidth = 300 * 1.1;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  containerInner: {
    flex: 1,
    width: "100%",
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
    marginTop: 5
  },
  checkboxSelected: {
    width: 25,
    height: 25,
    backgroundColor: "#6BA0D2",
    marginRight: 5,
  },
  icons: {
    marginTop: 5
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
  // Buttons
  buttonProfileContainer: {
    flex: 1, // Ocupa a largura disponível igualmente
    marginHorizontal: 10, // Espaçamento horizontal entre os botões
  },
  buttonContainer: {
    flexDirection: 'row', // Alinha os botões horizontalmente
    justifyContent: 'space-between', // Espaçamento igual entre os botões
  },
  buttonProfile: {
    backgroundColor: '#6BA0D2',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
    textAlign: 'center',
    minWidth: '25%'
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
    borderColor: '#777777',
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
    borderColor: '#777777'
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
    justifyContent: "space-between",
    backgroundColor: '#E8E8E8',
    
    shadowColor: 'black',
    shadowOffset: { width: 10, height: 10 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 10,
    minWidth: elementWidth,
  },
  cartEnable:  {
    borderRadius: 10,
    borderColor: "gray",
    marginTop: 15,
    justifyContent: "space-between",
    backgroundColor: 'gray',

    shadowColor: 'black',
    shadowOffset: { width: 10, height: 10 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 10,
    minWidth: elementWidth,
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
