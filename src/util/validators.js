export const validateSignup = (email, pass, confirmPass) =>  {
    let error =""
    const emailRegEx = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (email.length === 0 || pass.length === 0 || confirmPass.length === 0) {
        error = "Must not be empty"
        return [false, error]
    }
    if (!emailRegEx.test((email))) {
        error = "Invalid email"
        return [false, error]
    }
    if (confirmPass !== pass) {
        error = "Passwords must match"
        return [false, error]
    }
    if (pass.length < 6) {
        error = "Password too short, must be longer than 5 characters"
        return [false, error]
    }
    return [true, ""]
}
export const validateLogin = (email, password) => {
    let error =""
    if (email.length === 0 || password.length === 0) {
        error = "Must not be empty"
        return [false, error]
    }
    return [true, ""]
}