# CryptoCompanion

**Unlock the Secrets of Encryption**

CryptoCompanion is an interactive, web-based educational tool designed to make learning about cryptography both easy and engaging. This application provides a hands-on experience with a wide range of encryption techniques, from historical ciphers to the foundational principles of modern digital security.

## Features

- **Classical Cipher Tool**: Experiment with famous historical ciphers like Caesar, Vigenère, Playfair, and the Hill cipher. Encrypt and decrypt messages to see these techniques in action.
- **Modern Algorithm Demo**: Dive into the world of symmetric and asymmetric cryptography with an interactive sender-receiver simulation for algorithms like RSA and DES. Understand the practical application of public and private keys.
- **AI-Powered Key Generation**: Leverage a generative AI to instantly create secure and valid keys for the various cryptographic algorithms.
- **Clean, Multi-Page Interface**: A well-organized and intuitive user interface built with Next.js and ShadCN UI, making navigation and learning a seamless experience.

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) & [ShadCN UI](https://ui.shadcn.com/)
- **AI/Generative**: [Firebase Genkit](https://firebase.google.com/docs/genkit)
- **Cryptography Library**: `node-forge`
- **Deployment**: Firebase App Hosting

## Getting Started

To run this project locally:

1.  **Install dependencies**:
    ```bash
    npm install
    ```

2.  **Run the development server**:
    This command starts the Next.js application.
    ```bash
    npm run dev
    ```

3.  **Run the Genkit development server**:
    This command starts the Genkit AI flows in a separate terminal.
    ```bash
    npm run genkit:dev
    ```

Open [http://localhost:9002](http://localhost:9002) with your browser to see the result.
