const fs = require("fs");
const fsPromises = require("fs/promises");
const path = require("path");
const mime = require("mime");

const makeDirectory = async (pathname) => {
	try {
		if (fs.existsSync(pathname)) return;
		await fsPromises.mkdir(pathname);
	} catch (e) {
		throw new Error(e);
	}
};

const showDirectory = async (pathname) => {
	try {
		const files = await fsPromises.readdir(pathname);
		return files;
	} catch (e) {
		throw new Error(e);
	}
};

const getFileDetails = async (pathname) => {
	const name = path.basename(pathname);
	const extension = path.extname(pathname);
	const directory = path.dirname(pathname);
	const isDirectory = !extension;
	const mimeType = !isDirectory ? mime.getType(name) : "";
	const fileType = mimeType.split("/")[0];

	return { name, extension, directory, isDirectory, mimeType, fileType };
};

module.exports = { makeDirectory, showDirectory, getFileDetails };
