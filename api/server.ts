import Fastify from "fastify";
import mercurius from "mercurius";
import { codegenMercurius, gql } from "mercurius-codegen";
import { inspectWriteGenerate } from "@gqless/cli";
import waitOn from "wait-on";
import { User } from "./generated";

async function main() {
  const app = Fastify({
    logger: true,
    pluginTimeout: 1000 * 60
  });

  const users: User[] = [
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
          usersList: [User!]!
      }
      type User {
        id: ID!
        name: String!
      }
    `,
    resolvers: {
      Query: {},
      Subscription: {
        usersList: {
          subscribe(_root, _args, ctx) {
            setTimeout(() => {
              ctx.pubsub.publish({
                topic: "usersList",
                payload: {
                  usersList: users
                }
              });
            }, 0)

            return ctx.pubsub.subscribe("usersList");
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
