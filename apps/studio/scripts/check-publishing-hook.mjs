import { getCliClient } from "sanity/cli";

const client = getCliClient({ apiVersion: "2026-09-01" });
const hooks = await client.request({ url: `/hooks/projects/${client.config().projectId}` });
console.log(JSON.stringify(hooks.map((hook) => ({
  id: hook.id, name: hook.name, url: hook.url, disabled: hook.isDisabledByUser,
  filter: hook.rule?.filter, projection: hook.rule?.projection,
  authenticated: Boolean(hook.headers?.Authorization || hook.headers?.authorization),
})), null, 2));
