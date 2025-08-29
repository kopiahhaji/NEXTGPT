import { spawn } from 'child_process';
import path from 'path';

async function runMockTests() {
  console.log('🚀 Running All Mock API Tests for Ustaz AI\n');
  console.log('=' .repeat(60));

  const tests = [
    { name: 'Supabase Database', file: 'test-supabase.js' },
    { name: 'DALL-E Image Generation', file: 'test-dalle-mock.js' },
    { name: 'Tavily Search API', file: 'test-tavily-mock.js' },
    { name: 'Wolfram Alpha API', file: 'test-wolfram-mock.js' }
  ];

  const results = [];

  for (const test of tests) {
    console.log(`\n🔬 Running ${test.name} Test...`);
    console.log('-'.repeat(40));

    try {
      const result = await runTest(test.file);
      results.push({ ...test, success: result.success, duration: result.duration });

      if (result.success) {
        console.log(`✅ ${test.name}: PASSED (${result.duration}ms)`);
      } else {
        console.log(`❌ ${test.name}: FAILED`);
        console.log(`   Error: ${result.error}`);
      }
    } catch (error) {
      results.push({ ...test, success: false, duration: 0, error: error.message });
      console.log(`❌ ${test.name}: ERROR - ${error.message}`);
    }
  }

  // Print summary
  console.log('\n' + '='.repeat(60));
  console.log('📊 TEST SUMMARY');
  console.log('='.repeat(60));

  const passed = results.filter(r => r.success).length;
  const total = results.length;
  const totalDuration = results.reduce((sum, r) => sum + r.duration, 0);

  results.forEach(result => {
    const status = result.success ? '✅ PASS' : '❌ FAIL';
    console.log(`${status} ${result.name.padEnd(25)} ${result.duration}ms`);
  });

  console.log('-'.repeat(60));
  console.log(`Total: ${passed}/${total} tests passed`);
  console.log(`Total time: ${totalDuration}ms`);
  console.log(`Average time: ${Math.round(totalDuration / total)}ms per test`);

  if (passed === total) {
    console.log('\n🎉 All mock tests passed! Your Ustaz AI is ready for development.');
  } else {
    console.log(`\n⚠️  ${total - passed} test(s) failed. Please check your configuration.`);
  }

  return passed === total;
}

function runTest(testFile) {
  return new Promise((resolve) => {
    const startTime = Date.now();
    const testPath = path.join(process.cwd(), testFile);

    const child = spawn('node', [testPath], {
      stdio: ['inherit', 'pipe', 'pipe'],
      cwd: process.cwd()
    });

    let output = '';
    let errorOutput = '';

    child.stdout.on('data', (data) => {
      output += data.toString();
      process.stdout.write(data);
    });

    child.stderr.on('data', (data) => {
      errorOutput += data.toString();
      process.stderr.write(data);
    });

    child.on('close', (code) => {
      const duration = Date.now() - startTime;
      const success = code === 0;

      resolve({
        success,
        duration,
        output,
        error: errorOutput || (code !== 0 ? `Exit code: ${code}` : null)
      });
    });

    child.on('error', (error) => {
      const duration = Date.now() - startTime;
      resolve({
        success: false,
        duration,
        error: error.message
      });
    });
  });
}

runMockTests().catch(console.error);
