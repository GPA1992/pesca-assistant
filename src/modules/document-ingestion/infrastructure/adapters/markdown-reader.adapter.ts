import { Injectable } from '@nestjs/common';
import * as fs from 'fs/promises';
import * as path from 'path';

@Injectable()
export class MarkdownReaderAdapter {
  private readonly docsFolder = path.resolve(
    process.cwd(),
    'src/documents/chunks',
  );

  async readAll(): Promise<{ id: string; content: string }[]> {
    const files = await fs.readdir(this.docsFolder);

    const markdownFiles = files.filter((file) => file.endsWith('.md'));

    const documents = await Promise.all(
      markdownFiles.map(async (file) => {
        const content = await fs.readFile(
          path.join(this.docsFolder, file),
          'utf-8',
        );
        const id = path.parse(file).name;
        return { id, content };
      }),
    );

    return documents;
  }
}
