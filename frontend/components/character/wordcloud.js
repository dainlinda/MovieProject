import axios from 'axios'

const Wordcloud = (props) => (
    <div>
        <h1>{props.id}</h1>
    </div>
  )
  
  Wordcloud.getInitialProps = 
    async function() {
    const res = await axios.get('https://api.tvmaze.com/search/shows?q=batman')
    const data = await res.data
    console.log(data);
  
    return {
      data: data
    }
  }
  
  export default Wordcloud