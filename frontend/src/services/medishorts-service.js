// @ts-nocheck
import axios from "axios";

// The medishortsService object is used to make API calls to the backend
export const medishortsService = {
  baseUrl: "http://localhost:3000/",

  async signUpUser(
    email,
    password,
    pharmacyName,
    pharmacyAddress,
    pharmacyPSIRegistrationNo,
    pharmacyPhoneNumber,
    pharmacyFaxNumber,
    superintendentPharmacist,
    supervisingPharmacist,
    pharmacyOwner,
    vatNumber
  ) {
    try {
      const newUserDetails = {
        email: email,
        password: password,
        pharmacyName: pharmacyName,
        pharmacyAddress: pharmacyAddress,
        pharmacyPSIRegistrationNo: pharmacyPSIRegistrationNo,
        pharmacyPhoneNumber: pharmacyPhoneNumber,
        pharmacyFaxNumber: pharmacyFaxNumber,
        superintendentPharmacist: superintendentPharmacist,
        supervisingPharmacist: supervisingPharmacist,
        pharmacyOwner: pharmacyOwner,
        vatNumber: vatNumber,
      };
      const response = await axios.post(
        `${this.baseUrl}api/users/signup`,
        newUserDetails
      );
      console.log(newUserDetails);
      console.log(
        "I am in the Service file and have created a new user object"
      );
      console.log(response);
      return true;
    } catch (error) {
      console.log(error);
      return { state: false, error: error.response.data.message };
    }
  },

  async loginUser(email, password) {
    try {
      const userCredentials = {
        email: email,
        password: password,
      };
      const response = await axios.post(
        `${this.baseUrl}api/users/login`,
        userCredentials
      );
      console.log(userCredentials);
      console.log("I am in the Service file and I am logging in a user");
      console.log(response);
      return true;
    } catch (error) {
      console.log(error);
      return { state: false, error: error.response.data.message };
    }
  },

  async getAllProductRequests() {
    try {
      const response = await axios.get(`${this.baseUrl}api/product-requests/`);
      console.log(
        "I am in the Service file and I am fetching all product requests"
      );
      console.log(response);
      console.log(response.data);
      return { productRequests: response.data.productRequests, state: true };
    } catch (error) {
      console.log(error);
      return { state: false, error: error.response.data.message };
    }
  },

  async createProductRequest(productName, genericName, costPrice, expiryDate) {
    const newProductRequest = {
      productName: productName,
      genericName: genericName,
      costPrice: costPrice,
      expiryDate: expiryDate,
      productRequestCreator: "66c5cde0f0b92302e9e5fa74",
    };
    try {
      const response = await axios.post(`${this.baseUrl}api/product-requests/` ,newProductRequest);
      console.log(response);
      console.log(
        "I am in the Service file and I am creating a new product request"
      )
      return true;
    } catch (error) {
      console.log(error);
      return { state: false, error: error.response.data.message };
    }
  },
};
