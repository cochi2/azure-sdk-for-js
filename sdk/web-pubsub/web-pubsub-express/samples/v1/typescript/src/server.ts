// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Demonstrates handling Web PubSub CloudEvents with Express
 */

import { WebPubSubEventHandler } from "@azure/web-pubsub-express";
import express from "express";

const handler = new WebPubSubEventHandler("chat", {
  handleConnect(req, res) {
    console.log(req);
    res.success();
    // or fail
    // res.fail(401);
  },
  onConnected(connectedRequest) {
    console.log(connectedRequest);
  },
  handleUserEvent(req, res) {
    console.log(req);
    res.success("Hello", "text");
  },
  allowedEndpoints: ["https://xxx.webpubsub.azure.com"]
});

const app = express();

app.use(handler.getMiddleware());

app.listen(3000, () =>
  console.log(`Azure WebPubSub Upstream ready at http://localhost:3000${handler.path}`)
);
