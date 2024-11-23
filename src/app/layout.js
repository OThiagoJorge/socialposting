import './globals.css'

export default function Layout({children}){
  return (
    <html lang="pt-br">
      <head>
        <title>Social Posting</title>
        <meta charSet='utf-8'/>
        <link rel="icon" type="image/x-icon" href="/icon.png"></link>
        <link type="text/css" rel="stylesheet" href="https://www.gstatic.com/firebasejs/ui/6.0.1/firebase-ui-auth.css" />
      </head>
      <body>
          {children}
      </body>
    </html>
  )
}