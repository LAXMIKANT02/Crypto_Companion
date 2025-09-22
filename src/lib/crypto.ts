const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

function shiftChar(char: string, shift: number): string {
  const isUpperCase = char === char.toUpperCase();
  const charUpper = char.toUpperCase();
  const index = ALPHABET.indexOf(charUpper);

  if (index === -1) {
    return char; // Not an alphabet character
  }

  let shiftedIndex = (index + shift) % ALPHABET.length;
  if (shiftedIndex < 0) {
    shiftedIndex += ALPHABET.length;
  }

  const shiftedChar = ALPHABET[shiftedIndex];
  return isUpperCase ? shiftedChar : shiftedChar.toLowerCase();
}

export function caesarCipher(text: string, shift: number, encrypt: boolean): string {
  const finalShift = encrypt ? shift : -shift;
  return text
    .split('')
    .map(char => shiftChar(char, finalShift))
    .join('');
}

export function vigenereCipher(text: string, key: string, encrypt: boolean): string {
  if (!key || !/^[a-zA-Z]+$/.test(key)) {
    return text; // Return original text if key is invalid
  }

  let keyIndex = 0;
  return text
    .split('')
    .map(char => {
      const charUpper = char.toUpperCase();
      if (ALPHABET.indexOf(charUpper) === -1) {
        return char; // Not an alphabet character, so don't increment keyIndex
      }

      const keyChar = key[keyIndex % key.length].toUpperCase();
      const keyShift = ALPHABET.indexOf(keyChar);
      const finalShift = encrypt ? keyShift : -keyShift;

      keyIndex++;
      return shiftChar(char, finalShift);
    })
    .join('');
}
