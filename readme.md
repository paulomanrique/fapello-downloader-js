# Fapello Image Downloader

A utility script to download images from the Fapello website.

## Description

This Node.js script allows you to download images from the Fapello website.  The script provides options for concurrent or sequential downloading based on your preference.

## Prerequisites

- Node.js (version 12 or above)
- npm or Yarn package manager

## Installation

1. Clone this repository or download the script file.

2. Install the dependencies by running either of the following commands:

```bash
npm install
```
or

```bash
yarn install
```

## Usage
To download images from the Fapello website, run the script with the following command:

```bash
node script.js <URL>
```
Replace <URL> with the desired URL from the Fapello website. For example:

```bash
node script.js https://fapello.com/danielle-vedovelli-1/
```

By default, the script will download images sequentially. If you prefer concurrent downloading for faster processing, you can add the --concurrent flag:

```bash
node script.js --concurrent <URL>
```

The downloaded images will be saved to a pictures directory in the current location, organized by username and numbered according to the order of appearance in the webpage.

## License

This project is licensed under the [WTFPL](LICENSE) (Do What The F*ck You Want To Public License).
