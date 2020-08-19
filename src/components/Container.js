import Navigation from "./navigation" 
import Head from 'next/head' 
import Footer from '../components/footer.js'
import Cards from '../components/Cards.js'
const Container = ( props) =>(
<div>
     <Head>
      <title>Examen FrontEnd</title>
   </Head>
   <Navigation/>  
   <Cards/>
     <Footer/>  
   <div>
      {props.children}
   </div>
</div>
)
export default Container;