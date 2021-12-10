import { Problem } from './problem-page';

export function makeCozyView({ id, html }: Problem): string {
  return `
    <html>
      <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>BOJ #${id}</title>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.15.1/dist/katex.min.css" integrity="sha384-R4558gYOUz8mP9YWpZJjofhk+zx0AS11p36HnD2ZKj/6JR5z27gSSULCNHIRReVs" crossorigin="anonymous">
        <script defer src="https://cdn.jsdelivr.net/npm/katex@0.15.1/dist/katex.min.js" integrity="sha384-z1fJDqw8ZApjGO3/unPWUPsIymfsJmyrDVWC8Tv/a1HeOtGmkwNd/7xUS0Xcnvsx" crossorigin="anonymous"></script>
        <script>
          document.addEventListener("DOMContentLoaded", function() {
            renderMathInElement(document.body, {
              delimiters: [
                {left: '$$', right: '$$', display: true},
                {left: '$', right: '$', display: false},
                {left: '\\(', right: '\\)', display: false},
                {left: '\\[', right: '\\]', display: true}
              ],
              throwOnError : false
            });
          });
        </script>
        <style>
          html {
            max-width: 970px;
            margin: 0 auto;
          }
          ul.nav, .problem-label {
            display: none;
          }
          .row {
            margin: 0 -1rem;
            box-sizing: border-box;
          }
          .col-md-6 {
            width: 50%;
            float: left;
            padding: 0 1rem;
            box-sizing: border-box;
          }
          .col-md-12 {
            width: 100%;
            float: left;
            padding: 0 1rem;
            box-sizing: border-box;
          }
          table {
            width: 100%;
          }
          th {
            text-align: left;
          }
          pre {
            padding: 0.5em;
          }
        </style>
      </head>
      <body>
        ${html ?? 'No Problem Found'}
        <script>
          for (const btn of document.querySelectorAll('.btn')) {
            if (btn.innerText !== '복사') {
              continue;
            }
            btn.onclick = () => navigator.clipboard.writeText(document.querySelector(btn.dataset.clipboardTarget).innerText);
          }
          for (const img of document.getElementsByTagName('img')) {
            console.log(img.src);
            // img.src = 'https://api.allorigins.win/raw?url=' + encodeURIComponent(img.src.includes('://') ? img.src : new URL(img.src, 'https://acmicpc.net/'));
          }
        </script>
      </body>
    </html>
  `;
}
