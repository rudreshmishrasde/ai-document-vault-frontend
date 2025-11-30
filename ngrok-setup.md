# Ngrok Setup for Local Development

## Option 1: Download ngrok directly

1. Go to https://ngrok.com/download
2. Download ngrok for macOS
3. Extract the file
4. Move it to a location in your PATH (e.g., `/usr/local/bin/`) or run it from the download location

## Option 2: Install via Homebrew (if permissions are fixed)

```bash
brew install ngrok/ngrok/ngrok
```

## Running ngrok

Once ngrok is installed, run:

```bash
ngrok http 5173
```

This will create a public URL that tunnels to your local `http://localhost:5173/`

## Alternative: Use npx (no installation needed)

You can also use ngrok via npx without installing:

```bash
npx ngrok http 5173
```

## Getting your ngrok URL

After running ngrok, you'll see output like:
```
Forwarding  https://abc123.ngrok.io -> http://localhost:5173
```

Use the `https://abc123.ngrok.io` URL to access your local development server from anywhere.

