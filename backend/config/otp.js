import optGenerator from "otp-generator";

export default function generateOtp(len = 6, lowerCase = false, upperCase = false, digits = true,spacialChar=false) {
    let otp = optGenerator.generate(len, { digits, lowerCaseAlphabets: lowerCase, upperCaseAlphabets: upperCase ,specialChars : spacialChar})
    return otp;
}