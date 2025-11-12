import * as forge from 'node-forge';
import { Buffer } from 'buffer';

// Ensure buffer is available globally for node-forge
if (typeof window !== 'undefined' && typeof window.Buffer === 'undefined') {
  window.Buffer = Buffer;
}

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


// --- Hill Cipher ---
// Helper to create a matrix from a string of numbers
function createMatrix(key: string): number[][] | null {
  const nums = key.split(/[\s,]+/).map(Number).filter(n => !isNaN(n));
  const len = nums.length;
  const size = Math.sqrt(len);

  if (!Number.isInteger(size) || size === 0) {
    return null; // Must be a perfect square
  }

  const matrix: number[][] = [];
  for (let i = 0; i < size; i++) {
    matrix.push(nums.slice(i * size, (i + 1) * size));
  }
  return matrix;
}

// Helper to get determinant of a 2x2 matrix
function det2x2(m: number[][]): number {
  return m[0][0] * m[1][1] - m[0][1] * m[1][0];
}

// Helper to find modular inverse
function modInverse(a: number, m: number): number {
  a = a % m;
  for (let x = 1; x < m; x++) {
    if ((a * x) % m === 1) {
      return x;
    }
  }
  return 1;
}

// Helper to get inverse of a 2x2 matrix
function invert2x2(m: number[][]): number[][] | null {
    const det = det2x2(m);
    const detInv = modInverse(det, 26);

    if (detInv === 1 && det !== 1) { // A simplified check
        return null;
    }

    const adjugate = [
        [m[1][1], -m[0][1]],
        [-m[1][0], m[0][0]]
    ];

    return adjugate.map(row => row.map(val => (val * detInv % 26 + 26) % 26));
}


export function hillCipher(text: string, key: string, encrypt: boolean): string {
  const keyMatrix = createMatrix(key);
  if (!keyMatrix || (keyMatrix.length !== 2)) { // For simplicity, only support 2x2
    return "Invalid key. Must be 4 numbers forming a 2x2 matrix.";
  }

  let matrix = keyMatrix;
  if (!encrypt) {
    const inverted = invert2x2(keyMatrix);
    if (!inverted) {
        return "Invalid key. Matrix is not invertible for decryption.";
    }
    matrix = inverted;
  }


  const cleanText = text.toUpperCase().replace(/[^A-Z]/g, '');
  const n = matrix.length;
  let result = '';

  for (let i = 0; i < cleanText.length; i += n) {
      const block = cleanText.slice(i, i + n);
      if (block.length < n) {
        // Simple padding. In a real scenario, this would need more care.
        result += block;
        continue;
      }

      const vector = block.split('').map(char => ALPHABET.indexOf(char));
      const newVector = new Array(n).fill(0);

      for (let j = 0; j < n; j++) {
          for (let k = 0; k < n; k++) {
              newVector[j] += matrix[j][k] * vector[k];
          }
          newVector[j] %= 26;
      }
      
      result += newVector.map(val => ALPHABET[val]).join('');
  }

  return result;
}

// --- Playfair Cipher ---
function generatePlayfairKeyTable(key: string): string[][] {
  const table = Array(5).fill(null).map(() => Array(5).fill(''));
  const alphabet = 'ABCDEFGHIKLMNOPQRSTUVWXYZ'; // J is omitted
  let keyString = key.toUpperCase().replace(/[^A-Z]/g, '').replace('J', 'I');
  keyString = [...new Set(keyString.split(''))].join('');
  
  const fullKey = keyString + alphabet;
  const finalKey = [...new Set(fullKey.split(''))].join('');

  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 5; j++) {
      table[i][j] = finalKey[i * 5 + j];
    }
  }
  return table;
}

function findPosition(table: string[][], char: string): { row: number; col: number } {
  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 5; j++) {
      if (table[i][j] === char) {
        return { row: i, col: j };
      }
    }
  }
  return { row: -1, col: -1 };
}

function preparePlayfairInput(text: string): string[] {
  let preparedText = text.toUpperCase().replace(/[^A-Z]/g, '').replace('J', 'I');
  let digraphs = [];

  for (let i = 0; i < preparedText.length; i += 2) {
    let d1 = preparedText[i];
    let d2 = preparedText[i + 1];

    if (!d2) {
      d2 = 'X';
    }
    if (d1 === d2) {
      d2 = 'X';
      i--; // Process the second character of the pair again
    }
    digraphs.push(d1 + d2);
  }
  return digraphs;
}

