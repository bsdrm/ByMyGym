import validator from "validator";

// https://www.npmjs.com/package/validator

/*
 * This class contains methods for validating fields using 'validator.js' library methods
 * The methods return error message if validation failed and false otherwise
 * You can use all supported validators and sanitizers of 'validator.js' libaray
 * See their docs here https://github.com/validatorjs/validator.js
 */

class ValidateFields {
	/*
	 * A method that takes in the email
	 * Validates it
	 * Returns the response either error or false if there is no error
	 */
	validateEmail(email) {
		if (!email) {
			return "Email jest wymagany";
		} else if (!validator.isEmail(email)) {
			return "Niepoprawny e-mail";
		}
		return false;
	}

	// validatePassword(password) {
	//   if (validator.isEmpty(password)) {
	//     return "Password is required";
	//   } else if (!validator.isLength(password, { min: 8 })) {
	//     return "Password should be minimum 8 characters";
	//   }
	//   return false;
	// }

	// ******************************

	validateName(name) {
		if (!name) {
			return "Imię jest wymagane";
		} else if (!validator.isLength(name, { min: 2 })) {
			return "Imię powinno zawierać minimum 2 litery";
		}
		return false;
	}

	validateSurname(surname) {
		if (!surname) {
			return "Nazwisko jest wymagane";
		} else if (!validator.isLength(surname, { min: 2 })) {
			return "Nazwisko powinno zawierać minimum 2 litery";
		}
		return false;
	}

	validatePhoneNumber(phoneNumber) {
		if (!phoneNumber) {
			return "Telefon jest wymagany";
		} else if (!validator.isMobilePhone(phoneNumber, "pl-PL")) {
			return "Niepoprawny telefon";
		}
		return false;
	}

	// gym profile data
	validateGymName(gymName) {
		if (!gymName) {
			return "Nazwa budynku jest wymagana";
		} else if (!validator.isLength(gymName, { min: 2 })) {
			return "Nazwa budynku powinna zawierać minimum 2 litery";
		}
		return false;
	}

	validateGymStreet(gymStreet) {
		if (!gymStreet) {
			return "Ulica jest wymagana";
		} else if (!validator.isLength(gymStreet, { min: 2 })) {
			return "Ulica powinna zawierać minimum 2 litery";
		}
		return false;
	}

	validateGymCity(gymCity) {
		if (!gymCity) {
			return "Miasto jest wymagane";
		} else if (!validator.isLength(gymCity, { min: 2 })) {
			return "Miasto powinno zawierać minimum 2 litery";
		}
		return false;
	}

	validateGymZip(gymZip) {
		if (!gymZip) {
			return "Kod pocztowy jest wymagany";
		} else if (!validator.isPostalCode(gymZip, "PL")) {
			return "Proszę wprowadzić kod pocztowy w poprawnym formacie: 11-111";
		}
		return false;
	}

	validateGymHeight(gymHeight) {
		if (!gymHeight) {
			return "Wysokość jest wymagana";
		} else if (
			!/^(?=.*[1-9])[1-9]{1,5}(?:\.\d\d?)?$/.test(gymHeight) ||
			gymHeight <= 0
		) {
			return "Liczba jest nieprawidłowa";
		}
		return false;
	}

	validateGymWidth(gymWidth) {
		if (!gymWidth) {
			return "Szerokość jest wymagana";
		} else if (
			!/^(?=.*[1-9])[1-9]{1,5}(?:\.\d\d?)?$/.test(gymWidth) ||
			gymWidth <= 0
		) {
			return "Liczba jest nieprawidłowa";
		}
		return false;
	}

	validateGymLength(gymLength) {
		if (!gymLength) {
			return "Długość jest wymagana";
		} else if (
			!/^(?=.*[1-9])[1-9]{1,5}(?:\.\d\d?)?$/.test(gymLength) ||
			gymLength <= 0
		) {
			return "Liczba jest nieprawidłowa";
		}
		return false;
	}

	validateGymPrice(gymPrice) {
		if (!gymPrice) {
			return "Cena jest wymagana";
		} else if (!/^\d{1,3}(?:[.,]\d{3})*(?:[.,]\d{2})?$/.test(gymPrice) || gymPrice <= 0) {
			return "Cena wpisana w niepoprawnej postaci";
		}
		return false;
	}

	validateAudience(audience) {
		if (!audience) {
			return "Liczba miejsc na widowni jest wymagana";
		} else if (!/^(?=.*[0-9])[0-9]{1,6}$/.test(audience) || audience < 0) {
			return "Liczba jest nieprawidłowa";
		}
		return false;
	}

	validateChangingRooms(changingRooms) {
		if (!changingRooms) {
			return "Proszę wprowadzić ilość szatń";
		} else if (
			!/^(?=.*[0-9])[0-9]{1,3}$/.test(changingRooms) ||
			changingRooms < 0
		) {
			return "Liczba jest nieprawidłowa";
		}
		return false;
	}

	validateGymURL(gymURL) {
		if (!gymURL) {
			return false;
		} else if (!/^$|^(https?:\/\/(?:www\.|(?!www)))?[a-zA-Z0-9][a-zA-Z0-9-]+\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,}$/.test(gymURL)) {
			return "URL jest wprowadzony w nieprawidłowym formacie";
		}
		return false;
	}

	validateGymPhone(gymPhone) {
		if (!gymPhone) {
			return "Telefon jest wymagany";
		} else if (!validator.isMobilePhone(gymPhone, "pl-PL")) {
			return "Telefon jest wprowadzony w nieprawidłowym formacie";
		}
		return false;
	}

	validateGymEmail(gymEmail) {
		if (!gymEmail) {
			return "Email jest wymagany";
		} else if (!validator.isEmail(gymEmail)) {
			return "Niepoprawny e-mail";
		}
		return false;
	}

	validateGymDescription(gymDescription) {
		if (!gymDescription) {
			return false;
		}
		return false;
	}

	validateGymOwner(gymOwner) {
		if (!gymOwner) {
			return false;
		} else if (!validator.isLength(gymOwner, { min: 20 })) {
			return "ID właściciela powinno mieć 20 znaków";
		}
		return false;
	}
}

const validateFields = new ValidateFields();

// export the class instance, so we can import and use it anywhere
export { validateFields };
