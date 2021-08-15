module.exports = {
  reactStrictMode: false,
    async rewrites() {
      return [
        {
          source: "/*.html", // Old url with .html
          destination: "/*", // Redirect without .html
        },
      ];
    },
};
