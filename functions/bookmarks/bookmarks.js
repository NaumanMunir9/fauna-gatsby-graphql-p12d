// libraries
const { ApolloServer, gql } = require("apollo-server-lambda");
const faunadb = require("faunadb"),
  q = faunadb.query;
require("dotenv").config();

const typeDefs = gql`
  type Query {
    bookmark: [Bookmark!]
  }
  type Bookmark {
    id: ID!
    url: String!
    desc: String!
  }
  type Mutation {
    addBookmark(url: String!, desc: String!): Bookmark
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
    bookmark: async (root, args, context) => {
      try {
        const client = new faunadb.Client({
          secret: process.env.FAUNADB_SECRET_API_KEY,
        });
        const result = await client.query(
          q.Map(
            q.Paginate(q.Match(q.Index("url"))),
            q.Lambda((x) => q.Get(x))
          )
        );
        return result.data.map((d) => {
          return {
            id: d.ts,
            url: d.data.url,
            desc: d.data.desc,
          };
        });
      } catch (error) {
        console.error(`Error: ${error}`);
      }
    },
  },
  Mutation: {
    addBookmark: async (root, { url, desc }, context) => {
      const client = new faunadb.Client({
        secret: process.env.FAUNADB_SECRET_API_KEY,
      });
      try {
        const result = await client.query(
          q.Create(q.Collection("links"), {
            data: {
              url,
              desc,
            },
          })
        );
        console.log(
          `Document Created and Inserted in Container ${result.ref.id}`
        );
        return result.ref.data;
      } catch (error) {
        console.error(`Error: ${error}`);
      }
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const handler = server.createHandler();

module.exports = { handler };
