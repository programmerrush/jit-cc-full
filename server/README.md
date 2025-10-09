# Server (Express proxy to Judge0 via RapidAPI)

## Setup
1. `cp .env.example .env` and fill `JUDGE0_HOST` + `JUDGE0_API_KEY`.
2. `npm i`
3. `npm run dev` (or `npm start`)

## Endpoint
POST `/api/execute`
Body: `{ "language_id": 63, "source_code": "print('hi')", "stdin": "" }`
Returns Judge0 result with decoded stdout/stderr/compile_output and `timeMs`.
