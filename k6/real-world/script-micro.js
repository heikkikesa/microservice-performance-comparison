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
  const params = {
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0eXBlIjoidXNlciIsInNjb3BlcyI6WyJhZG1pbiJdLCJtZXRhZGF0YSI6e30sIm5hbWUiOiJhZG1pbiIsImV4cCI6MTc0MTQyNDc3NSwiaXNzIjoibWljcm8iLCJzdWIiOiJhZG1pbiJ9.Zh1MFuA-t7BOPwoYdO78lC10pZ3JExYtjmZaLvC3odm65y45Y5V6OckS4vualwOTwehhuMdvy5YRliivm_nYYtwIraDzd2nhrNT1yK1Wt43bYrInD9HzX62hZGff1KDZI6VnewkbpSE1yVe1PWWV52l0729mMM5rdoWsAKQLX5JEwgS9qSvYqCcRNMXLF9h-LnoGE9698iT_xOqdKI-93eo7ztt9D0bfuTEtAcrpaWx8Bpb6RTzTl3zzG2zvwhAzKU9lwM7dlK-DrJ4j3WI8mgDyvpbAuSFBXXw0zrwtoAId_q983oYgHTS_sDl9DpRk1P7yFMy5WT4WxpMuQRSjyx_IKdL0xbR3KT44vAEqQv9wMzbw_YEKqIpVqlxGJWZDiFfuwx5vw9dJ3j-63y0WpGTGtegr_d4H5smnI2WZAgbDwJqk40ppmPRiZQspqiVYM7PBrR2pY4V8e831cmzGdrrO1hbKK0diMv2dv4f9BoAvumKmWKokgZDLZquET1-d-_AXe8GK545SyMEF2lj79DkAqjcZhkhySWZHoCRgapOZ3q_po60cumSfSBz9Mg5hHUgLgzkMWqAsP5AjGVH-gkvmB5nUugMh9gUBQ7iHXwJQUNGd_jTJIljEvvvX5xsC-D9jwrkEIXfY1A9VkWSkaKGA_B-POtQ1ADorOSHnv7A",
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
    "micro/k6-summary.json": JSON.stringify(data),
  };
}
