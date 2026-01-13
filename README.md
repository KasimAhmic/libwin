# @ahmic/libwin

<div align="center">

Native Node.js wrapper for the Windows API.

![Commit Activity](https://img.shields.io/github/commit-activity/m/KasimAhmic/libwin)
![Issues](https://img.shields.io/github/issues/KasimAhmic/libwin)
![GitHub Pull Requests](https://img.shields.io/github/issues-pr/KasimAhmic/libwin)

</div>

## About

`libwin` is a Node.js addon that provides access to various Windows API functions, allowing developers to interact with
the Windows operating system directly from their Node.js applications. It is built using the Node API and C++ to ensure
high performance and compatibility across different Node.js versions.

## Packages

- `@libwin/core`: Shared functionality and types for libwin packages.
- `@libwin/user32`: Wrapper for User32.dll functions.
- `@libwin/kernel32`: Wrapper for Kernel32.dll functions.
- `@libwin/gdi32`: Wrapper for Gdi32.dll functions.
- `@libwin/comctl32`: Wrapper for Comctl32.dll functions.

## Status

The project is currently in active development with only a handful of functions implemented. There are thousands of
functions in the Windows API so it will take quite some time to cover them all. In its current state, there is enough
functionality to build simple Win32 apps. Check out the `demo/` directory for some examples.

## Building

As this project is meant to wrap the Windows API, it is only officially supported on Windows with the MSVC toolchain. In
order to build the project, you will need to have the following installed:

- Node.js (LTS version recommended)
- Python (v3.13 or newer)
- Visual Studio with C++ build tools

To build the project, clone the repository and run the following commands:

```bash
npm install
npm run configure
npm run build
```

## Running the Demos

Once the project is built, you can run the demo applications located in the `demo/` directory:

```bash
cd demo
npm install

npm run win32 # Simple app with a single button
npm run notepad # A Notepad clone written with libwin
```
