import { createMeshConfig } from "@baditaflorin/mesh-common";

export const config = createMeshConfig({
  appName: "mesh-sticky-board",
  description: "A shared spatial sticky-note board for quick group thinking.",
  accentHex: "#d97706",
  version: __APP_VERSION__,
  commit: __GIT_COMMIT__,
});
