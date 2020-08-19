import { gql, useQuery, NetworkStatus } from '@apollo/client'
import ErrorMessage from './errormessage'
import moment from  'moment';
import Button from './button.js'
import Link from 'next/link'
export const ALL_POSTS_QUERY = gql`
  query launchesPast($first: Int!,$offset:Int! ) {
    launchesPast(limit: $first,offset: $offset ) {
        mission_name
        launch_date_local
        links {
            flickr_images
            wikipedia
          }
          launch_success
          id
        }
  }
`
export const allPostsQueryVars = {
 offset:0,
  first: 12,
}

export default function PostList() {
  const { loading, error, data, fetchMore, networkStatus } = useQuery(
    ALL_POSTS_QUERY,
    {
      variables: allPostsQueryVars,
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
        skip: launchesPast.length,
      },
    })
  }

  if (error) return <ErrorMessage message="Error loading posts." />
  if (loading && !loadingMorePosts) return <div>Loading</div>

  const { launchesPast, _allPostsMeta } = data
   const areMorePosts = launchesPast.length 
const DateCDMX=moment(new Date()).format('MMMM Do YYYY, h:mm:ss a');
   return (
 
     <div className="flex flex-row flex-wrap">
      
        {launchesPast.map((post, index) => (
          
          
  <div  className="h-full lg:h-48 xl:h-50 lg:flex lg:mt-6 w-full md:w-full lg:w-1/4 xl:w-1/4 border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 ">
      <img class="object-cover lg:h-25 lg:w-2/5 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden " src= {post.links.flickr_images[0]} alt="Sunset in the mountains"/>
    <div className="mb-8">
      
      <div className={ "my-6 text-lg lg:my-1 lg:text-sm font-bold   text-gray-700 xl:font-semibold text-md mb-2 text-center "+(post.launch_success===true?"text-green-400":"text-red-600") }>{post.mission_name}  </div>
      <p className="text-gray-700 text-base text-center mb-6 lg:mb-2 ">{ DateCDMX  } </p>
    <Link href= "/about">
      <a> 
      <Button
      name='Acerca'
classcss="mt-9 lg:w-2/4 ml-5 w-2/5 xl:w-2/5 xl:ml-3 lg:ml-1 bg-blue-500 hover:bg-blue-700 focus:outline-none text-white   py-2  rounded-full "
 
      />
      </a>
 </Link>
 {post.links.wikipedia!==null?(
      <Link href= { post.links.wikipedia }   >
      <a>
   <Button

name='Wiki'
classcss="ml-6 xl:ml-2 lg:ml-2 w-1/6 lg:w-2/5 xl:ml-4 bg-gray-400 hover:bg-gray-600 text-gray-800 font-semibold py-2   rounded  "
 />
</a>
 </Link>
 ):null}
    </div>
   
 
 
  </div>
       ))}
       </div>
  )
}