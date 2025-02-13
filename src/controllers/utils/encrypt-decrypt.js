const crypto = require("crypto");

const algorithm = "aes-256-cbc";
const secretKey = crypto.randomBytes(32); // Store securely
const iv = crypto.randomBytes(16); // Initialization Vector

// Encrypt Function
exports.encrypt = (text) => {
    const cipher = crypto.createCipheriv(algorithm, secretKey, iv);
    let encrypted = cipher.update(text, "utf8", "hex");
    encrypted += cipher.final("hex");
    return { iv: iv.toString("hex"), encryptedData: encrypted };
}

// Decrypt Function
exports.decrypt = (encryptedObject) => {
    const decipher = crypto.createDecipheriv(
        algorithm,
        secretKey,
        Buffer.from(encryptedObject.iv, "hex")
    );
    let decrypted = decipher.update(encryptedObject.encryptedData, "hex", "utf8");
    decrypted += decipher.final("utf8");
    return decrypted;
}
