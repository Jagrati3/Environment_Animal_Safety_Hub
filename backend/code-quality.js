const fs = require('fs');
const path = require('path');

class CodeQualityAnalyzer {
    constructor() {
        this.metrics = {
            htmlQuality: 0,
            cssQuality: 0,
            jsQuality: 0,
            overallQuality: 0
        };
        
        this.issues = [];
        this.suggestions = [];
    }

    // Analyze HTML quality
    analyzeHTML(content, filePath) {
        let score = 100;
        const issues = [];

        // Check for DOCTYPE
        if (!content.includes('<!DOCTYPE html>')) {
            score -= 10;
            issues.push('Missing DOCTYPE declaration');
        }

        // Check for meta viewport
        if (!content.includes('viewport')) {
            score -= 10;
            issues.push('Missing viewport meta tag');
        }

        // Check for semantic HTML
        const semanticTags = ['header', 'nav', 'main', 'section', 'article', 'aside', 'footer'];
        const hasSemanticTags = semanticTags.some(tag => content.includes(`<${tag}`));
        if (!hasSemanticTags) {
            score -= 15;
            issues.push('No semantic HTML tags found');
        }

        // Check for alt attributes on images
        const imgTags = content.match(/<img[^>]*>/g) || [];
        const imagesWithoutAlt = imgTags.filter(img => !img.includes('alt=')).length;
        if (imagesWithoutAlt > 0) {
            score -= imagesWithoutAlt * 5;
            issues.push(`${imagesWithoutAlt} images missing alt attributes`);
        }

        // Check for inline styles (should be avoided)
        const inlineStyles = (content.match(/style="/g) || []).length;
        if (inlineStyles > 0) {
            score -= inlineStyles * 2;
            issues.push(`${inlineStyles} inline styles found (use CSS files instead)`);
        }

        // Check for proper heading hierarchy
        const headings = content.match(/<h[1-6][^>]*>/g) || [];
        if (headings.length === 0) {
            score -= 10;
            issues.push('No heading tags found');
        }

        return {
            score: Math.max(0, score),
            issues,
            suggestions: this.generateHTMLSuggestions(issues)
        };
    }

    // Analyze CSS quality
    analyzeCSS(content, filePath) {
        let score = 100;
        const issues = [];

        // Check for CSS reset/normalize
        if (!content.includes('margin: 0') && !content.includes('padding: 0')) {
            score -= 10;
            issues.push('No CSS reset found');
        }

        // Check for responsive design
        if (!content.includes('@media')) {
            score -= 15;
            issues.push('No media queries found (not responsive)');
        }

        // Check for vendor prefixes
        const vendorPrefixes = ['-webkit-', '-moz-', '-ms-', '-o-'];
        const hasVendorPrefixes = vendorPrefixes.some(prefix => content.includes(prefix));
        if (!hasVendorPrefixes && content.includes('transform')) {
            score -= 5;
            issues.push('Missing vendor prefixes for better browser support');
        }

        // Check for CSS variables
        if (!content.includes('--') && content.length > 1000) {
            score -= 10;
            issues.push('Consider using CSS custom properties (variables)');
        }

        // Check for !important overuse
        const importantCount = (content.match(/!important/g) || []).length;
        if (importantCount > 5) {
            score -= importantCount * 2;
            issues.push(`Excessive use of !important (${importantCount} times)`);
        }

        return {
            score: Math.max(0, score),
            issues,
            suggestions: this.generateCSSSuggestions(issues)
        };
    }

    // Analyze JavaScript quality
    analyzeJS(content, filePath) {
        let score = 100;
        const issues = [];

        // Check for strict mode
        if (!content.includes('"use strict"') && !content.includes("'use strict'")) {
            score -= 5;
            issues.push('Consider using strict mode');
        }

        // Check for console.log (should be removed in production)
        const consoleLogs = (content.match(/console\.log/g) || []).length;
        if (consoleLogs > 0) {
            score -= consoleLogs * 2;
            issues.push(`${consoleLogs} console.log statements found (remove for production)`);
        }

        // Check for var usage (prefer let/const)
        const varUsage = (content.match(/\bvar\s+/g) || []).length;
        if (varUsage > 0) {
            score -= varUsage * 1;
            issues.push(`${varUsage} var declarations found (use let/const instead)`);
        }

        // Check for function declarations vs expressions
        const functionDeclarations = (content.match(/function\s+\w+/g) || []).length;
        const arrowFunctions = (content.match(/=>\s*{?/g) || []).length;
        
        // Check for error handling
        if (content.includes('fetch(') && !content.includes('.catch(')) {
            score -= 10;
            issues.push('Missing error handling for fetch requests');
        }

        // Check for event listener cleanup
        if (content.includes('addEventListener') && !content.includes('removeEventListener')) {
            score -= 5;
            issues.push('Consider adding event listener cleanup');
        }

        return {
            score: Math.max(0, score),
            issues,
            suggestions: this.generateJSSuggestions(issues)
        };
    }

    // Check project structure
    analyzeProjectStructure(projectPath) {
        let score = 100;
        const issues = [];
        const requiredFiles = ['index.html', 'README.md'];
        const recommendedDirs = ['css', 'js', 'images'];

        // Check for required files
        requiredFiles.forEach(file => {
            if (!fs.existsSync(path.join(projectPath, file))) {
                score -= 20;
                issues.push(`Missing ${file}`);
            }
        });

        // Check for organized directory structure
        recommendedDirs.forEach(dir => {
            if (!fs.existsSync(path.join(projectPath, dir))) {
                score -= 5;
                issues.push(`Consider creating ${dir} directory for better organization`);
            }
        });

        // Check for package.json if JS files exist
        const hasJSFiles = this.findFiles(projectPath, '.js').length > 0;
        if (hasJSFiles && !fs.existsSync(path.join(projectPath, 'package.json'))) {
            score -= 10;
            issues.push('Consider adding package.json for dependency management');
        }

        return {
            score: Math.max(0, score),
            issues
        };
    }

    // Find files by extension
    findFiles(dirPath, extension) {
        const files = [];
        
        function scanRecursive(currentPath) {
            try {
                const items = fs.readdirSync(currentPath);
                
                for (const item of items) {
                    const fullPath = path.join(currentPath, item);
                    const stat = fs.statSync(fullPath);
                    
                    if (stat.isDirectory() && !item.startsWith('.') && item !== 'node_modules') {
                        scanRecursive(fullPath);
                    } else if (stat.isFile() && item.endsWith(extension)) {
                        files.push(fullPath);
                    }
                }
            } catch (error) {
                console.error(`Error scanning ${currentPath}:`, error.message);
            }
        }
        
        scanRecursive(dirPath);
        return files;
    }

    // Main analysis function
    analyzeProject(projectPath) {
        console.log(`🔍 Analyzing project: ${projectPath}`);
        
        const results = {
            projectPath,
            timestamp: new Date().toISOString(),
            files: {},
            summary: {
                totalFiles: 0,
                htmlFiles: 0,
                cssFiles: 0,
                jsFiles: 0,
                overallScore: 0,
                issues: [],
                suggestions: []
            }
        };

        // Analyze project structure
        const structureAnalysis = this.analyzeProjectStructure(projectPath);
        results.structure = structureAnalysis;

        // Analyze HTML files
        const htmlFiles = this.findFiles(projectPath, '.html');
        results.summary.htmlFiles = htmlFiles.length;
        
        htmlFiles.forEach(file => {
            try {
                const content = fs.readFileSync(file, 'utf8');
                const analysis = this.analyzeHTML(content, file);
                const relativePath = path.relative(projectPath, file);
                results.files[relativePath] = { type: 'html', ...analysis };
            } catch (error) {
                console.error(`Error analyzing ${file}:`, error.message);
            }
        });

        // Analyze CSS files
        const cssFiles = this.findFiles(projectPath, '.css');
        results.summary.cssFiles = cssFiles.length;
        
        cssFiles.forEach(file => {
            try {
                const content = fs.readFileSync(file, 'utf8');
                const analysis = this.analyzeCSS(content, file);
                const relativePath = path.relative(projectPath, file);
                results.files[relativePath] = { type: 'css', ...analysis };
            } catch (error) {
                console.error(`Error analyzing ${file}:`, error.message);
            }
        });

        // Analyze JS files
        const jsFiles = this.findFiles(projectPath, '.js');
        results.summary.jsFiles = jsFiles.length;
        
        jsFiles.forEach(file => {
            try {
                const content = fs.readFileSync(file, 'utf8');
                const analysis = this.analyzeJS(content, file);
                const relativePath = path.relative(projectPath, file);
                results.files[relativePath] = { type: 'js', ...analysis };
            } catch (error) {
                console.error(`Error analyzing ${file}:`, error.message);
            }
        });

        // Calculate overall score
        const fileScores = Object.values(results.files).map(f => f.score);
        const avgFileScore = fileScores.length > 0 ? 
            fileScores.reduce((a, b) => a + b, 0) / fileScores.length : 0;
        
        results.summary.overallScore = Math.round(
            (avgFileScore * 0.7) + (structureAnalysis.score * 0.3)
        );

        results.summary.totalFiles = htmlFiles.length + cssFiles.length + jsFiles.length;

        // Collect all issues and suggestions
        Object.values(results.files).forEach(file => {
            results.summary.issues.push(...file.issues);
            results.summary.suggestions.push(...(file.suggestions || []));
        });

        results.summary.issues.push(...structureAnalysis.issues);

        return results;
    }

    // Generate suggestions
    generateHTMLSuggestions(issues) {
        const suggestions = [];
        
        if (issues.some(i => i.includes('DOCTYPE'))) {
            suggestions.push('Add <!DOCTYPE html> at the beginning of your HTML file');
        }
        
        if (issues.some(i => i.includes('viewport'))) {
            suggestions.push('Add <meta name="viewport" content="width=device-width, initial-scale=1.0"> for mobile responsiveness');
        }
        
        if (issues.some(i => i.includes('semantic'))) {
            suggestions.push('Use semantic HTML tags like <header>, <nav>, <main>, <section>, <footer>');
        }
        
        return suggestions;
    }

    generateCSSSuggestions(issues) {
        const suggestions = [];
        
        if (issues.some(i => i.includes('reset'))) {
            suggestions.push('Add CSS reset: * { margin: 0; padding: 0; box-sizing: border-box; }');
        }
        
        if (issues.some(i => i.includes('media queries'))) {
            suggestions.push('Add media queries for responsive design: @media (max-width: 768px) { ... }');
        }
        
        return suggestions;
    }

    generateJSSuggestions(issues) {
        const suggestions = [];
        
        if (issues.some(i => i.includes('strict mode'))) {
            suggestions.push('Add "use strict"; at the top of your JavaScript files');
        }
        
        if (issues.some(i => i.includes('console.log'))) {
            suggestions.push('Remove console.log statements before production deployment');
        }
        
        return suggestions;
    }

    // Generate quality badge
    generateQualityBadge(score) {
        let color, label;
        
        if (score >= 90) {
            color = 'brightgreen';
            label = 'excellent';
        } else if (score >= 80) {
            color = 'green';
            label = 'good';
        } else if (score >= 70) {
            color = 'yellow';
            label = 'fair';
        } else if (score >= 60) {
            color = 'orange';
            label = 'needs improvement';
        } else {
            color = 'red';
            label = 'poor';
        }
        
        return `![Code Quality](https://img.shields.io/badge/code%20quality-${score}%25%20${label}-${color})`;
    }

    // Generate report
    generateReport(results) {
        const { summary, files, structure } = results;
        
        let report = `# Code Quality Report
Generated: ${results.timestamp}

## Overall Score: ${summary.overallScore}%
${this.generateQualityBadge(summary.overallScore)}

## Summary
- 📄 Total files analyzed: ${summary.totalFiles}
- 🌐 HTML files: ${summary.htmlFiles}
- 🎨 CSS files: ${summary.cssFiles}
- ⚡ JavaScript files: ${summary.jsFiles}
- 📊 Project structure score: ${structure.score}%

## Issues Found (${summary.issues.length})
`;

        if (summary.issues.length === 0) {
            report += "🎉 No issues found!\n\n";
        } else {
            summary.issues.forEach((issue, index) => {
                report += `${index + 1}. ❌ ${issue}\n`;
            });
            report += '\n';
        }

        report += `## Suggestions (${summary.suggestions.length})\n`;
        summary.suggestions.forEach((suggestion, index) => {
            report += `${index + 1}. 💡 ${suggestion}\n`;
        });

        report += `\n## File Details\n`;
        Object.entries(files).forEach(([filePath, analysis]) => {
            report += `### ${filePath} (${analysis.type.toUpperCase()}) - ${analysis.score}%\n`;
            if (analysis.issues.length > 0) {
                analysis.issues.forEach(issue => {
                    report += `- ❌ ${issue}\n`;
                });
            } else {
                report += "- ✅ No issues found\n";
            }
            report += '\n';
        });

        return report;
    }
}

// CLI usage
if (require.main === module) {
    const projectPath = process.argv[2] || './frontend';
    const outputPath = process.argv[3] || './code-quality-report.md';
    
    const analyzer = new CodeQualityAnalyzer();
    
    try {
        const results = analyzer.analyzeProject(projectPath);
        
        console.log('\n📋 Code Quality Analysis Complete!');
        console.log(`📊 Overall Score: ${results.summary.overallScore}%`);
        console.log(`❌ Issues Found: ${results.summary.issues.length}`);
        console.log(`💡 Suggestions: ${results.summary.suggestions.length}`);
        
        const report = analyzer.generateReport(results);
        fs.writeFileSync(outputPath, report);
        console.log(`📋 Report saved to: ${outputPath}`);
        
        // Exit with error code if quality is too low
        process.exit(results.summary.overallScore < 70 ? 1 : 0);
    } catch (error) {
        console.error('❌ Code quality analysis failed:', error);
        process.exit(1);
    }
}

module.exports = CodeQualityAnalyzer;