module.exports = {
  transform: {
    "^.+\\.tsx?$": "babel-jest",
  },
  preset: "ts-jest",
  testEnvironment: "node",
  transform: {
    "^.+\\.tsx?$": "babel-jest",
  },
  moduleNameMapper: {
    "\\.(css|less|scss)$": "identity-obj-proxy",
    axios: "axios/dist/node/axios.cjs",
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  transformIgnorePatterns: ["/node_modules/(?!axios)"],
};
