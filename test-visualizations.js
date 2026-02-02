/**
 * Browser test for 4-Life visualizations
 * Captures console errors and reports issues
 */

const { chromium } = require('playwright');

const PAGES_TO_TEST = [
  // Core visitor journey pages
  { path: '/', name: 'Home' },
  { path: '/why-web4', name: 'Why Web4' },
  { path: '/first-contact', name: 'First Contact' },
  { path: '/glossary', name: 'Glossary' },
  { path: '/how-it-works', name: 'How It Works' },
  { path: '/learn', name: 'Learning Journey' },

  // Core concepts
  { path: '/atp-economics', name: 'ATP Economics' },
  { path: '/lct-explainer', name: 'LCT Explainer' },
  { path: '/trust-tensor', name: 'Trust Tensor' },
  { path: '/aliveness', name: 'Aliveness' },

  // Interactive labs
  { path: '/playground', name: 'Playground' },
  { path: '/lab-console', name: 'Lab Console' },
  { path: '/society-simulator', name: 'Society Simulator' },
  { path: '/research-hub', name: 'Research Hub' },

  // Explorers and visualizations
  { path: '/trust-networks', name: 'Trust Networks' },
  { path: '/decision-evolution', name: 'Decision Evolution' },
  { path: '/conversational-context', name: 'Conversational Context' },
  { path: '/scaffolding-lab', name: 'Scaffolding Lab' },
  { path: '/pattern-library', name: 'EP Pattern Library' },
  { path: '/moments', name: 'Emergent Moments' },
  { path: '/trust-timeline', name: 'Trust Timeline' },

  // ACT Chat
  { path: '/act-explorer', name: 'ACT Explorer' },
  { path: '/act-explorer?context=emergence%20moment', name: 'ACT Explorer with Context' },
];

async function testPages() {
  const browser = await chromium.launch({ headless: true });

  const results = [];

  for (const { path, name } of PAGES_TO_TEST) {
    // Create fresh context for each page to avoid cache issues
    const context = await browser.newContext();
    const page = await context.newPage();

    const errors = [];
    const warnings = [];
    const networkErrors = [];

    // Capture console messages
    page.on('console', msg => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      } else if (msg.type() === 'warning') {
        warnings.push(msg.text());
      }
    });

    // Capture page errors
    page.on('pageerror', err => {
      errors.push(`Page Error: ${err.message}`);
    });

    // Capture failed network requests
    page.on('requestfailed', request => {
      networkErrors.push(`${request.url()} - ${request.failure()?.errorText || 'unknown error'}`);
    });

    try {
      console.log(`\nTesting: ${name} (${path})`);

      await page.goto(`http://localhost:3000${path}`, {
        waitUntil: 'networkidle',
        timeout: 30000
      });

      // Wait a bit for any async operations
      await page.waitForTimeout(2000);

      // Check if page loaded content
      const content = await page.content();
      const hasContent = content.length > 1000;

      // Check for loading states still present (but not in button text etc)
      const stillLoading = await page.locator('.text-xl:has-text("Loading")').count();
      // Check for actual error states, not simulation content
      const hasFailed = await page.locator('text="Failed to load"').count();

      results.push({
        name,
        path,
        errors,
        warnings: warnings.slice(0, 3), // Limit warnings
        networkErrors,
        hasContent,
        stillLoading: stillLoading > 0,
        hasFailed: hasFailed > 0,
      });

    } catch (e) {
      results.push({
        name,
        path,
        errors: [`Navigation failed: ${e.message}`],
        warnings: [],
        networkErrors: [],
        hasContent: false,
        stillLoading: false,
        hasFailed: true,
      });
    }

    // Close context for next page
    await context.close();
  }

  await browser.close();

  // Print results
  console.log('\n' + '='.repeat(60));
  console.log('VISUALIZATION TEST RESULTS');
  console.log('='.repeat(60));

  let hasIssues = false;

  for (const result of results) {
    const issues = [];
    if (result.errors.length > 0) issues.push(`${result.errors.length} errors`);
    if (result.networkErrors.length > 0) issues.push(`${result.networkErrors.length} network failures`);
    if (result.stillLoading) issues.push('stuck loading');
    if (result.hasFailed) issues.push('shows failure message');

    const status = issues.length === 0 ? '✅' : '❌';
    console.log(`\n${status} ${result.name} (${result.path})`);

    if (result.errors.length > 0) {
      hasIssues = true;
      console.log('   Errors:');
      result.errors.slice(0, 5).forEach(e => console.log(`     - ${e.slice(0, 200)}`));
    }

    if (result.networkErrors.length > 0) {
      hasIssues = true;
      console.log('   Network Errors:');
      result.networkErrors.forEach(e => console.log(`     - ${e}`));
    }

    if (result.stillLoading) {
      hasIssues = true;
      console.log('   ⚠️  Page stuck in loading state');
    }

    if (result.hasFailed) {
      hasIssues = true;
      console.log('   ⚠️  Page shows failure message');
    }
  }

  console.log('\n' + '='.repeat(60));
  if (hasIssues) {
    console.log('Some pages have issues - see details above');
  } else {
    console.log('All pages loaded without errors!');
  }
  console.log('='.repeat(60));
}

testPages().catch(console.error);
