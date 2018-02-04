const fs = require("fs");
// Get an instance of `PhoneNumberUtil`.
const googleLibphonenumber = require("google-libphonenumber");
const phoneUtil = googleLibphonenumber.PhoneNumberUtil.getInstance();
const PNF = googleLibphonenumber.PhoneNumberFormat;
const phoneNumberType = googleLibphonenumber.PhoneNumberType;

const invertedPhoneNumberType = Object.keys(phoneNumberType)
  .reduce((obj, key) => {
    obj[phoneNumberType[key]] = key;
    return obj;
  }, {});

const regexpPhonePL = /^(?:(?:(?:\+|00)?48)|(?:\(\+?48\)))?(?:1[2-8]|2[2-69]|3[2-49]|4[1-68]|5[0-9]|6[0-35-9]|[7-8][1-9]|9[145])\d{7}$/;
// Matches only Mobile and Fixed-line numbers
const regexpOnlyMobileAndFixed = /^(?:(?:(?:\+|00)?48)|(?:\(\+?48\)))?(?:1[2-8]|2[2-59]|3[2-4]|4[1-68]|5[0-9]|6[0-35-9]|[7-8][1-9]|9[145])\d{7}$/;
// Matches the same nine digit phone numbers as Google Libphonenumber
const regexpLibphone = /^(?:(?:(?:\+|00)?48)|(?:\(\+?48\)))?(?:(?:1[2-8]|2[2-69]|3[2-49]|4[1-68]|5[0-9]|6[0-9]|[7-8][1-9]|9[145])\d{7}|(?:(?:70[01346-8]|80[014]))\d{6})$/;

const outputFileName = "regexPhonePL_FAILED.txt";
const data = testNumbers(regexpPhonePL, "+48", 100000000, 999999999, 100000);
// Optionally filter data
const formattedData = formatData(data.filter(number => number.regexpTest === "FAILED"));

// Write script result to file
fs.writeFile(outputFileName, formattedData, (err) => {
  if (err) {
    throw err;
  }
  console.log(`File \x1b[36m${outputFileName}\x1b[37m written.`);
});

function testNumbers(regexp, prefix, start, stop, step) {

  function parseWithLibphonenumber(num) {
    num = num.toString();
    const prefixedNum = prefix + num;

    const parsedNumber = phoneUtil.parse(prefixedNum, "PL");
    const isValid = phoneUtil.isValidNumberForRegion(parsedNumber, "PL");
    const isValidRe = regexp.test(prefixedNum);
    const regexpTest = isValid === isValidRe ? "PASSED" : "FAILED";
    const numberType = phoneUtil.getNumberType(parsedNumber);
    const type = getType(numberType);

    let formatedNumber;
    let numZone;
    if (isValid) {
      // If phoneNumberType is FIXED_LINE get numbering zone
      if (numberType === 0) {
        numZone = getNumberingZone(num);
      }
      formatedNumber = phoneUtil.format(parsedNumber, PNF.NATIONAL);
      console.log(formatedNumber, "=>", type, numZone, regexpTest);
    } else {
      formatedNumber = num.match(/.{1,3}/g).join(" ");
    }

    return {
      "formatedNumber": formatedNumber,
      "isValid": isValid,
      "isValidRe": isValidRe,
      "regexpTest": regexpTest,
      "type": type,
      "numZone": numZone
    };
  }

  const testedNumbers = [];
  for (let i = start; i <= stop; i += step) {
    testedNumbers.push(parseWithLibphonenumber(i));
  }
  return testedNumbers;
}

function getType(key) {
  const type = invertedPhoneNumberType[key];
  if (type !== "UNKNOWN") {
    return type;
  }
}

function getNumberingZone(num) {
  const geoCoder = {
    "12":"Kraków",
    "13":"Krosno",
    "14":"Tarnów",
    "15":"Tarnobrzeg",
    "16":"Przemyśl",
    "17":"Rzeszów",
    "18":"Nowy Sącz",
    "22":"Warszawa",
    "23":"Ciechanów",
    "24":"Płock",
    "25":"Siedlce",
    "29":"Ostrołęka",
    "32":"Katowice",
    "33":"Bielsko-Biała",
    "34":"Częstochowa",
    "41":"Kielce",
    "42":"Łódź",
    "43":"Sieradz",
    "44":"Piotrków Trybunalski",
    "46":"Skierniewice",
    "48":"Radom",
    "52":"Bydgoszcz",
    "54":"Włocławek",
    "55":"Elbląg",
    "56":"Toruń",
    "58":"Gdańsk",
    "59":"Słupsk",
    "61":"Poznań",
    "62":"Kalisz",
    "63":"Konin",
    "65":"Leszno",
    "67":"Piła",
    "68":"Zielona Góra",
    "71":"Wrocław",
    "74":"Wałbrzych",
    "75":"Jelenia Góra",
    "76":"Legnica",
    "77":"Opole",
    "81":"Lublin",
    "82":"Chełm",
    "83":"Biała Podlaska",
    "84":"Zamość",
    "85":"Białystok",
    "86":"Łomża",
    "87":"Suwałki",
    "89":"Olsztyn",
    "91":"Szczecin",
    "94":"Koszalin",
    "95":"Gorzów Wielkopolski"
  };
  return geoCoder[num.substr(0,2)];
}

function formatData(data) {
  return data.map(({formatedNumber, isValid, regexpTest, type, numZone}) => {
    return `${formatedNumber} => ${isValid ? "valid" : "invalid"}, ` +
            (type ? `type: ${type}, ` : "") +
            (numZone ? `numbering zone: ${numZone}, ` : "") + regexpTest;
  }).join("\r\n");
}
