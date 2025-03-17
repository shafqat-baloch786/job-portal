import DataUriParser from "datauri/parser.js"
// const DataUriParser = require('datauri');
// const path = require('path');
import path from "path";

const getDataUri = (file) => {
    const parser = new DataUriParser();
    const extName = path.extname(file.originalname).toString();
    return parser.format(extName, file.buffer);
}

export default getDataUri;
// module.exports = getDataUri;