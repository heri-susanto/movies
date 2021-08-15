module.exports = {
  reactStrictMode: false,
    async rewrites() {
      return [
        {
          source: "/:slug*.html", // Old url with .html
          destination: "/:slug*", // Redirect without .html
        },
      ];
    },
};
