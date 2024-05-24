//Import------------------------------------------------------------------------------------
import axios from "axios";
//END---------------------------------------------------------------------------------------

/**
 * FUNCTION STARTS FROM HERE
 */

/*  save use data
 * @createdBy Ankit
 */
async function saveUserData(data) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  
  let response = await axios.post("/saveUserData", data);

  console.log("api response :", response.data)
  try {
    let response_data = response;
    return response_data;
  } catch (err) {
    console.log(err)
    return err;
  }
}

/* User Login
 * @createdBy Ankit
 */
async function userLogin(data) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  
  let response = await axios.post("/userLogin", data);

  console.log("api response :", response.data)
  try {
    let response_data = response;
    return response_data;
  } catch (err) {
    console.log(err)
    return err;
  }
}
export default {
    saveUserData,
    userLogin
  }