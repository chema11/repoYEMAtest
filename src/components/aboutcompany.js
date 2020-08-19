import { gql, useQuery, NetworkStatus } from '@apollo/client'
import ErrorMessage from './errormessage'
import moment from  'moment';
import Button from './button.js'
import Link from 'next/link'
export const ALL_POST_QUERY = gql`
query company   {
    company {
        ceo
        founder
        links {
          website
        }
        name
      }
}
`
export const allPostsQueryVars = {
 
}

export default function PostLists() {
  const { loading, error, data, fetchMore, networkStatus } = useQuery(
   ALL_POST_QUERY,
    {
    
      // Setting this value to true will make the component rerender when
      // the "networkStatus" changes, so we are able to know if it is fetching
      // more data
      notifyOnNetworkStatusChange: true,
    }
  )

  const loadingMorePosts = networkStatus === NetworkStatus.fetchMore

  const loadMorePosts = () => {
     fetchMore({
      variables: {
        skip: company.length,
      },
    })
  }

  if (error) return <ErrorMessage message="Error loading posts." />
  if (loading && !loadingMorePosts) return <div>Loading</div>

  const { company, _allPostsMeta } = data
   const areMorePosts = company.length 
const DateCDMX=moment(new Date()).format('MMMM Do YYYY, h:mm:ss a');
   return (
    <>
     <div class="px-15 font-bold text-xl mb-2">Company</div>
<div class="max-w-sm rounded overflow-hidden shadow-lg">
 
  <div class="px-10 py-10">
    <div class="font-bold text-xl mb-2">{company.name}</div>
    <p class="text-gray-700 text-base">
       {company.ceo}
    </p>
    <Link href= {company.links.website }   >
      <a>
    <Button classcss="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded" name="Web"/>
    </a>
 </Link>
  </div>
  
</div>
 </>
)
}