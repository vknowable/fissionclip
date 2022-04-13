# fissionClip

This is a simple clipboard demo app using the [webnative sdk](https://github.com/fission-suite/webnative) with React. You save small snippets of text (eg: links, memos) to persist them across your devices.

## Try it

You can give it a spin at: ...

## Quick Start

To run locally:

```sh
# Install dependencies.
npm install

# Run the server
npm start
```

The app will then be available at [http://localhost:3000](http://localhost:3000)

## Build

Build the application.

```shell
npm run build
```

The build will be in `build`.

## Publish

You can publish your own version of this app with Fission! [Install the Fission CLI](https://guide.fission.codes/developers/installation) if you haven't already. 

Build the application before the following steps.

Delete `fission.yaml` and then register your own subdomain.

```shell
fission app register
```

The CLI should prompt you with the appropriate build directory.

Publish the app.

```shell
fission app publish
```

Your version of the app is now live!
