// When transmitting the Morse code, the international standard specifies that:

// "Dot" – is 1 time unit long.
// "Dash" – is 3 time units long.
// Pause between dots and dashes in a character – is 1 time unit long.
// Pause between characters inside a word – is 3 time units long.
// Pause between words – is 7 time units long.

// However, the standard does not specify how long that "time unit" is. 
// And in fact different operators would transmit at different speed. 
// An amateur person may need a few seconds to transmit a single character, 
// a skilled professional can transmit 60 words per minute, 
// and robotic transmitters may go way faster.

// For this kata we assume the message receiving is performed automatically by the 
// hardware that checks the line periodically, and if the line is connected 
// (the key at the remote station is down), 1 is recorded, and if the line is 
// not connected (remote key is up), 0 is recorded. After the message is fully 
// received, it gets to you for decoding as a string containing only symbols 0 and 1.

const MORSE_CODE: { [name: string]: string } = {
  '-.-.--': '!',
  '.-..-.': '"',
  '...-..-': '$',
  '.-...': '&',
  '.----.': "'",
  '-.--.': '(',
  '-.--.-': ')',
  '.-.-.': '+',
  '--..--': ',',
  '-....-': '-',
  '.-.-.-': '.',
  '-..-.': '/',
  '-----': '0',
  '.----': '1',
  '..---': '2',
  '...--': '3',
  '....-': '4',
  '.....': '5',
  '-....': '6',
  '--...': '7',
  '---..': '8',
  '----.': '9',
  '---...': ':',
  '-.-.-.': ';',
  '-...-': '=',
  '..--..': '?',
  '.--.-.': '@',
  '.-': 'A',
  '-...': 'B',
  '-.-.': 'C',
  '-..': 'D',
  '.': 'E',
  '..-.': 'F',
  '--.': 'G',
  '....': 'H',
  '..': 'I',
  '.---': 'J',
  '-.-': 'K',
  '.-..': 'L',
  '--': 'M',
  '-.': 'N',
  '---': 'O',
  '.--.': 'P',
  '--.-': 'Q',
  '.-.': 'R',
  '...': 'S',
  '-': 'T',
  '..-': 'U',
  '...-': 'V',
  '.--': 'W',
  '-..-': 'X',
  '-.--': 'Y',
  '--..': 'Z',
  '..--.-': '_',
  '...---...': 'SOS'
}

const bitLength = (bits: string): number => {
  let onesLength = bits.split('0').filter(x => x.length > 0).sort((a, b) => a.length - b.length)[0].length;
  if (bits.includes("0")) {
    let zerosLength = bits.split('1').filter(x => x.length > 0).sort((a, b) => a.length - b.length)[0].length;
    return onesLength > zerosLength ? zerosLength : onesLength;
  }
  return onesLength;
}

const replaceBits = (bits: string, pattern: string[]): string => {
  const reg = new RegExp(pattern[1], "g");
  return bits.replace(reg, pattern[0]);
}

export const decodeBits = (bits: string): string => {
  let cleanedBits = bits.replace(/(^0+|0+$)/g, '');
  let timeLength: number = bitLength(cleanedBits);
  const transcodeKeys: { [name: string]: string } = {
    '-': '111'.repeat(timeLength),
    '  ': '000'.repeat(timeLength),
    '.': '1'.repeat(timeLength),
    '': '0',
  }
  Object.entries(transcodeKeys).map((x: string[]): void => { cleanedBits = replaceBits(cleanedBits, x) });
  return cleanedBits;
};

const decodeWord = (word: string) => {
  return word.split(" ").map((x: string) => MORSE_CODE[x]).join('');
}

export const decodeMorse = (morseCode: string): string => {
  return morseCode.trim().split("   ").map((word: string): string => decodeWord(word)).join(" ");
}

import { assert } from 'chai';
import { time } from 'console'
import { resourceLimits } from 'worker_threads';

const Test = {
  assertEquals: (...args: any[]) => (assert as any).equal(...args),
};

let bits;

console.log(`testing: hey jude`)
bits = '1100110011001100000011000000111111001100111111001111110000000000000011001111110011111100111111000000110011001111110000001111110011001100000011';
Test.assertEquals(decodeMorse(decodeBits(bits)), 'HEY JUDE')

console.log(`testing: M`)
bits = '1110111'
Test.assertEquals(decodeMorse(decodeBits(bits)), 'M')

console.log(`testing: EE`)
bits = '10001'
Test.assertEquals(decodeMorse(decodeBits(bits)), 'EE')


console.log(`testing: E`)
bits = '1111111'
Test.assertEquals(decodeMorse(decodeBits(bits)), 'E')

console.log(`testing: E`)
bits = '111'
Test.assertEquals(decodeMorse(decodeBits(bits)), 'E')

console.log(`testing: brown fox jumps`)
bits = '00011100010101010001000000011101110101110001010111000101000111010111010001110101110000000111010101000101110100011101110111000101110111000111010000000101011101000111011101110001110101011100000001011101110111000101011100011101110001011101110100010101000000011101110111000101010111000100010111010000000111000101010100010000000101110101000101110001110111010100011101011101110000000111010100011101110111000111011101000101110101110101110'
Test.assertEquals(decodeMorse(decodeBits(bits)), 'THE QUICK BROWN FOX JUMPS OVER THE LAZY DOG.')

