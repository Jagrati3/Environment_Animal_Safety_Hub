const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

class LinkChecker {
    constructor() {
        this.results = [];
        this.checkedUrls = new Set();
    }

    // Extract links from HTML files
    extractLinksFromFile(filePath) {
        try {
            const content = fs.readFileSync(filePath, 'utf8');
            const linkRegex = /(?:href|src)=["'](https?:\/\/[^"']+)["']/gi;
            const links = [];
            let match;

            while ((match = linkRegex.exec(content)) !== null) {
                links.push(match[1]);
            }

            return [...new Set(links)]; // Remove duplicates
        } catch (error) {
            console.error(`Error reading file ${filePath}:`, error.message);
            return [];
        }
    }

    // Check if URL is accessible
    async checkUrl(url) {
        if (this.checkedUrls.has(url)) {
            return this.results.find(r => r.url === url);
        }

        return new Promise((resolve) => {
            const urlObj = new URL(url);
            const client = urlObj.protocol === 'https:' ? https : http;
            
            const timeout = 5000; // 5 seconds timeout
            
            const req = client.get(url, { timeout }, (res) => {
                const result = {
                    url,
                    status: res.statusCode,
                    working: res.statusCode >= 200 && res.statusCode < 400,
                    responseTime: Date.now() - startTime
                };
                
                this.checkedUrls.add(url);
                this.results.push(result);
                resolve(result);
            });

            const startTime = Date.now();

            req.on('error', (error) => {
                const result = {
                    url,
                    status: 0,
                    working: false,
                    error: error.message,
                    responseTime: Date.now() - startTime
                };
                
                this.checkedUrls.add(url);
                this.results.push(result);
                resolve(result);
            });

            req.on('timeout', () => {
                req.destroy();
                const result = {
                    url,
                    status: 0,
                    working: false,
                    error: 'Timeout',
                    responseTime: timeout
                };
                
                this.checkedUrls.add(url);
                this.results.push(result);
                resolve(result);
            });
        });
    }

    // Scan directory for HTML files
    scanDirectory(dirPath) {
        const htmlFiles = [];
        
        function scanRecursive(currentPath) {
            try {
                const items = fs.readdirSync(currentPath);
                
                for (const item of items) {
                    const fullPath = path.join(currentPath, item);
                    const stat = fs.statSync(fullPath);
                    
                    if (stat.isDirectory() && !item.startsWith('.') && item !== 'node_modules') {
                        scanRecursive(fullPath);
                    } else if (stat.isFile() && item.endsWith('.html')) {
                        htmlFiles.push(fullPath);
                    }
                }
            } catch (error) {
                console.error(`Error scanning directory ${currentPath}:`, error.message);
            }
        }
        
        scanRecursive(dirPath);
        return htmlFiles;
    }

    // Main function to check all links in project
    async checkProjectLinks(projectPath) {
        console.log(`🔍 Scanning project: ${projectPath}`);
        
        const htmlFiles = this.scanDirectory(projectPath);
        console.log(`📄 Found ${htmlFiles.length} HTML files`);
        
        const allLinks = [];
        const fileResults = [];

        // Extract links from all HTML files
        for (const file of htmlFiles) {
            const links = this.extractLinksFromFile(file);
            const relativePath = path.relative(projectPath, file);
            
            fileResults.push({
                file: relativePath,
                linkCount: links.length,
                links: links
            });
            
            allLinks.push(...links);
        }

        const uniqueLinks = [...new Set(allLinks)];
        console.log(`🔗 Found ${uniqueLinks.length} unique external links`);

        // Check all unique links
        const linkResults = [];
        for (let i = 0; i < uniqueLinks.length; i++) {
            const url = uniqueLinks[i];
            console.log(`⏳ Checking ${i + 1}/${uniqueLinks.length}: ${url}`);
            
            const result = await this.checkUrl(url);
            linkResults.push(result);
            
            // Add small delay to avoid overwhelming servers
            await new Promise(resolve => setTimeout(resolve, 100));
        }

        return {
            summary: {
                totalFiles: htmlFiles.length,
                totalLinks: uniqueLinks.length,
                workingLinks: linkResults.filter(r => r.working).length,
                brokenLinks: linkResults.filter(r => !r.working).length,
                scanTime: new Date().toISOString()
            },
            files: fileResults,
            links: linkResults
        };
    }

    // Generate report
    generateReport(results) {
        const { summary, files, links } = results;
        
        let report = `
# Link Check Report
Generated: ${summary.scanTime}

## Summary
- 📄 Files scanned: ${summary.totalFiles}
- 🔗 Total links: ${summary.totalLinks}
- ✅ Working links: ${summary.workingLinks}
- ❌ Broken links: ${summary.brokenLinks}
- 📊 Success rate: ${((summary.workingLinks / summary.totalLinks) * 100).toFixed(1)}%

## Broken Links
`;

        const brokenLinks = links.filter(l => !l.working);
        if (brokenLinks.length === 0) {
            report += "🎉 No broken links found!\n\n";
        } else {
            brokenLinks.forEach(link => {
                report += `- ❌ ${link.url}\n`;
                report += `  Status: ${link.status || 'Error'}\n`;
                if (link.error) {
                    report += `  Error: ${link.error}\n`;
                }
                report += `\n`;
            });
        }

        report += `## Files with Links\n`;
        files.forEach(file => {
            if (file.linkCount > 0) {
                report += `- 📄 ${file.file} (${file.linkCount} links)\n`;
            }
        });

        return report;
    }

    // Save report to file
    saveReport(results, outputPath) {
        const report = this.generateReport(results);
        fs.writeFileSync(outputPath, report);
        console.log(`📋 Report saved to: ${outputPath}`);
    }
}

// CLI usage
if (require.main === module) {
    const projectPath = process.argv[2] || './frontend';
    const outputPath = process.argv[3] || './link-check-report.md';
    
    const checker = new LinkChecker();
    
    checker.checkProjectLinks(projectPath)
        .then(results => {
            console.log('\n📋 Link Check Complete!');
            console.log(`✅ Working: ${results.summary.workingLinks}`);
            console.log(`❌ Broken: ${results.summary.brokenLinks}`);
            
            checker.saveReport(results, outputPath);
            
            // Exit with error code if broken links found
            process.exit(results.summary.brokenLinks > 0 ? 1 : 0);
        })
        .catch(error => {
            console.error('❌ Link check failed:', error);
            process.exit(1);
        });
}

module.exports = LinkChecker;