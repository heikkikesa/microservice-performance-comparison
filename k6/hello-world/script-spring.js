import http from "k6/http";
import { check, sleep } from "k6";

/*
export let options = {
  vus: 10,
  iterations: 100,
};
const sleepTime = 1;
*/

export let options = {
  vus: 100,
  iterations: 10000,
};
const sleepTime = 0.5;

export default function () {
  let res = http.get("http://localhost:4000");
  check(res, {
    "is status 200": (r) => r.status === 200,
  });
  sleep(sleepTime);
}

export function handleSummary(data) {
  console.log("Preparing the end-of-test summary...");

  return {
    "spring/k6-summary.json": JSON.stringify(data),
  };
}
