/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/gatsby-config/
 */

module.exports = {
  /* Your site config here */
  plugins: [
    {
      resolve: "gatsby-plugin-apollo",
      options: {
        uri: "https://mnm-p12d.netlify.app/.netlify/functions/bookmarks",
      },
    },
    `gatsby-plugin-material-ui`,
  ],
};
