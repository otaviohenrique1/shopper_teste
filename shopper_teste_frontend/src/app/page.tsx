"use client"
import Image from 'next/image'
import styles from './page.module.css'
import Dropzone from 'react-dropzone'
import csv from 'csv-parser';
import { useState } from 'react';
import Papa from 'papaparse';

/*
  product_code,new_price
  16,25.50
*/

interface CsvDataTypes {
  product_code: number;
  new_price: number;
}

export default function Home() {
  const [csvData, setCsvData] = useState<string[][]>([]);

  const handleDrop = (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        const csvText = e.target?.result as string;

        // Use PapaParse para analisar o CSV
        Papa.parse<string[]>(csvText, {
          header: false,
          complete: (result) => {
            const rows = result.data;
            setCsvData(rows);
          },
        });
      };

      reader.readAsText(file);
    }
  };

  return (
    <main className={styles.main}>
      <div className={styles.center}>
        <Dropzone onDrop={handleDrop}>
          {({ getRootProps, getInputProps }) => (
            <section>
              <div {...getRootProps()} className={styles.dropzone}>
                <input {...getInputProps()} />
                <p>Arraste e solte o arquivo aqui ou clique para selecionar arquivo.</p>
              </div>
            </section>
          )}
        </Dropzone>
      </div>
      <button>Validar</button>
      {csvData.length > 0 && (
        <div>
          <h3>Dados CSV:</h3>
          <table>
            <thead>
              <tr>
                {csvData[0].map((header, index) => (
                  <th key={index}>{header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {csvData.slice(1).map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {row.map((cell, cellIndex) => (
                    <td key={cellIndex}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  )
}

/*
"use client"
import Image from 'next/image'
import styles from './page.module.css'
import Dropzone from 'react-dropzone'

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.description}>        
        <div>
          <a
            href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            By{' '}
            <Image
              src="/vercel.svg"
              alt="Vercel Logo"
              className={styles.vercelLogo}
              width={100}
              height={24}
              priority
            />
          </a>
        </div>
      </div>

      <div className={styles.center}>
        <Image
          className={styles.logo}
          src="/next.svg"
          alt="Next.js Logo"
          width={180}
          height={37}
          priority
        />
      </div>

      <div className={styles.grid}>
        <a
          href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Docs <span>-&gt;</span>
          </h2>
          <p>Find in-depth information about Next.js features and API.</p>
        </a>

        <a
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Learn <span>-&gt;</span>
          </h2>
          <p>Learn about Next.js in an interactive course with&nbsp;quizzes!</p>
        </a>

        <a
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Templates <span>-&gt;</span>
          </h2>
          <p>Explore the Next.js 13 playground.</p>
        </a>

        <a
          href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Deploy <span>-&gt;</span>
          </h2>
          <p>
            Instantly deploy your Next.js site to a shareable URL with Vercel.
          </p>
        </a>
      </div>
    </main>
  )
}
*/
