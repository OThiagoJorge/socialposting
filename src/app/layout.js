import './globals.css'

export default function Layout({children}){
  return (
    <html lang="pt-br">
      <head>
        <title>Social Posting</title>
        <meta charSet='utf-8'/>
        <link rel="icon" type="image/x-icon" href="/icon.png"></link>
      </head>
      <body>
          {children}
      </body>
    </html>
  )
}