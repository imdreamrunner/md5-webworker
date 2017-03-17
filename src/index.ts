import FileWorker from 'file-worker';
import {FileWorkerReader, FileWorkerWriter, FileWorkerOnDataHandler} from "file-worker";

declare const SparkMD5 : any;
declare const __SPARK_MD5__ : any;

export default async function md5_webworker(file: File): Promise<string> {

    function processor(reader : FileWorkerReader, writer : FileWorkerWriter) {
        __SPARK_MD5__
        reader.onData = function (data) {
            writer.writeOnce(SparkMD5.ArrayBuffer.hash(data));
        };
        reader.readAll();
    }
    return FileWorker.readFile(file, processor);
}

