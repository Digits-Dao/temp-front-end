# Digits DAO: Front End

## 🚀 Project Structure

Digits DAO Frontend is based on Astro, a Static Site Generator with Partial Hydration.

#### Landing Page

The landing page is a fully static implementation, meaning the first page load is as fast as possible for a website.

#### App Page

The App Page is an "Astro Island" (or Partial Hydration) page, using `SolidJS` and `WAGMI Core` for all of the ETH logic. The wallet used is `web3modal`.

This was the best all around approach due to the fine-grained reactivity that `SolidJS` offers.

All commands are run from the root of the project, from a terminal:

| Command                | Action                                           |
| :--------------------- | :----------------------------------------------- |
| `npm install`          | Installs dependencies                            |
| `npm run dev`          | Starts local dev server at `localhost:3000`      |
| `npm run build`        | Build your production site to `./dist/`          |
| `npm run preview`      | Preview your build locally, before deploying     |
| `npm run format`       | Run Prettier to format all files                 |
| `npm run format:check` | Run Prettier to check the format of all files    |
| `npm run lint`         | Run ESLint with the config in `.eslintrc.json`   |
| `npm run astro ...`    | Run CLI commands like `astro add`, `astro check` |
| `npm run astro --help` | Get help using the Astro CLI                     |
