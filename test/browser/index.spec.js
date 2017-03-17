describe('md5_webworker', () => {

  it('should load FileWorker globally.', () => {
    expect(typeof md5_webworker).toEqual('function');
  });

  it('should compute the md5 correctly', (done) => {
    let string = 'abcdefg';
    let file = new Blob([string], {type: 'text/plain'});
    file.lastModifiedDate = new Date();
    file.name = 'dummy';

    function byteProcessor(reader, writer) {
      reader.onData = (data) => {
        writer.writeOnce(data.byteLength);
      };
      reader.readAll();
    }

    let response = md5_webworker(file, byteProcessor);
    response.then((result) => {
      expect(result).toEqual('7ac66c0f148de9519b8bd264312c4d64');
      done();
    });

  });

});
