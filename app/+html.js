import { ScrollViewStyleReset } from 'expo-router/html';

export default function Root({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        
        {/* FontAwesome fallback for Expo Web */}
        <style dangerouslySetInnerHTML={{__html: `
          @font-face {
            font-family: 'FontAwesome';
            src: url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/fonts/fontawesome-webfont.woff2') format('woff2');
          }
        `}} />
        
        <ScrollViewStyleReset />
      </head>
      <body>{children}</body>
    </html>
  );
}
