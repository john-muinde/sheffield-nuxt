import { Server as Server$1 } from 'node:http';
import { Server } from 'node:https';
import { t as toNodeListener, i as destr, u as useRuntimeConfig, j as trapUnhandledNodeErrors, s as setupGracefulShutdown, h as useNitroApp } from '../_/nitro.mjs';
import 'file:///C:/Users/john.muinde/Documents/sheffield-application/node_modules/.pnpm/@nuxt+vite-builder@3.14.1592_@types+node@22.10.1_magicast@0.3.5_rollup@4.28.0_sass-embedded@1_xff552qpnkbia6fpn2v4yoma5e/node_modules/@nuxt/vite-builder/dist/runtime/client.manifest.mjs';
import 'file:///C:/Users/john.muinde/Documents/sheffield-application/node_modules/.pnpm/@nuxt+vite-builder@3.14.1592_@types+node@22.10.1_magicast@0.3.5_rollup@4.28.0_sass-embedded@1_xff552qpnkbia6fpn2v4yoma5e/node_modules/@nuxt/vite-builder/dist/runtime/vite-node.mjs';

const cert = process.env.NITRO_SSL_CERT;
const key = process.env.NITRO_SSL_KEY;
const nitroApp = useNitroApp();
const server$1 = cert && key ? new Server({ key, cert }, toNodeListener(nitroApp.h3App)) : new Server$1(toNodeListener(nitroApp.h3App));
const port = destr(process.env.NITRO_PORT || process.env.PORT) || 3e3;
const host = process.env.NITRO_HOST || process.env.HOST;
const path = process.env.NITRO_UNIX_SOCKET;
const listener = server$1.listen(path ? { path } : { port, host }, (err) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  const protocol = cert && key ? "https" : "http";
  const addressInfo = listener.address();
  if (typeof addressInfo === "string") {
    console.log(`Listening on unix socket ${addressInfo}`);
    return;
  }
  const baseURL = (useRuntimeConfig().app.baseURL || "").replace(/\/$/, "");
  const url = `${protocol}://${addressInfo.family === "IPv6" ? `[${addressInfo.address}]` : addressInfo.address}:${addressInfo.port}${baseURL}`;
  console.log(`Listening on ${url}`);
});
trapUnhandledNodeErrors();
setupGracefulShutdown(listener, nitroApp);
const nodeServer = {};

const client_manifest = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: default
});

const server = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: default
});

export { client_manifest as c, nodeServer as n, server as s };
//# sourceMappingURL=server.mjs.map
