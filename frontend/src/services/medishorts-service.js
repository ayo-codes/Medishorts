// @ts-nocheck
import axios from "axios";


// The medishortsService object is used to make API calls to the backend
export const medishortsService = {
  baseUrl: process.env.NODE_ENV === "development" ? "http://localhost:3000/" : "https://medishorts.onrender.com/" ,
  // baseUrl: "https://medishorts.onrender.com/",

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
      return {
        state: true,
        message: response.data.message,
        user: response.data.user,
        token: response.data.token,
      };
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
      return {state: true , message: response.data.message , user: response.data.user , token: response.data.token};
    } catch (error) {
      console.log(error);
      return { state: false, error: error.response.data.message };
    }
  },

  async getAllUsers() {
    try {
      const response = await axios.get(`${this.baseUrl}api/users/`);
      console.log("I am in the Service file and I am fetching all users");
      console.log(response);
      console.log(response.data);
      return { users: response.data.users, state: true };
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

  async createProductRequest(productName, genericName, costPrice, expiryDate, shortProduct,  token) {
    const newProductRequest = {
      productName: productName,
      genericName: genericName,
      costPrice: costPrice,
      expiryDate: expiryDate,
      shortProduct: shortProduct,
    };
    try {
      const response = await axios.post(
        `${this.baseUrl}api/product-requests/`,
        newProductRequest , token
      );
      console.log(response);
      console.log(
        "I am in the Service file and I am creating a new product request"
      );
      return {
        state: true,
        message: response.data.message,
        productRequest: response.data.productRequest,
      };
    } catch (error) {
      console.log(error);
      return { state: false, error: error.response.data.message };
    }
  },

  async getProductRequestsByUserId(userId ,token) {
    try {
      const response = await axios.get(
        `${this.baseUrl}api/product-requests/user/${userId}`,
        token
      );
      console.log(
        "I am in the Service file and I am fetching product requests by user id"
      );
      console.log(response);
      return { userProductRequests: response.data.userProductRequests, state: true };
    } catch (error) {
      console.log(error);
      return { state: false, error: error.response.data.message };
    }
  },

  async getProductRequestById(productRequestId, token) {
    try {
      const response = await axios.get(
        `${this.baseUrl}api/product-requests/${productRequestId}`, token
      );
      console.log(
        "I am in the Service file and I am fetching a product request by id"
      );
      console.log(response);
      return { productRequest: response.data.productRequest, state: true };
    } catch (error) {
      console.log(error);
      return { state: false, error: error.response.data.message };
    }
  },

  async updateProductRequest(productRequestId, productName, genericName, costPrice, expiryDate, shortProduct,  token) {
    const updatedProductRequest = {
      productName: productName,
      genericName: genericName,
      costPrice: costPrice,
      expiryDate: expiryDate,
      shortProduct: shortProduct,
      
    };
    try {
      const response = await axios.patch(
        `${this.baseUrl}api/product-requests/${productRequestId}`,
        updatedProductRequest,
        token
      );
      console.log(
        "I am in the Service file and I am updating a product request"
      );
      console.log(response);
      return {
        state: true,
        message: response.data.message,
        productRequest: response.data.productRequest,
      };
    } catch (error) {
      console.log(error);
      return { state: false, error: error.response.data.message };
    }
  },

  async deleteProductRequest(productRequestId, token) {
    try {
      const response = await axios.delete(
        `${this.baseUrl}api/product-requests/${productRequestId}`,
        token
      );
      console.log(
        "I am in the Service file and I am deleting a product request"
      );
      console.log(response);
      return { state: true, message: response.data.message };
    } catch (error) {
      console.log(error);
      return { state: false, error: error.response.data.message };
    }
  },

  async getAllShortProductsHpra() {
    try {
      const response = await axios.get(`${this.baseUrl}api/short-products-hpra/`);
      console.log(
        "I am in the Service file and I am fetching all short products from HPRA" 
      );
      console.log(response);
      console.log(response.data);
      return { shortProductsHpra: response.data.shortProductsHpra, state: true };
    } catch (error) {
      console.log(error);
      return { state: false, error: error.response.data.message };
    }
  },

};
