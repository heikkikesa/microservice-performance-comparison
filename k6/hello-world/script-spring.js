import http from "k6/http";
import { sleep } from "k6";

export let options = {
  vus: 10,
  duration: "10s",
};

export default function () {
  let res = http.get("http://localhost:4000");
  check(res, {
    "is status 200": (r) => r.status === 200,
  });
  sleep(1);
}

export function handleSummary(data) {
  console.log("Preparing the end-of-test summary...");

  return {
    "spring/k6-summary.json": JSON.stringify(data),
  };
}
