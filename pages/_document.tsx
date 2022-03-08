import Document, { Html, Head, Main, NextScript } from 'next/document'
import { validateConfigApp } from '../configs/app'

validateConfigApp();
export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
