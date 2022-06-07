import Link from 'next/link'

const apikey = '3a85f7e1a4444ec1865efb39ef019313';
const url = 'https://www.bungie.net/Platform/GroupV2/2084197/';
const headers = { 'X-API-Key' : apikey }

function Index({ name }) {
    return (
      <div>
        <p>Next.js has {name} ⭐️</p>
        <Link href="/preact-stars">
          <a>How about preact?</a>
        </Link>
      </div>
    )
  }

export async function getStaticProps() {
    const res = await fetch(url, { headers })
    const json = await res.json()
  
    return {
      props: {
        name: json.Response.detail.name,
        about: json.Response.detail.about,
        motto: json.Response.detail.motto,
        memberCount: json.Response.detail.memberCount,
      },
    }
}

export default Index