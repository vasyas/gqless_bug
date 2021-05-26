import Fastify from "fastify";
import mercurius from "mercurius";
import {codegenMercurius, gql} from "mercurius-codegen";
import {inspectWriteGenerate} from "@gqless/cli";

async function main() {
  const app = Fastify({
    logger: true,
    pluginTimeout: 1000 * 60
  });

  const data = [
    {
      id: "1",
      name: "John"
    },
    {
      id: "2",
      name: "Paul"
    }
  ];

  app.register(mercurius, {
    path: "/api/graphql",
    schema: gql`
      type Query {
          usersList: [User!]!
      }  
      type Subscription {
          users: [User!]!
          groups: [User!]!
      }
      type User {
        id: ID!
        name: String!
      }
      type Group {
        id: ID!
        name: String!
      }
    `,
    resolvers: {
      Query: {},
      Subscription: {
        users: {
          subscribe(_root, _args, ctx) {
            setTimeout(() => {
              ctx.pubsub.publish({
                topic: "users",
                payload: {
                  users: data
                }
              });
            }, 10)

            return ctx.pubsub.subscribe("users");
          }
        },
        groups: {
          subscribe(_root, _args, ctx) {
            setTimeout(() => {
              ctx.pubsub.publish({
                topic: "groups",
                payload: {
                  groups: data
                }
              });
            }, 10)

            return ctx.pubsub.subscribe("groups");
          }
        }
      },
    },
    subscription: true
  });

  codegenMercurius(app, {
    targetPath: "./api/generated.ts"
  });


  app.listen(3000).then(() => {
    inspectWriteGenerate({
      cli: true,
      generateOptions: {
        react: true
      }
    });
  });
}

main();

process.on("uncaughtException", (err) => {
  console.error(err);
  process.exit(1);
});

process.on("unhandledRejection", (err) => {
  console.error(err);
  process.exit(1);
});
