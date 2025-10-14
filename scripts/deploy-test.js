#!/usr/bin/env node

/**
 * Simple script to test deployment by updating a timestamp
 * This will trigger automatic deployment when pushed to GitHub
 */

const fs = require('fs');
const path = require('path');

// Update the package.json version to trigger deployment
const packagePath = path.join(__dirname, '..', 'package.json');
const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'));

// Increment patch version
const versionParts = packageJson.version.split('.');
versionParts[2] = (parseInt(versionParts[2]) + 1).toString();
packageJson.version = versionParts.join('.');

fs.writeFileSync(packagePath, JSON.stringify(packageJson, null, 2));

console.log(`✅ Updated version to ${packageJson.version}`);
console.log('🚀 Ready to commit and push to trigger deployment!');
console.log('\nNext steps:');
console.log('1. git add .');
console.log('2. git commit -m "🚀 Trigger deployment - version ${packageJson.version}"');
console.log('3. git push origin main');
