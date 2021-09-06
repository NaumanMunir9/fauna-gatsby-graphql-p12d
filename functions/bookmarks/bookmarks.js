// libraries
const { ApolloServer, gql } = require("apollo-server-lambda");

const typeDefs = gql`
  type Query {
    bookmark: [Bookmark!]
  }
  type Bookmark {
    id: ID!
    url: String!
    desc: String!
  }
`;

const bookmarks = [
  {
    id: 1,
    url: "https://www.udemy.com/course/react-redux/",
    desc: "Master React and Redux with React Router, Webpack, and Create-React-App. Includes Hooks!",
  },
  {
    id: 2,
    url: "https://www.udemy.com/course/react-and-typescript-build-a-portfolio-project/",
    desc: "Expand your portfolio of projects by building a complex app with the latest web technologies.",
  },
  {
    id: 3,
    url: "https://www.udemy.com/course/graphql-with-react-course/",
    desc: "Learn and master GraphQL by building real web apps with React and Node",
  },
];

const resolvers = {
  Query: {
    bookmark: () => bookmarks,
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const handler = server.createHandler();

module.exports = { handler };
