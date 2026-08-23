import { ConvexHttpClient } from 'convex/browser';
import * as fs from 'fs';
import * as path from 'path';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '.env.local') });

const convexUrl = process.env.CONVEX_URL || 'https://flippant-sardine-31.eu-west-1.convex.cloud';
console.log(`Connecting to Convex: ${convexUrl}`);

const client = new ConvexHttpClient(convexUrl);

const stepsPath = path.resolve(
  __dirname,
  '../../apps/state-service/config/arg_steps_manifest.json'
);
const dictPath = path.resolve(
  __dirname,
  '../../../puzzle-apps/config/dictionaryData.json'
);
const redirectPath = path.resolve(
  __dirname,
  '../../../puzzle-apps/config/redirectUrlData.json'
);

const steps = JSON.parse(fs.readFileSync(stepsPath, 'utf-8'));
const dictionary = JSON.parse(fs.readFileSync(dictPath, 'utf-8'));
const redirectUrls = JSON.parse(fs.readFileSync(redirectPath, 'utf-8'));

console.log(`Loaded:
- ${steps.length} Steps
- ${dictionary.length} Dictionary entries
- ${redirectUrls.length} Redirect URL entries`);

async function run() {
  try {
    const result = await (client as any).mutation('seed:seedAll', {
      steps,
      dictionary,
      redirectUrls,
    });
    console.log('Seeding result:', JSON.stringify(result, null, 2));
  } catch (err) {
    console.error('Seeding failed:', err);
    process.exit(1);
  }
}

run();
