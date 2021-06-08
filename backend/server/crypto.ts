import crypto from "crypto";
import * as readline from "readline";
import stream from "stream";

export function createPassword(password: string): {
  hash: string;
  salt: string;
} {
  // Creating a unique salt for a particular user
  const salt: string = crypto.randomBytes(16).toString("hex");

  // Hashing user's salt and password with 1000 iterations,

  const hash: string = crypto
    .pbkdf2Sync(password, salt, 2000, 64, `sha512`)
    .toString(`hex`);

  return { hash, salt };
}

export function validatePassword(
  password: string,
  hash: string,
  salt: string
): boolean {
  const input_hash = crypto
    .pbkdf2Sync(password, salt, 2000, 64, `sha512`)
    .toString(`hex`);
  return input_hash === hash;
}

function main() {
  const Writable = stream.Writable;
  const mutableStdout = new Writable({
    write: function (chunk, encoding, callback) {
      process.stdout.write(chunk, encoding);
      callback();
    },
  });

  const rl = readline.createInterface({
    input: process.stdin,
    output: mutableStdout,
    terminal: true,
  });

  rl.question("Password: ", function (password) {
    const result = createPassword(password);
    // eslint-disable-next-line no-console
    console.log("Hash:", result.hash);
    // eslint-disable-next-line no-console
    console.log("Salt:", result.salt);
    rl.close();
  });
}

if (require.main === module) {
  main();
}
