# CouplePlayHub Launch Checklist

Target: Monday morning SAST

## Before deploying

Run locally from the repository root:

```bash
npm install
npm run lint
npm run build
npm run start
```

The repository currently does not include a runnable automated test script in `package.json`; do not treat the existing `*.test.ts` files as CI-verified until a test runner is wired into the project.

## Manual smoke test

Open each route and complete at least one round:

- `/games/sexy-dice` — roll completes, result appears, progress increments
- `/games/truth-or-dare` — Truth and Dare both draw, skip/reset works, progress increments
- `/games/spin-the-bottle` — names edit, spin completes, repeated immediate result is avoided
- `/games/sex-roulette-wheel` — wheel lands on a displayed option, progress increments
- `/games/kama-sutra-cards` — card draw completes, repeated immediate card is avoided
- `/games/party-games` — each mode produces prompts, progress increments
- `/games/super-sex-dice` — both results roll, repeated immediate values are avoided
- `/games/sexy-timer` — 30-second timer completes, progress increments

## Persistence check

For at least two games:

1. Play a round.
2. Refresh the page.
3. Confirm the local round count remains.
4. Use **Clear progress**.
5. Confirm the count returns to zero.

## Mobile check

Test at approximately 375px wide:

- no horizontal scrolling
- primary controls remain reachable
- text does not overlap
- game result remains readable
- inputs remain usable

## Privacy sanity check

Use browser devtools:

- confirm game progress is stored under the game's local-storage key
- confirm no account/login is required for local play
- do not advertise stronger privacy guarantees than the implementation provides

## Deployment

Netlify should build the Next.js app with:

```
Build command: npm run build
Publish directory: .next
```

If the existing Netlify integration already detects Next.js automatically, prefer its detected configuration over forcing a conflicting publish setting.

## Definition of done

- [ ] lint passes
- [ ] production build passes
- [ ] all eight game routes smoke-tested
- [ ] local persistence verified
- [ ] mobile pass completed
- [ ] production URL opened successfully
- [ ] no fake metrics, memberships, sync, or privacy guarantees remain on the launch surface
