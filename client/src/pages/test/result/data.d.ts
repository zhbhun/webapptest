export interface TestInfo {
  url: string;
  timestamp: string;
  browser: string;
  network: string;
  localtion: string;
}

export interface Browsertime {
  info: {
    browsertime: {
      version: string;
    };
    url: string;
    timestamp: string;
    connectivity: {
      engine: string;
      profile: string;
    };
  };
  files: {
    video: string[];
    screenshot: string[];
    timeline: string[];
    consoleLog: string[];
    netLog: string[];
    perfLog: string[];
  };
  cdp: {
    performance: object[];
  };
  timestamps: string[];
  browserScripts: object[];
  visualMetrics: object[];
  cpu: object[];
  fullyLoaded: number[];
  statistics: object;
}

export interface ResultData {
  stage: number; // -1|未知;0|成功;1|测试;>2|排队中
  info?: TestInfo;
  browsertime?: Browsertime[];
  har?: object,
}

export interface ResultResponse {
  code: number;
  data: ResultData;
  message: string;
}
