import p from 'package.json'

const Page = () => (
  <html>
    <body>
      <div>
        <p>Version {p.version}</p>
      </div>
    </body>
  </html>
)

export default Page
