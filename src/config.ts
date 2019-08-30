import * as fs from 'fs';
import * as path from 'path';
import * as dotenv from 'dotenv';

dotenv.config();

export const CONTEXT = fs.realpathSync(process.cwd());

export const OUTPUT_PATH = path.resolve(CONTEXT, process.env.OUTPUT_PATH || './output');
