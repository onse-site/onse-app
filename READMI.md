# ONSE App

This project consists of a client-side application, a server-side application, and a separate dashboard client.

## Project Structure

- **`.github/workflows/`**: Contains GitHub Actions workflows, for example, for deployment ([`.github/workflows/deploy.yml`](.github/workflows/deploy.yml)).
- **`client/`**: Contains the main client-side application.
  - `client/dashboard/`: Contains a separate dashboard application. More details can be found in its [README.md](client/dashboard/README.md).
  - `client/src/`: Source code for the main client.
  - `client/package.json`: Dependencies and scripts for the main client.
  - `client/vite.config.js`: Vite configuration for the main client.
- **`server/`**: Contains the server-side application.
  - `server/index.js`: Main entry point for the server.
  - `server/package.json`: Dependencies and scripts for the server.
- **`package.json`**: Root project scripts and dependencies ([package.json](package.json)).

## Getting Started

### Prerequisites

- Node.js (version as per your project's requirements)
- npm (or yarn)

### Installation

1.  Clone the repository.
2.  Install root dependencies:
    ```sh
    npm install
    ```
3.  The root `npm install` should trigger postinstall scripts or you might need to install dependencies for `client`, `client/dashboard`, and `server` separately if not handled by the root `package.json`.
    - For the client: `cd client && npm install`
    - For the dashboard: `cd client/dashboard && npm install`
    - For the server: `cd server && npm install`

### Development

To run the client and server concurrently For development (which includes building the client and copying assets to the server's public folder):

```sh
npm run dev
```
