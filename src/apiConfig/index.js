import runTime from "./runTime";

function getRuntime() {
  const currentHost = window.location.host;
  const obj = {};
  if (
    /^box\d*-mng-h5/.test(currentHost) ||
    currentHost.indexOf("localhost") !== -1
  ) {
    obj.env = "dev";
    obj.prefix = currentHost.substring(0, currentHost.indexOf("-mng-h5"));
  } else if (/^test\d*-mng-h5/.test(currentHost)) {
    obj.env = "test";
    obj.prefix = currentHost.substring(0, currentHost.indexOf("-mng-h5"));
  } else {
    obj.env = "prod";
    obj.prefix = "";
  }
  return obj;
}

const runTimeObj = getRuntime();
const runTimeCode = runTimeObj.env;
const IS_PROD = runTimeCode === "prod";

let HOST = runTime[runTimeObj.env](runTimeObj.prefix);

if (window.location.host.indexOf("localhost") !== -1) {
  HOST = runTime[runTimeObj.env]();
}

export { HOST, IS_PROD, runTimeObj };
