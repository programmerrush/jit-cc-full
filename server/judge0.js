import axios from "axios";
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

export function createJudge0Client({ host, apiKey }) {
  const baseURL = `https://${host}`;
  const headers = {
    "x-rapidapi-key": apiKey,
    "x-rapidapi-host": host,
    "Content-Type": "application/json",
  };

  const b64 = (s) => Buffer.from(s || "", "utf8").toString("base64");
  const ub64 = (s) => (s ? Buffer.from(s, "base64").toString("utf8") : "");

  async function execute({ language_id, source_code, stdin = "" }) {
    // Create submission (no wait)
    const submit = await axios({
      method: "POST",
      url: `${baseURL}/submissions`,
      headers,
      params: { base64_encoded: true, wait: false, fields: "*" },
      data: { language_id, source_code: b64(source_code), stdin: b64(stdin) },
    });

    const token = submit?.data?.token;
    if (!token) throw new Error("Judge0 submission failed (missing token)");

    // Poll until completed
    const start = Date.now();
    while (true) {
      const poll = await axios({
        method: "GET",
        url: `${baseURL}/submissions/${token}`,
        headers,
        params: { base64_encoded: true, fields: "*" },
      });
      const statusId = poll?.data?.status?.id || 0; // 1 queued, 2 processing, >=3 done
      if (statusId >= 3) {
        return {
          ...poll.data,
          stdout: ub64(poll.data?.stdout),
          stderr: ub64(poll.data?.stderr),
          compile_output: ub64(poll.data?.compile_output),
          message: ub64(poll.data?.message),
          timeMs: Date.now() - start,
        };
      }
      if (Date.now() - start > 40000)
        throw new Error("Judge0 polling timed out");
      await sleep(1200);
    }
  }

  return { execute };
}
