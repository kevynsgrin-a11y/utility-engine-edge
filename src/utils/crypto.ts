const hexToBuffer = (hex: string): Uint8Array => {
  const matches = hex.match(/.{1,2}/g);
  if (!matches) return new Uint8Array();
  return new Uint8Array(matches.map((byte) => parseInt(byte, 16)));
};

const bufferToHex = (buffer: ArrayBuffer | Uint8Array): string => {
  const arr = buffer instanceof ArrayBuffer ? new Uint8Array(buffer) : buffer;
  return Array.from(arr).map((b) => b.toString(16).padStart(2, '0')).join('');
};

export const hashPassword = async (password: string, saltHex?: string) => {
  const enc = new TextEncoder();
  const passwordBuffer = enc.encode(password);
  const saltBuffer = saltHex ? hexToBuffer(saltHex) : crypto.getRandomValues(new Uint8Array(16));
  
  const keyMaterial = await crypto.subtle.importKey('raw', passwordBuffer, { name: 'PBKDF2' }, false, ['deriveBits']);
  const hashBuffer = await crypto.subtle.deriveBits(
    { name: 'PBKDF2', salt: saltBuffer, iterations: 100000, hash: 'SHA-256' },
    keyMaterial,
    256
  );

  return { hash: bufferToHex(hashBuffer), salt: bufferToHex(saltBuffer) };
};

export const verifyPassword = async (password: string, storedHash: string, storedSalt: string): Promise<boolean> => {
  const { hash } = await hashPassword(password, storedSalt);
  return hash === storedHash;
};
