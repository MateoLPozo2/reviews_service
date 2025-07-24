// pages/api/upload.js

import fs from 'fs';
import path from 'path';
import formidable from 'formidable';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default function handler(req, res) {
  if (req.method === 'POST') {
    const uploadDir = path.join(process.cwd(), 'public/uploads');

    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const form = new formidable.IncomingForm({
      uploadDir,
      keepExtensions: true,
      filename: (name, ext, part) => {
        return `${Date.now()}-${part.originalFilename}`;
      },
    });

    form.parse(req, (err, fields, files) => {
      if (err) {
        res.status(500).json({ error: 'Failed to upload file.' });
        return;
      }

      const uploadedFile = files.file[0];
      const relativePath = `/uploads/${path.basename(uploadedFile.filepath)}`;
      res.status(200).json({ path: relativePath });
    });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}