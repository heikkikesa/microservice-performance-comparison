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
  // Token expires by 8.3.2025
  /* 
    Generate new one in this format:
    {
        "iss": "Microservice Framework Performance Comparison",
        "iat": 1614952910,
        "exp": 1741425801,
        "aud": "www.example.com",
        "sub": "dummy@user.foo",
        "username": "admin"
    }
    With key MicroserviceFrameworkComparisonKey
  */
  const params = {
    headers: {
      Authorization:
        "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJNaWNyb3NlcnZpY2UgRnJhbWV3b3JrIFBlcmZvcm1hbmNlIENvbXBhcmlzb24iLCJpYXQiOjE2MTQ5NTI5MTAsImV4cCI6MTc0MTQyNTgwMSwiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoiZHVtbXlAdXNlci5mb28iLCJ1c2VybmFtZSI6ImFkbWluIn0.tPWhOenwzj5GkKg0PdFIj4HtXfVirwei8YUl5XThbFA",
    },
  };
  let res = http.get(
    "http://localhost:4000/universities?country=Finland",
    params
  );
  check(res, {
    "is status 200": (r) => r.status === 200,
  });
  sleep(sleepTime);
}

export function handleSummary(data) {
  console.log("Preparing the end-of-test summary...");

  return {
    "nestjs/k6-summary.json": JSON.stringify(data),
  };
}
