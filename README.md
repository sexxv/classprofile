# Welcome to the SE25 Class Profile Repository!

## Appendix

### Where is the commit history?

The original SE25 Class Profile repository that the team worked on is privated for data privacy. Fun fact, the original repository has over 800 commits!

This repository contains a clean commit-free history.

### A Warning About Code Quality

> "code quality doesn't matter since we'll be done in two ~~weeks~~ months"

We went into this project knowing that we wanted to prioritize 1) it being a visually digestible representation of our data and 2) getting it out fast.

Release speed was motivated by two factors:

1. So that lower-year and prospective SE students could benefit from it sooner
2. Because everyone on the class profile team was starting full-time work in the next few months, and we didn't want this project to be stuck in limbo

Historically, past UW class profiles have usually released the year after graduation, and we managed to get our profile out within 3 months of our final exams.

As a consequence of this, if you are reading the code and are wondering "why did they do that", the answer is probably that it was the first thing that we did that worked. TypeScript is very upset with our repository. CSS styling is flying around wherever it pleases. Many values have been hardcoded in to match our exact data. There are places where we implemented something, then realized we needed a rewrite, so we used the code equivalent of zipties and duct tape to hold it all together. But it's done, and from the front-end (hopefully) everything looks acceptable.

So in conclusion, beware!

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load fonts.

## Building

This project is intended to be built for a static deployment on GitHub pages.

You shouldn't need to do this more than a few times, but the build process will be listed below anyways since there are
a few pitfalls to watch out for:

0. Checkout whatever branch GitHub pages is set to deploy from.
1. Run `npm run build`
2. Rename the output folder (probably `/out`) to `/docs` if deploying from `/docs`, or move the output folder contents to the root directory and delete everything else.
3. Add an empty `.nojekyll` file to either `/docs` or the root directory. If you skip this step, none of the contents in the `/_next` route will be served, which is to say pretty much every script, stylesheet, and image.
4. Add everything to a new commit, and push.

### Other Caveats

If you're adding images with a `<Image/>` component, make sure to prefix the `src` attribute with your repo name when building! For example, if the repo is named `se25-class-profile`, and you want to display `example.png` from the `/public` folder, you'll want to set `src="/se25-class-profile/example.png"`.

In this repo, just set the `BASE_PATH` const to the repo name _on the branch that you're deploying from_, and set it to an empty string during dev.
