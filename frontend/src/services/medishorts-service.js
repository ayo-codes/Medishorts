// @ts-nocheck
import axios from "axios";


// The medishortsService object is used to make API calls to the backend
export const medishortsService = {
  baseUrl: "http://localhost:3000/",

  async signUpUser(email, password, pharmacyName, pharmacyAddress, pharmacyPSIRegistrationNo, pharmacyPhoneNumber, pharmacyFaxNumber, superintendentPharmacist, supervisingPharmacist, pharmacyOwner, vatNumber) {
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
        vatNumber: vatNumber
      };
      const response = await axios.post(`${this.baseUrl}api/users/signup`,  newUserDetails);
      console.log(newUserDetails);
      console.log("I am in the Service file and have created a new user object");
      console.log(response);
      return true
    } catch (error) {
      console.log(error);
      return { state:false, error: error.response.data.message };
    }
  }
}