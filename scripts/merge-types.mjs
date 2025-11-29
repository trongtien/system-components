#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Đường dẫn các files
const indexDtsPath = path.resolve(__dirname, '../dist/index.d.ts');
const reactTypesPath = path.resolve(__dirname, '../dist/react-types.d.ts');

function mergeReactTypesToIndex() {
  try {
    // Đọc nội dung index.d.ts hiện tại
    let indexContent = fs.readFileSync(indexDtsPath, 'utf8');
    
    // Đọc nội dung react-types.d.ts
    const reactTypesContent = fs.readFileSync(reactTypesPath, 'utf8');
    
    // Tách phần React types và export interfaces
    const reactTypesLines = reactTypesContent.split('\n');
    
    // Tìm dòng bắt đầu của interfaces và JSX declarations
    let startIndex = reactTypesLines.findIndex(line => 
      line.startsWith('interface ') || line.includes('declare global')
    );
    
    // Tìm dòng kết thúc (trước export {})
    let endIndex = reactTypesLines.findIndex(line => line.trim() === 'export {};');
    
    if (startIndex === -1) {
      // Nếu không có interfaces, chỉ lấy declare global part
      startIndex = reactTypesLines.findIndex(line => line.includes('declare global'));
    }
    
    if (endIndex === -1) {
      endIndex = reactTypesLines.length;
    }
    
    // Lấy phần React types và thêm exports
    let reactTypesCore = reactTypesLines.slice(startIndex, endIndex).join('\n');
    
    // Extract interface names và thêm export statements
    const interfaceMatches = [...reactTypesCore.matchAll(/interface (\w+Element)\s+extends/g)];
    const interfaceNames = interfaceMatches.map(match => match[1]);
    
    if (interfaceNames.length > 0) {
      const exportStatement = `\n// Export interfaces for TypeScript\nexport type { ${interfaceNames.join(', ')} };\n`;
      reactTypesCore += exportStatement;
    }
    
    // Kiểm tra xem đã có React types trong index.d.ts chưa
    const hasReactTypes = indexContent.includes('declare global') || 
                         indexContent.includes('SystemButtonElement');
    
    if (!hasReactTypes && reactTypesCore.trim()) {
      // Thêm React types vào cuối file trước dòng cuối
      const lines = indexContent.split('\n');
      const lastNonEmptyIndex = lines.length - 1;
      
      // Thêm comment và React types
      const reactTypesSection = [
        '',
        '// Auto-generated React TypeScript definitions',
        '// Updated at: ' + new Date().toISOString(),
        '',
        reactTypesCore,
        ''
      ].join('\n');
      
      // Chèn vào trước dòng cuối
      lines.splice(lastNonEmptyIndex, 0, reactTypesSection);
      indexContent = lines.join('\n');
      
      // Ghi lại file index.d.ts
      fs.writeFileSync(indexDtsPath, indexContent, 'utf8');
      
      console.log('✅ Merged React types into index.d.ts');
      console.log('📦 Now you can use: import "@kevid/system-components" for full React support');
    } else if (hasReactTypes) {
      // Cập nhật React types nếu đã có
      const commentPattern = /\/\/ Auto-generated React TypeScript definitions[\s\S]*?(?=\n\s*$|\n\s*\/\/|\n\s*import|\n\s*export|$)/;
      
      if (commentPattern.test(indexContent)) {
        const newReactTypesSection = [
          '// Auto-generated React TypeScript definitions',
          '// Updated at: ' + new Date().toISOString(),
          '',
          reactTypesCore
        ].join('\n');
        
        indexContent = indexContent.replace(commentPattern, newReactTypesSection);
        fs.writeFileSync(indexDtsPath, indexContent, 'utf8');
        
        console.log('🔄 Updated React types in index.d.ts');
      } else {
        console.log('ℹ️  React types already exist in index.d.ts');
      }
    } else {
      console.log('⚠️  No React types to merge');
    }
    
    // Xóa file react-types.d.ts riêng lẻ sau khi merge
    if (fs.existsSync(reactTypesPath)) {
      fs.unlinkSync(reactTypesPath);
      console.log('🗑️  Removed standalone react-types.d.ts');
    }
    
  } catch (error) {
    console.error('❌ Error merging React types:', error.message);
    process.exit(1);
  }
}

// Thực thi
mergeReactTypesToIndex();