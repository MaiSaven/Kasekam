<?php

class UTencryption{

    // Encryption Function
    public static function encryptString($string) {
        $key = 'okletgo2024';//////////////KEY OKOK;

        $cipher = "aes-256-cbc"; // AES encryption with 256-bit key in CBC mode
        $iv_length = openssl_cipher_iv_length($cipher);
        $iv = openssl_random_pseudo_bytes($iv_length); // Generate an initialization vector

        // Encrypt the string
        $encrypted = openssl_encrypt($string, $cipher, $key, OPENSSL_RAW_DATA, $iv);

        // Concatenate the IV with the encrypted data
        $encryptedWithIv = $iv . $encrypted;

        // Encode the result to ensure it can be safely stored or transmitted
        $encoded = base64_encode($encryptedWithIv);

        return $encoded;
    }

    // Decryption Function
    public static function decryptString($encryptedString) {
        $key = 'okletgo2024';//////////////KEY OKOK;

        $cipher = "aes-256-cbc"; // AES encryption with 256-bit key in CBC mode
        $encryptedWithIv = base64_decode($encryptedString);

        // Extract the IV from the encrypted data
        $iv_length = openssl_cipher_iv_length($cipher);
        $iv = substr($encryptedWithIv, 0, $iv_length);
        $encrypted = substr($encryptedWithIv, $iv_length);

        // Decrypt the data
        $decrypted = openssl_decrypt($encrypted, $cipher, $key, OPENSSL_RAW_DATA, $iv);

        return $decrypted;
    }

    // Example usage
    // $key = "YourSecretKey"; // This should be a secret and securely stored
    // $string = "Hello, world!";
    // $encrypted = encryptString($string);
    // echo "Encrypted String: " . $encrypted . "\n";

    // $decrypted = decryptString($encrypted);
    // echo "Decrypted String: " . $decrypted . "\n";
}
?>
