import * as fs from 'fs';
import * as fse from 'fs-extra';
import * as path from 'path';
import * as shell from 'shelljs';
import * as uuidv4 from 'uuid/v4';
import { Injectable } from '@nestjs/common';

const SITESPEED = /sitespeedio\/browsertime/gi;
const CONTEXT = fs.realpathSync(process.cwd());

const getOutput = id => `./target/test/${id}`;
const getOutputPath = id => path.resolve(CONTEXT, getOutput(id));
const getInfoPath = id => path.resolve(CONTEXT, getOutput(id), 'info.json');
const getBrowsertimePath = id =>
  path.resolve(CONTEXT, getOutput(id), 'browsertime.json');
const getHARPath = id =>
  path.resolve(CONTEXT, getOutput(id), 'browsertime.har');

@Injectable()
export default class TestService {
  private queue = [];
  private running: string = null;

  getTestingCount(): Promise<number> {
    return new Promise((resolve, reject) => {
      shell.exec(
        'docker container ls',
        {
          async: true,
          silent: true,
        },
        (code, stdout, stderr) => {
          if (code === 0) {
            const match = stdout.match(SITESPEED);
            resolve(match ? match.length : 0);
          } else {
            reject(new Error(stderr));
          }
        },
      );
    });
  }

  getPendingCount(): number {
    return this.queue.length;
  }

  getPendingCountById(id): number {
    return this.queue.indexOf(id);
  }

  async flushQueue() {
    if (this.queue.length > 0 && !this.running) {
      const id = this.queue[0];
      this.running = id;
      let info = null;
      try {
        info = await fse.readJson(getInfoPath(id));
      } catch (error) {}
      if (info && info.url) {
        const output = getOutput(id);
        const { url } = info;
        shell.exec(
          `docker run -e TZ=Asia/Shanghai --shm-size=1g --network=3g --rm -v "$(pwd)":/browsertime sitespeedio/browsertime ${url} --resultDir ${output}`,
          {
            async: true,
            silent: true,
          },
          (code, stdout, stderr) => {
            this.running = null;
            if (code === 0) {
              this.queue.splice(0, 1);
              this.flushQueue();
            } else {
              // TODO 存储错误信息
              setTimeout(() => {
                this.flushQueue();
              }, 3000);
            }
          },
        );
      } else {
        this.running = null;
        this.queue.splice(0, 1);
      }
    }
  }

  async analysis(url): Promise<string> {
    const id = uuidv4();
    // TODO 优化输出目录（通过环境变量配置到项目外）
    await fse.ensureDir(getOutputPath(id));
    await fse.writeJson(getInfoPath(id), {
      url,
      timestamp: Date.now(),
      browser: 'iPhone 6',
      network: '3G',
      localtion: '厦门',
    });
    try {
      this.queue.push(id);
      this.flushQueue();
    } catch (error) {
      // ignore
    }
    return id;
  }

  async getResult(
    id: string,
  ): Promise<{
    stage: number; // -1|未知;0|成功;1|测试;>2|排队中
    info?: object;
    browsertime?: object;
    har?: object;
  }> {
    let info = null;
    try {
      info = await fse.readJson(getInfoPath(id));
    } catch (error) {}
    if (info) {
      try {
        const info = await fse.readJson(getInfoPath(id));
        const browsertimePath = getBrowsertimePath(id);
        const isEnd = await fse.pathExists(browsertimePath);
        if (isEnd) {
          const browsertime = await fse.readJson(browsertimePath);
          const har = await fse.readJson(getHARPath(id));
          return {
            stage: 0,
            info,
            browsertime,
            har,
          };
        } else {
          const count = this.getPendingCountById(id);
          if (count >= 0) {
            return {
              stage: count + 1,
            };
          }
        }
      } catch (error) {
        // TODO
      }
    }
    return {
      stage: -1,
    };
  }
}
