# CivicPulse – The Informed Citizen's Journey

CivicPulse is a production-grade web application designed as a Digital Voting Assistant to guide Indian citizens from zero political knowledge to becoming informed voters.

## Demo
<!-- DEMO: replace this comment with a screen recording GIF after running the app -->

## Tech Stack
| Frontend | Backend | Database | Tooling |
|---|---|---|---|
| React 18.2 | Node.js / Express | MongoDB / Mongoose | TypeScript |
| Vite 5.2 | Express Validator | | Vitest / Playwright |
| Tailwind CSS | Helmet / Cors | | Docker / Compose |
| Zustand / Framer Motion | | | ESLint / Prettier |

## Quick Start

### Option A — Docker (Recommended)
1. Copy environment example:
   ```bash
   cp .env.example .env
   ```
2. Start the services:
   ```bash
   docker-compose -f docker/docker-compose.yml up --build
   ```
3. Seed data (in a new terminal):
   ```bash
   docker-compose exec server node dist/data/seed.js
   ```
4. Open [http://localhost](http://localhost) — app is live.

### Option B — Local Development
1. Copy environment example:
   ```bash
   cp .env.example .env
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Seed local MongoDB:
   ```bash
   npm run seed
   ```
4. Start dev servers:
   ```bash
   npm run dev
   ```
   - Client: [http://localhost:5173](http://localhost:5173)
   - Server: [http://localhost:5000](http://localhost:5000)

## Scripts
- `npm run dev`: Start both client and server in dev mode.
- `npm run build`: Build both client and server for production.
- `npm test`: Run all unit and integration tests.
- `npm run coverage`: Generate test coverage reports.
- `npm run lint`: Run linting checks across the workspace.
- `npm run typecheck`: Run TypeScript type checks.
- `npm run seed`: Seed the MongoDB database with mock data.

## API Reference
| Method | Path | Body/Query | Response | Auth |
|---|---|---|---|---|
| GET | `/api/v1/candidates` | state, constituency | `Candidate[]` | None |
| GET | `/api/v1/constituencies` | state | `string[]` | None |
| POST | `/api/v1/match` | state, constituency, priorities | `CandidateWithScore[]` | None |
| POST | `/api/v1/ai/explain` | topic | `ExplainResponse` | None |
| POST | `/api/v1/ai/verify` | claim | `VerifyResponse` | None |
| POST | `/api/v1/ai/chat` | message, history | `ChatResponse` | None |

## How to enable real AI
Replace the mock functions in `/server/src/services/aiService.ts` with real API calls using a library like `openai`. Add `AI_API_KEY=your_key` to `.env` and `.env.example`.

## Testing
- Unit & Integration: `npm test`
- E2E: `npm run test:e2e` (requires Playwright)

## License
MIT