export function playfairCipher(text: string, key: string, encrypt: boolean): string {
    const table = generatePlayfairKeyTable(key);
    const digraphs = preparePlayfairInput(text);
    const direction = encrypt ? 1 : -1;
    let result = '';

    for (const digraph of digraphs) {
        const char1 = digraph[0];
        const char2 = digraph[1];
        const pos1 = findPosition(table, char1);
        const pos2 = findPosition(table, char2);

        let newChar1, newChar2;

        if (pos1.row === pos2.row) { // Same row
            newChar1 = table[pos1.row][(pos1.col + direction + 5) % 5];
            newChar2 = table[pos2.row][(pos2.col + direction + 5) % 5];
        } else if (pos1.col === pos2.col) { // Same column
            newChar1 = table[(pos1.row + direction + 5) % 5][pos1.col];
            newChar2 = table[(pos2.row + direction + 5) % 5][pos2.col];
        } else { // Rectangle
            newChar1 = table[pos1.row][pos2.col];
            newChar2 = table[pos2.row][pos1.col];
        }
        result += newChar1 + newChar2;
    }
    return result;
}


// --- RSA ---
export function rsaCipher(text: string, key: string, encrypt: boolean): string {
  try {
    const [nStr, eOrDStr] = key.split(',');
    if (!nStr || !eOrDStr) throw new Error("Key must be in 'n,e' or 'n,d' format.");
    const n = new forge.jsbn.BigInteger(nStr.trim());
    const eOrD = new forge.jsbn.BigInteger(eOrDStr.trim());

    let rsaKey;
    if (encrypt) {
        rsaKey = forge.pki.setRsaPublicKey(n, eOrD);
        const encrypted = rsaKey.encrypt(text, 'RSA-OAEP');
        return forge.util.encode64(encrypted);
    } else {
        // For decryption, we assume `e` is provided as a placeholder. We need a proper private key.
        // This is a simplified demo; node-forge needs `d` for decryption.
        // We'll simulate it by treating the second param as d.
        const d = eOrD;
        const p = new forge.jsbn.BigInteger('0'); // Placeholder
        const q = new forge.jsbn.BigInteger('0'); // Placeholder
        const dP = new forge.jsbn.BigInteger('0'); // Placeholder
        const dQ = new forge.jsbn.BigInteger('0'); // Placeholder
        const qInv = new forge.jsbn.BigInteger('0'); // Placeholder
        
        rsaKey = forge.pki.setRsaPrivateKey(n, new forge.jsbn.BigInteger('65537'), d, p, q, dP, dQ, qInv);
        const decrypted = rsaKey.decrypt(forge.util.decode64(text), 'RSA-OAEP');
        return decrypted;
    }
  } catch (e: any) {
    return `RSA Error: ${e.message}. Ensure input is correct. For decryption, input must be Base64 encoded.`;
  }
}

// --- DES ---
export function desCipher(text: string, key: string, encrypt: boolean): string {
    try {
        if (key.length !== 8) {
            return "DES key must be exactly 8 characters long.";
        }
        const keyBytes = forge.util.createBuffer(key, 'utf8');
        const iv = forge.random.getBytesSync(8); // IV should be unique for each encryption
        const cipher = forge.cipher.createCipher('DES-CBC', keyBytes);
        
        if (encrypt) {
            cipher.start({ iv: iv });
            cipher.update(forge.util.createBuffer(text, 'utf8'));
            cipher.finish();
            // Prepend IV to the encrypted data for use in decryption
            const encrypted = iv + cipher.output.getBytes();
            return forge.util.encode64(encrypted);
        } else {
            const decipher = forge.cipher.createDecipher('DES-CBC', keyBytes);
            const encryptedBytes = forge.util.decode64(text);
            const iv = encryptedBytes.slice(0, 8);
            const encryptedData = encryptedBytes.slice(8);

            decipher.start({ iv: iv });
            decipher.update(forge.util.createBuffer(encryptedData));
            const result = decipher.finish();
            if (!result) return "Decryption failed. Check key or input format.";
            return decipher.output.toString('utf8');
        }
    } catch (e: any) {
        return `DES Error: ${e.message}. For decryption, input must be Base64 encoded.`;
    }
}
