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