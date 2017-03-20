MD5 WebWorker
=============

![MD5 WebWorker](misc/banner.png)

**Compute MD5 of files in the background using web workers!**

Web Worker is a browser technology that allow some JavaScript code
to be executed in the background, and very likely in another thread.

This library allows you to compute the MD5 hash in the background
without blocking the user interface.

The MD5 computation in this library uses [spark-md5](https://github.com/satazor/js-spark-md5). 

[FileWorker](https://github.com/imdreamrunner/js-file-worker) is used
to read files and compute MD5 in the background.

[![Build Status](https://travis-ci.org/imdreamrunner/md5-webworker.svg?branch=master)](https://travis-ci.org/imdreamrunner/md5-webworker)

## How to?

**Step 1: Installation**


You can [download the latest release](https://github.com/imdreamrunner/md5-webworker/releases)
for browser and import it in HTML.

```html
<script src="md5-webworker.min.js"></script>
```

Or using NPM if you use webpack or TypeScript. This package
is available on NPM called [file-worker](https://www.npmjs.com/package/md5-webworker)
as well.

```bash
npm install md5-webworker --save-dev
```

To use this package in JavaScript, you can require it

```javascript
var md5 = require("md5-webworker");
```

or import it.

```javascript
import md5 from "md5-webworker";
```

Because this library is written in TypeScript, if you are using
an editor like WebStorm, you shall be able to get the handy
auto-completion.

**Step 2: Use it**

Just pass in the `File` object to the global function 
(`md5_webworker` in the browser)
and get a promise of the MD5 hashed result in HEX.

In browser:

```javascript
md5_webworker(file).then(function(md5hex) {
    console.log(md5hex);
})
```

In webpack or TypeScript project:

```javascript
hex = await md5(file);
```

## License

**ISC License**
    
Copyright (c) 2017, MD5 WebWorker Authors

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted, provided that the above
copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE
OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
