# Minebud warps demo

A small Minecraft Bedrock add-on (a `/demo:warps` menu) tested on a real Bedrock server on every pull request with [Minebud E2E](https://minebud.dev/docs/e2e) and the [`minebud/e2e-action`](https://github.com/minebud/e2e-action).

- `packs/BP` is the add-on.
- `e2e/warps.e2e.mjs` has the tests: a bot joins, opens the menu, picks a warp and checks where it lands.
- `.github/workflows/minebud-pr.yml` runs them on pull requests and fails the check on test failures, high-severity findings or a 20% performance regression.

Run locally:

```sh
npm install
npx minebud-e2e lint
MINEBUD_API_KEY=... npx minebud-e2e run
```

Set up your own repository: [minebud.dev/docs/ci](https://minebud.dev/docs/ci).
