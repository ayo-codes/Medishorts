// @ts-nocheck
import axios from "axios";


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
      // await axios.post(`${this.baseUrl}api/users/signup`,  newUserDetails);
      console.log(newUserDetails);
      console.log("I am in the Service file and have created a new user object");
      return true
    } catch (error) {
      return false;
    }
  }
}