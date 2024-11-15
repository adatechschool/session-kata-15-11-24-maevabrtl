const latinToMorse = {
	'A':'.-',
	'B':'-...',
	'C':'-.-.',
	'D':'-..',
	'E':'.',
	'F':'..-.',
	'G':'--.',
	'H':'....',
	'I':'..',
	'J':'.---',
	'K':'-.-',
	'L':'.-..',
	'M':'--',
	'N':'-.',
	'O':'---',
	'P':'.--.',
	'Q':'--.-',
	'R':'.-.',
	'S':'...',
	'T':'-',
	'U':'..-',
	'V':'...-',
	'W':'.--',
	'X':'-..-',
	'Y':'-.--',
	'Z':'--..'
}

const morseToLatin = {
	'-': "T",
	'--': "M",
	'---': "O",
	'--.': "G",
	'--.-': "Q",
	'--..': "Z",
	'-.': "N",
	'-.-': "K",
	'-.--': "Y",
	'-.-.': "C",
	'-..': "D",
	'-..-': "X",
	'-...': "B",
	'.': "E",
	'.-': "A",
	'.--': "W",
	'.---': "J",
	'.--.': "P",
	'.-.': "R",
	'.-..': "L",
	'..': "I",
	'..-': "U",
	'..-.': "F",
	'...': "S",
	'...-': "V",
	'....': "H"
}

function getLatinCharacterList(strToConvert) {
	let charsArr = strToConvert.split('');
	return charsArr;
}

function copyToArr(toCopy, start, stop, arr, index) {
	arr[index] = toCopy[start++];
	while (start < stop && toCopy[start]) {
		arr[index] += toCopy[start++];
	}
	return arr;
}

function getMorseCharacterList(strToConvert) {
	let charsArr = [];
	let charsArrIndex = 0;
	let i = 0;
	let savedStart;
	while (i < strToConvert.length) {
		savedStart = i;
		while (strToConvert[i] === '.' || strToConvert[i] === '-')
			i++;
		charsArr = copyToArr(strToConvert, savedStart, i, charsArr, charsArrIndex);
		charsArrIndex++;
		charsArr[charsArrIndex++] = " ";
		while (i < strToConvert.length && strToConvert[i] != '.' && strToConvert[i] != '-') {
			if (strToConvert[i] == '/')
				charsArr[charsArrIndex++] = '/';
			i++;
		}
	}
	return charsArr;
}

function translateLatinCharacter(latinChar) {
	return (latinToMorse[latinChar]);
}

function translateMorseCharacter(morseChar) {
	return (morseToLatin[morseChar]);
}

function isAlphaMaj(char) {
	if ('Z' >= char && char >= 'A')
		return true;
	return false;
}

function encode(toConvert) {
	let encodedArr = [];
	let encodedArrIndex = 0;
	for (let i in toConvert) {
		if (isAlphaMaj(toConvert[i])) {
			encodedArr[encodedArrIndex++] = translateLatinCharacter(toConvert[i]);
			if (isAlphaMaj(toConvert[Number(Number(i) + 1)]))
				encodedArr[encodedArrIndex++] = ' ';
		}
		else if (!isAlphaMaj(toConvert[i]) && isAlphaMaj(toConvert[i - 1])) {
			encodedArr[encodedArrIndex++] = '/';
		}
		else 
			i++;
	}
	return encodedArr;
}

function decode(toConvert) {
	let decodedArr = [];
	let decodedArrIndex = 0;
	for (let i in toConvert) {
		if (toConvert[i] === ' ' || toConvert[i] === '/')
			decodedArr[decodedArrIndex++] = toConvert[i];
		else
			decodedArr[decodedArrIndex++] = translateMorseCharacter(toConvert[i]);
	}
	return decodedArr;
}
let str = getLatinCharacterList("HELLO, WORLD");
console.log(str);
str = encode(str);
console.log(str);
str = getMorseCharacterList(".... . .-.. .-.. --- / .-- --- .-. .-.. -..");
console.log(str);
str = decode(str);
console.log(str);

/*
.... . .-.. .-.. --- / .-- --- .-. .-.. -.. 
*/
