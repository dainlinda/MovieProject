import Layout from "../components/Layout";
import url from '../../config/config';
import axios from 'axios';

function Test(props){
    console.log(props)
    return(
        <Layout>
            
        </Layout>
    )
}
Test.getInitialProps = async function() {
    const {data: balance} = await axios.get(url+'/characters');
    return {
      balance
    };
}
export default Test