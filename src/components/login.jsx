import React, { useState } from "react";
import toast from "react-hot-toast";
import { useLDClient } from "launchdarkly-react-client-sdk";
import Toasts from "./toaster";

export default function Login() {
  const LDClient = useLDClient();

  const [userState, setUserState] = useState({
    username: "",
  });

  async function setCurrLDUser() {
    const obj = await LDClient.getUser();
    return obj;
  }

  const submitUser = async (e) => {
    e.preventDefault();
    const lduser = await setCurrLDUser();
    lduser.key = userState.username;
    await LDClient.identify(lduser);
    LDClient.track('userLogin', { customProperty: userState.username });
    toast.success("Your LaunchDarkly user is " + userState.username);
    console.log("The updated user is: " + lduser.key);
    Array.from(document.querySelectorAll("input")).forEach(
      (input) => (input.value = "")
    );
  };

  const clearUser = async (e) => {
    e.preventDefault();
    const lduser = await setCurrLDUser();
    lduser.key = "anonymous";
    await LDClient.identify(lduser);
    LDClient.track('userClear', { customProperty: userState.username });
    await console.log(LDClient.getUser());
    toast.success("User has been cleared");
    Array.from(document.querySelectorAll("input")).forEach(
      (input) => (input.value = "")
    );
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setUserState((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  return (
    <div className="">
      <Toasts />
      <div className={`bg-ldgray p-4 px-7 2xl:px-14 shadow-2xl`}>
        <div className="pb-4 text-2xl">Submit a User Below</div>
        <form>
          <div className="flex items-center bg-white overflow-hidden px-2 py-1 justify-between">
            <input
              className="text-base text-gray-400 flex-grow outline-none px-2 "
              type="input"
              id="username"
              placeholder="Enter Username"
              value={userState.username}
              onChange={handleChange}
            />
            <div className="flex items-center px-2 space-x-4 mx-auto submission">
              <button
                type="submit"
                id="submission"
                className="bg-ldblue text-white text-base px-4 py-2 "
                onClick={submitUser.bind(userState)}
              >
                Submit
              </button>
            </div>
          </div>
          <button
            type="submit"
            id="clear"
            className="bg-ldred text-white text-base px-4 py-2 "
            onClick={clearUser.bind()}
          >
            Clear User
          </button>
        </form>
      </div>
    </div>
  );
}
