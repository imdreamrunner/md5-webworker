MD5 WebWorker
=============

**Compute MD5 of files in the background using web workers!**

## Usage

Just pass in the `File` object to the global function `md5_webworker`
and get a promise of the MD5 hashed result in HEX.

```javascript
md5_webworker(file).then(function(md5hex) {
    console.log(md5hex);
})
```
