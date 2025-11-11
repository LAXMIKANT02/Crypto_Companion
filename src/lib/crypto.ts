// /src/lib/crypto.ts
const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

// --- Caesar ---
function shiftChar(char: string, shift: number): string {
  const isUpper = char === char.toUpperCase();
  const index = ALPHABET.indexOf(char.toUpperCase());
  if (index === -1) return char;

  let shifted = (index + shift) % 26;
  if (shifted < 0) shifted += 26;

  const result = ALPHABET[shifted];
  return isUpper ? result : result.toLowerCase();
}

export function caesarCipher(text: string, shift: number, encrypt: boolean): string {
  const s = encrypt ? shift : -shift;
  return text
    .split('')
    .map(ch => shiftChar(ch, s))
    .join('');
}

// --- Vigenere ---
export function vigenereCipher(text: string, key: string, encrypt: boolean): string {
  if (!key) return text;
  let keyIndex = 0;

  return text
    .split('')
    .map(ch => {
      const idx = ALPHABET.indexOf(ch.toUpperCase());
      if (idx === -1) return ch;
      const keyChar = key[keyIndex % key.length].toUpperCase();
      const kShift = ALPHABET.indexOf(keyChar);
      const shift = encrypt ? kShift : -kShift;
      keyIndex++;
      return shiftChar(ch, shift);
    })
    .join('');
}

// --- Playfair ---
function generatePlayfairMatrix(key: string): string[] {
  const cleaned = key.toUpperCase().replace(/J/g, 'I').replace(/[^A-Z]/g, '');
  const seen = new Set<string>();
  const matrix: string[] = [];

  [...cleaned + ALPHABET.replace('J', '')].forEach(ch => {
    if (!seen.has(ch)) {
      seen.add(ch);
      matrix.push(ch);
    }
  });

  return matrix;
}

export function playfairCipher(text: string, key: string, encrypt: boolean): string {
  const matrix = generatePlayfairMatrix(key);
  const grid = (letter: string) => {
    const i = matrix.indexOf(letter);
    return [Math.floor(i / 5), i % 5];
  };

  let cleaned = text.toUpperCase().replace(/J/g, 'I').replace(/[^A-Z]/g, '');
  let pairs: string[] = [];

  for (let i = 0; i < cleaned.length; i += 2) {
    let a = cleaned[i];
    let b = cleaned[i + 1];
    if (!b || a === b) {
      b = 'X';
      i--;
    }
    pairs.push(a + b);
  }

  const result = pairs.map(pair => {
    const [r1, c1] = grid(pair[0]);
    const [r2, c2] = grid(pair[1]);
    if (r1 === r2) {
      return (
        matrix[r1 * 5 + ((c1 + (encrypt ? 1 : 4)) % 5)] +
        matrix[r2 * 5 + ((c2 + (encrypt ? 1 : 4)) % 5)]
      );
    } else if (c1 === c2) {
      return (
        matrix[((r1 + (encrypt ? 1 : 4)) % 5) * 5 + c1] +
        matrix[((r2 + (encrypt ? 1 : 4)) % 5) * 5 + c2]
      );
    } else {
      return matrix[r1 * 5 + c2] + matrix[r2 * 5 + c1];
    }
  });

  return result.join('');
}

// --- Hill (2x2) ---
function modInverse(a: number, m: number): number {
  a = ((a % m) + m) % m;
  for (let x = 1; x < m; x++) {
    if ((a * x) % m === 1) return x;
  }
  throw new Error('No modular inverse');
}

export function hillCipher(text: string, keyMatrix: number[][], encrypt: boolean): string {
  const clean = text.toUpperCase().replace(/[^A-Z]/g, '');
  let chars: string[] = [];

  let matrix = keyMatrix.map(row => row.slice());

  if (!encrypt) {
    // Compute determinant inverse
    const det = (matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0]) % 26;
    const detInv = modInverse(det, 26);
    // Adjugate and multiply by det inverse mod 26
    matrix = [
      [(matrix[1][1] * detInv) % 26, (-matrix[0][1] * detInv) % 26],
      [(-matrix[1][0] * detInv) % 26, (matrix[0][0] * detInv) % 26],
    ].map(row => row.map(x => ((x % 26) + 26) % 26));
  }

  for (let i = 0; i < clean.length; i += 2) {
    const pair = clean.slice(i, i + 2).padEnd(2, 'X');
    const p = [ALPHABET.indexOf(pair[0]), ALPHABET.indexOf(pair[1])];
    const res = [
      (matrix[0][0] * p[0] + matrix[0][1] * p[1]) % 26,
      (matrix[1][0] * p[0] + matrix[1][1] * p[1]) % 26,
    ];
    chars.push(ALPHABET[res[0]], ALPHABET[res[1]]);
  }

  return chars.join('');
}
