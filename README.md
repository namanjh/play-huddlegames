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

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
# play-huddlegames

# HuddleGames — Frontend & Game Engine

**play-huddlegames** is the core frontend and gameplay application for [HuddleGames](https://huddlegames.com), a multiplayer platform designed for fun, fast-paced team games ideal for workplace bonding and team building.

This app is built using **Next.js** and handles:
- Game discovery and homepage
- Player and room management
- Game play interfaces
- Game instructions and UX flows
- Connection to a backend Socket.IO server for real-time sync

---

## 🚀 Project Vision

We aim to create a growing library of simple, engaging games that colleagues can play together — online or offline — during huddles, offsites, or meetings. The focus is on fun, collaboration, deduction, and creativity.

---

## 🎮 Game Lineup

| Game | Type | Mode | Tags |
|------|------|------|------|
| **Find My Password** | Team | Online/Offline | Word, Bonding, 4–20 players |
| **Does Everyone Think the Same?** | Individual | Online | Word, Bonding, 3–20 players |
| **The Price is Right** | Individual | Online | Quiz, Funny, 2–100 players |
| **1-Stroke Pictionary** | Team | Online/Offline | Drawing, Creative, 4–20 players |
| **Who's the Impostor** | Individual | Online | Deduction, Thrilling, 3–10 players |
| **Unpopular Opinion** | Team | Online | Voting, Funny, 3–10 players |
| **Lie Lie Until You Die** | Team | Online/Offline | Bluffing, Quiz, Deduction, 4–20 players |
| **Complete the Movie Dialogue** | Individual | Online | Voting, Funny, 1+ players |
| **Wheel of Fortune** | Team | Online | Word, Puzzle, 4–20 players |
| **Liar's Bar** | Individual | Online/Offline | Bluffing, Deduction, 3–10 players |
| **Game of Lies** | Team | Online/Offline | Bluffing, Deduction, Quiz, 4–20 players |
| **Categories** | Team | Online | Word, Party, 2–10 players |
| **Reverse Semantle** | Individual | Online | Word, Deduction, 1–100 players |

---

---

## 📦 Tech Stack

- **Next.js 14**
- **Tailwind CSS**
- **Socket.IO Client**
- **TypeScript**
- **Supabase (planned)**

---

## ⏭ Planned Features

- Authentication with magic link
- Admin-only start button
- Game-specific scoreboards and timers
