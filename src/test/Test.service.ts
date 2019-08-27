import * as fs from 'fs';
import * as fse from 'fs-extra';
import * as path from 'path';
import * as shell from 'shelljs';
import * as uuidv5 from 'uuid/v5';
import { Injectable } from '@nestjs/common';

const SITESPEED = /sitespeedio\/browsertime/gi;
const CONTEXT = fs.realpathSync(process.cwd());

@Injectable()
export default class TestService {
  private queue = [];

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

  flushQueue(): void {
    if (this.queue.length > 0) {
      const current = this.queue[0];
      if (!current.running) {
        current.running = true;
        current.run();
      }
    }
  }

  runTest(
    url,
  ): Promise<{ id: string; timestamp: number; browsertime: Object }> {
    return new Promise(async (resolve, reject) => {
      const run = () => {
        const id = uuidv5(url, uuidv5.URL);
        const timestamp = Date.now();
        // TODO 优化目录结构
        const output = `./target/test/${id}/${timestamp}`;
        fse.ensureDirSync(path.resolve(CONTEXT, output));
        shell.exec(
          `docker run -e TZ=Asia/Shanghai --shm-size=1g --network=3g --rm -v "$(pwd)":/browsertime sitespeedio/browsertime ${url} --resultDir ${output}`,
          {
            async: true,
            silent: true,
          },
          (code, stdout, stderr) => {
            const index = this.queue.indexOf(task);
            this.queue.splice(index, 1);
            this.flushQueue();
            if (code === 0) {
              const browsertime = fse.readJsonSync(
                path.resolve(output, 'browsertime.json'),
              );
              resolve({
                id,
                timestamp,
                browsertime,
              });
            } else {
              reject(new Error(stderr));
            }
          },
        );
      };
      const task = {
        running: false,
        run,
      };
      this.queue.push(task);
      this.flushQueue();
    });
  }
}
