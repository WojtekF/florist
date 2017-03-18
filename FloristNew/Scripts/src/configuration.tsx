// A '.tsx' file enables JSX support in the TypeScript compiler,
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX

const url = process.env.NODE_ENV == "test" ? "http://www.kokokokokokokoko.com:80" : "";

export default { url };
